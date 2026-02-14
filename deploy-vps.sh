#!/bin/bash

#######################################################
#  NEXT STEP - VPS DEPLOYMENT SCRIPT
#  For Ubuntu 22.04 on Hostinger VPS
#######################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() { echo -e "${BLUE}[*]${NC} $1"; }
print_success() { echo -e "${GREEN}[✓]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }

echo ""
echo "========================================================"
echo "   NEXT STEP - VPS DEPLOYMENT SCRIPT"
echo "   React + FastAPI + MongoDB on Ubuntu 22.04"
echo "========================================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use: sudo bash deploy-vps.sh)"
    exit 1
fi

# Get user inputs
read -p "Enter your domain name (e.g., nextstep.com.pt): " DOMAIN
read -p "Enter your GitHub repo URL (e.g., https://github.com/user/repo.git): " GITHUB_REPO
read -p "Enter your email for SSL certificate: " EMAIL

# Confirm
echo ""
echo "Configuration:"
echo "  Domain: $DOMAIN"
echo "  GitHub: $GITHUB_REPO"
echo "  Email:  $EMAIL"
echo ""
read -p "Continue with deployment? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    print_warning "Deployment cancelled."
    exit 0
fi

APP_DIR="/var/www/nextstep"

#######################################################
# STEP 1: System Update
#######################################################
print_status "Updating system packages..."
apt update && apt upgrade -y
print_success "System updated"

#######################################################
# STEP 2: Install Dependencies
#######################################################
print_status "Installing required packages..."
apt install -y nginx python3 python3-pip python3-venv git curl gnupg software-properties-common
print_success "Base packages installed"

# Install Node.js 20.x
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
print_success "Node.js $(node -v) installed"

# Install MongoDB 7.0
print_status "Installing MongoDB..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl start mongod
systemctl enable mongod
print_success "MongoDB installed and running"

# Install Certbot
print_status "Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx
print_success "Certbot installed"

#######################################################
# STEP 3: Create App User & Directory
#######################################################
print_status "Setting up application directory..."
useradd -m -s /bin/bash nextstep 2>/dev/null || true
mkdir -p $APP_DIR
chown nextstep:nextstep $APP_DIR
print_success "App directory created at $APP_DIR"

#######################################################
# STEP 4: Clone Repository
#######################################################
print_status "Cloning repository..."
cd $APP_DIR
rm -rf * .[^.]* 2>/dev/null || true
git clone $GITHUB_REPO .
chown -R nextstep:nextstep $APP_DIR
print_success "Repository cloned"

#######################################################
# STEP 5: Setup Backend
#######################################################
print_status "Setting up FastAPI backend..."
cd $APP_DIR/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create backend .env
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
DB_NAME=nextstep
CORS_ORIGINS=https://$DOMAIN,https://www.$DOMAIN
EOF

deactivate
print_success "Backend configured"

# Create systemd service for backend
print_status "Creating backend service..."
cat > /etc/systemd/system/nextstep-backend.service << EOF
[Unit]
Description=Next Step FastAPI Backend
After=network.target mongod.service
Wants=mongod.service

[Service]
Type=simple
User=nextstep
Group=nextstep
WorkingDirectory=$APP_DIR/backend
Environment="PATH=$APP_DIR/backend/venv/bin"
ExecStart=$APP_DIR/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl start nextstep-backend
systemctl enable nextstep-backend
print_success "Backend service created and started"

#######################################################
# STEP 6: Build Frontend
#######################################################
print_status "Building React frontend..."
cd $APP_DIR/frontend

# Create frontend .env
cat > .env << EOF
REACT_APP_BACKEND_URL=https://$DOMAIN
EOF

# Install npm dependencies and build
npm install
npm run build
print_success "Frontend built"

#######################################################
# STEP 7: Configure Nginx
#######################################################
print_status "Configuring Nginx..."
cat > /etc/nginx/sites-available/nextstep << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Frontend - serve static files
    root $APP_DIR/frontend/build;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # Frontend routes
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site and remove default
ln -sf /etc/nginx/sites-available/nextstep /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx
print_success "Nginx configured"

#######################################################
# STEP 8: Set Permissions
#######################################################
print_status "Setting file permissions..."
chown -R nextstep:nextstep $APP_DIR
chmod -R 755 $APP_DIR
print_success "Permissions set"

#######################################################
# STEP 9: Setup SSL (Let's Encrypt)
#######################################################
print_status "Setting up SSL certificate..."
print_warning "Make sure your domain DNS is pointing to this server's IP!"
echo ""
read -p "Is your domain DNS configured? (y/n): " DNS_READY

if [ "$DNS_READY" = "y" ]; then
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $EMAIL
    print_success "SSL certificate installed"
else
    print_warning "Skipping SSL. Run this command later when DNS is ready:"
    echo "  certbot --nginx -d $DOMAIN -d www.$DOMAIN --agree-tos -m $EMAIL"
fi

#######################################################
# STEP 10: Setup Firewall
#######################################################
print_status "Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
print_success "Firewall configured"

#######################################################
# COMPLETE
#######################################################
echo ""
echo "========================================================"
echo -e "${GREEN}   DEPLOYMENT COMPLETE!${NC}"
echo "========================================================"
echo ""
echo "Your Next Step app is now live at:"
echo "  http://$DOMAIN (or https:// if SSL was configured)"
echo ""
echo "Useful commands:"
echo "  Check backend:    systemctl status nextstep-backend"
echo "  Backend logs:     journalctl -u nextstep-backend -f"
echo "  Restart backend:  systemctl restart nextstep-backend"
echo "  Restart nginx:    systemctl restart nginx"
echo "  MongoDB status:   systemctl status mongod"
echo ""
echo "To update the app later:"
echo "  cd $APP_DIR"
echo "  git pull"
echo "  cd frontend && npm run build"
echo "  systemctl restart nextstep-backend"
echo ""
echo "========================================================"
