"""
Backend API Tests for Next Step Landing Page
- Health check endpoint
- Contact form submission endpoint (POST /api/contact)
- Contact form retrieval endpoint (GET /api/contact)
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealthCheck:
    """Basic API health checks"""
    
    def test_api_root_returns_200(self):
        """Test that API root is accessible"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root accessible: {data}")


class TestContactAPI:
    """Contact form API tests - POST and GET /api/contact"""
    
    def test_submit_contact_form_success(self):
        """Test contact form submission with all required fields"""
        unique_email = f"TEST_user_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST_John Doe",
            "email": unique_email,
            "phone": "+351123456789",
            "service": "Visa Support",
            "message": "I am interested in relocating to Portugal."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Validate response structure
        assert "id" in data, "Response should contain 'id'"
        assert "name" in data, "Response should contain 'name'"
        assert "email" in data, "Response should contain 'email'"
        assert "message" in data, "Response should contain 'message'"
        assert "timestamp" in data, "Response should contain 'timestamp'"
        
        # Validate response values
        assert data["name"] == payload["name"], "Name should match"
        assert data["email"] == payload["email"], "Email should match"
        assert data["message"] == payload["message"], "Message should match"
        
        print(f"✓ Contact form submitted successfully: ID={data['id']}")
        return data["id"]
    
    def test_submit_contact_form_minimal_fields(self):
        """Test contact form with only required fields (no phone/service)"""
        unique_email = f"TEST_minimal_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST_Minimal User",
            "email": unique_email,
            "message": "Testing minimal submission."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] is None, "Phone should be null when not provided"
        assert data["service"] is None, "Service should be null when not provided"
        
        print(f"✓ Minimal contact form submitted: ID={data['id']}")
    
    def test_submit_contact_form_missing_required_fields(self):
        """Test that missing required fields returns validation error"""
        # Missing name
        payload_no_name = {
            "email": "test@example.com",
            "message": "Missing name field"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload_no_name,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422, f"Expected 422 for missing name, got {response.status_code}"
        print("✓ Missing name field correctly returns 422")
        
        # Missing email
        payload_no_email = {
            "name": "Test User",
            "message": "Missing email field"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload_no_email,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422, f"Expected 422 for missing email, got {response.status_code}"
        print("✓ Missing email field correctly returns 422")
        
        # Missing message
        payload_no_message = {
            "name": "Test User",
            "email": "test@example.com"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload_no_message,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422, f"Expected 422 for missing message, got {response.status_code}"
        print("✓ Missing message field correctly returns 422")
    
    def test_submit_contact_form_invalid_email(self):
        """Test that invalid email format is rejected"""
        payload = {
            "name": "TEST_Invalid Email",
            "email": "not-a-valid-email",
            "message": "Testing invalid email"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("✓ Invalid email format correctly returns 422")
    
    def test_get_contact_submissions(self):
        """Test retrieving all contact submissions"""
        response = requests.get(f"{BASE_URL}/api/contact")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Retrieved {len(data)} contact submissions")
        
        # Check structure of first item if list is not empty
        if len(data) > 0:
            item = data[0]
            assert "id" in item
            assert "name" in item
            assert "email" in item
            assert "message" in item
            print(f"✓ Submission structure valid: {item.get('name', 'N/A')}")
    
    def test_contact_form_persistence(self):
        """Test that submitted contact form is persisted in database (Create → GET verification)"""
        unique_id = uuid.uuid4().hex[:8]
        unique_email = f"TEST_persist_{unique_id}@example.com"
        unique_name = f"TEST_Persist_{unique_id}"
        
        # Submit new contact
        payload = {
            "name": unique_name,
            "email": unique_email,
            "message": f"Persistence test {unique_id}"
        }
        
        post_response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert post_response.status_code == 200
        created_data = post_response.json()
        created_id = created_data["id"]
        
        # Get all submissions and verify the one we created exists
        get_response = requests.get(f"{BASE_URL}/api/contact")
        assert get_response.status_code == 200
        
        submissions = get_response.json()
        found = [s for s in submissions if s["id"] == created_id]
        
        assert len(found) == 1, f"Should find exactly 1 submission with ID {created_id}"
        assert found[0]["name"] == unique_name
        assert found[0]["email"] == unique_email
        
        print(f"✓ Contact submission persisted and retrieved: ID={created_id}")


class TestStatusAPI:
    """Status API tests - for completeness"""
    
    def test_post_status_check(self):
        """Test creating a status check"""
        payload = {"client_name": "TEST_Client"}
        
        response = requests.post(
            f"{BASE_URL}/api/status",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "id" in data
        assert data["client_name"] == "TEST_Client"
        print(f"✓ Status check created: ID={data['id']}")
    
    def test_get_status_checks(self):
        """Test retrieving status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} status checks")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
