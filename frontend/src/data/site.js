// Content for the nextStep site, in English and Portuguese.

const u = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  villa: u('1757264119016-7e6b568b810d', 1600),
  tavira: u('1770163821178-d1f705ca0952'),
  quintaDoLago: u('1754221715854-157c677101c5'),
  lagos: u('1725344153786-22686793e5a3', 1600),
  lisbon: u('1762335358426-72c27db3f5ff'),
  couple: u('1721120135035-7eb316da0fdc', 1200),
};

export const slides = [
  { src: images.tavira, place: 'Tavira', coord: '37.1264° N · 7.6486° W', alt: { en: 'Tavira, white houses with terracotta roofs below a church', pt: 'Tavira, casas brancas com telhados de terracota' } },
  { src: images.quintaDoLago, place: 'Quinta do Lago', coord: '37.0287° N · 8.0170° W', alt: { en: 'Aerial view of the beach and pine forest at Quinta do Lago', pt: 'Vista aérea da praia e do pinhal da Quinta do Lago' } },
  { src: images.lisbon, place: 'Lisboa', coord: '38.7223° N · 9.1393° W', alt: { en: 'Yellow tram 28 passing a pink building in Lisbon', pt: 'Elétrico 28 amarelo junto a um prédio cor-de-rosa em Lisboa' } },
  { src: images.lagos, place: 'Lagos', coord: '37.0814° N · 8.6705° W', alt: { en: 'Rock arches and cliffs on the coast at Lagos', pt: 'Arcos de rocha e falésias na costa de Lagos' } },
];

export const contact = {
  address: 'Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro',
  email: 'hello@nextstep.com.pt',
  phone: '+351 934 229 144',
  whatsapp: 'https://wa.me/351934229144',
};

export const routes = [
  { from: 'SAN FRANCISCO', to: 'CASCAIS', via: 'D7', status: 'arrived' },
  { from: 'TORONTO', to: 'FARO', via: 'RESIDENCY', status: 'arrived' },
  { from: 'SAO PAULO', to: 'TAVIRA', via: 'FAMILY', status: 'arrived' },
  { from: 'NEW YORK', to: 'LISBOA', via: 'NOMAD', status: 'boarding' },
  { from: 'RIO', to: 'PORTO', via: 'GOLDEN', status: 'boarding' },
  { from: 'VANCOUVER', to: 'LAGOS', via: 'D7', status: 'boarding' },
];

export const pride = {
  red: 'var(--red)', orange: 'var(--orange)', yellow: 'var(--yellow)',
  green: 'var(--green)', blue: 'var(--blue)', magenta: 'var(--magenta)',
};

// Shared, language-independent parts of each service.
export const serviceMeta = [
  { key: 'visa', code: 'IV', color: pride.red },
  { key: 'property', code: 'RE', color: pride.orange },
  { key: 'concierge', code: 'RC', color: pride.yellow },
  { key: 'family', code: 'FL', color: pride.green },
  { key: 'business', code: 'EB', color: pride.blue },
  { key: 'community', code: 'CC', color: pride.magenta },
];

export const storyMeta = [
  { code: 'SFO → CAS', color: pride.red, name: 'Marcus & David Chen', initials: 'MD' },
  { code: 'YYZ → FAO', color: pride.blue, name: 'Sarah T.', initials: 'ST' },
  { code: 'GRU → TAV', color: pride.green, name: 'Maria & Ana Ferreira', initials: 'MA' },
];

export const timelineColors = [pride.red, pride.yellow, pride.green, pride.blue];
export const whyColors = [pride.red, pride.orange, pride.yellow, pride.green, pride.blue, pride.magenta];

export const content = {
  en: {
    nav: { routes: 'Routes', about: 'About', rights: 'Why Portugal', services: 'Services', stories: 'Stories', contact: 'Contact', cta: 'Book a consultation', switchLang: 'Mudar para Português', light: 'Light', dark: 'Dark', theme: 'Switch colour theme' },
    hero: {
      eyebrow: 'LGBTQIA+ relocation law · Portugal',
      titleA: 'Your next step', titleB: 'is', titleWord: 'home.',
      sub: 'Legal guidance and personal support for LGBTQIA+ people and families moving to Portugal. We handle the visas, the property and the paperwork, and we help you settle in.',
      cta1: 'Book a confidential consultation', cta2: 'See our services', card: 'Destination · PT', show: 'Show',
    },
    facts: [['Office', 'Faro · Algarve'], ['Languages', 'EN · PT'], ['Reply time', 'Within 24 hours'], ['Consultations', 'Legally privileged']],
    routes: {
      eyebrow: 'Routes', titleA: "Wherever you're leaving from.", titleB: 'We handle the', titleWord: 'arrival.',
      sub: 'Clients come to us from the US, Canada, Brazil and beyond. Each route has its own documents, visa and timing. We plan it from the first call to your residence card.',
      cols: ['From', 'To', 'Pathway', 'Status'], status: { arrived: 'ARRIVED', boarding: 'BOARDING' },
      legend: ['Arrived: routes from the client stories below', 'Boarding: other routes we handle often'],
      label: 'Relocation routes',
    },
    about: {
      eyebrow: 'Who we are', titleA: 'Lawyers who', titleWord: 'get it.',
      p1: 'nextStep is a boutique legal practice for LGBTQIA+ individuals and families choosing Portugal. We cover immigration, investment and relocation, and we translate the culture as well as the law.',
      p2: 'Our attorneys combine deep Portuguese legal expertise with lived international experience. We act as your concierge for big decisions, your cultural interpreter and your advocate. You get legal security, personal attention and a safe harbour. You are never just a case number.',
      link: 'Talk to the team →', photoAlt: 'Yellow tram 28 in a Lisbon street',
      stats: [['300+', 'Families supported'], ['20+', 'Years of experience'], ['99%', 'Success rate'], ['24/7', 'Availability by appointment']],
    },
    rights: {
      eyebrow: 'Why Portugal', titleA: 'Rights written', titleB: 'into', titleWord: 'law.',
      sub: 'Portugal is ranked among the most LGBTQIA+-friendly countries in Europe by ILGA-Europe. These protections are law, and they apply to you once you live here.',
      timeline: [
        ['2004', 'Constitution', 'Article 13 bans discrimination based on sexual orientation.'],
        ['2010', 'Marriage', 'Same-sex marriage becomes legal nationwide.'],
        ['2016', 'Adoption', 'Same-sex couples gain full adoption rights.'],
        ['2018', 'Self-determination', 'Legal gender recognition without medical requirements.'],
      ],
      why: [
        'Same-sex marriage legal since 2010, with adoption rights fully recognised',
        "Ranked among the world's most LGBTQIA+-friendly nations by ILGA-Europe",
        'Strong anti-discrimination laws with constitutional protection',
        'Welcoming expat communities in Lisbon, Porto and the Algarve',
        'Golden Visa, D7 and Digital Nomad routes to residency and citizenship',
        'High quality of life, affordable living and excellent healthcare',
      ],
    },
    services: {
      eyebrow: 'Services', titleA: 'Six practice areas.', titleB: 'One', titleWord: 'point of contact.',
      sub: 'Most moves touch several areas of law at once. One team covers all of them, so nothing falls between two offices.',
      link: 'Talk to us →',
      items: [
        { route: 'Visa → Residence', title: 'Immigration & visas', tag: 'Your pathway, secured.', text: 'Golden Visa, D7 passive income, Digital Nomad, family reunification, residence permits and citizenship. Every detail handled with precision and care.' },
        { route: 'Capital → Property', title: 'Real estate & investment', tag: 'Smart decisions, safe harbour.', text: 'Property due diligence, purchase contracts, investment structuring and tax planning, so you make informed decisions in a foreign market.' },
        { route: 'Arrive → Settle', title: 'Relocation concierge', tag: 'Settling in, sorted.', text: 'NIF, social security, bank account, healthcare, driving licence exchange and school enrolment. We deal with the bureaucracy so you can settle in.' },
        { route: 'Family → Protected', title: 'Family & personal law', tag: 'Your rights, protected.', text: 'Marriage recognition, adoption, parental rights, divorce, custody and estate planning, with specialist knowledge of LGBTQIA+ and cross-border family law.' },
        { route: 'Idea → Company', title: 'Employment & business', tag: 'Build what comes next.', text: 'Work permits, employment contracts, company formation, commercial law and business structuring, whether you move for a job or start your own.' },
        { route: 'Newcomer → Neighbour', title: 'Community connection', tag: 'Belong from day one.', text: 'Introductions to LGBTQIA+ organisations, expat networks and local resources. You join a community that welcomes you.' },
      ],
    },
    places: {
      eyebrow: 'Destinations', titleA: 'Where will', titleB: 'you', titleWord: 'land?',
      sub: 'Lisbon, Porto or the Algarve. We know the welcoming communities in each, and we check every property before you sign.',
      qdl: 'Pine forest down to the Atlantic, minutes from our Faro office.', tavira: 'White houses and terracotta roofs.', lagos: 'Cliffs, coves and clear water.',
      pendingTag: 'Your address', pendingState: 'Pending · due diligence', pendingTitle: 'Your', pendingWord: 'home.',
      pendingText: 'Contracts, title checks and tax planning before you commit.', villaAlt: 'Modern white villa with a pool and palm trees',
    },
    stories: {
      eyebrow: 'Client stories', titleA: 'Trusted by families', titleWord: 'worldwide.',
      sub: 'Individuals and couples who trusted us with their move to Portugal.',
      items: [
        { via: 'D7', quote: "After the 2024 election, we knew we had to leave the US. nextStep didn't just handle our D7 visa. They gave us hope and a clear path during an uncertain time. Six months later, we're home.", route: 'San Francisco → Cascais' },
        { via: 'Residency', quote: 'As a trans woman, I was terrified of the legal complexity and of discrimination. nextStep treated me with dignity and professionalism. They knew exactly what I was going through and made everything feel safe.', route: 'Toronto → Faro' },
        { via: 'Family', quote: "We needed lawyers who understood Brazilian documents, Portuguese requirements and our situation as a same-sex couple with kids. nextStep's team handled it all flawlessly. They even helped us find schools!", route: 'São Paulo → Tavira' },
      ],
    },
    contact: {
      eyebrow: 'Contact', titleA: 'Ready for your', titleWord: 'next step?',
      sub: 'Book a confidential consultation, protected by attorney-client privilege. We work across time zones, so we can meet when it suits you.',
      photoAlt: 'Two people holding hands on a tree-lined path',
      office: 'Office', email: 'Email', phone: 'Phone', hours: 'Hours', hoursValue: '24/7 by appointment', copy: 'Copy', copied: 'Copied',
      whatsapp: 'Chat on WhatsApp', whatsappDesc: 'Quick replies, even outside office hours',
      form: {
        tag: 'New consultation', ref: 'Confidential', name: 'Full name', email: 'Email', phone: 'Phone (optional)', from: 'Moving from',
        service: 'Main interest', message: 'Your situation', placeholder: 'Tell us about your situation and what you hope to achieve.',
        submit: 'Request consultation', sending: 'Sending…', note: 'We reply within 24 hours to arrange a time.',
        success: "Thank you. We'll reply within 24 hours to arrange your consultation.",
        missing: 'Please add your name, a valid email and a short message so we can reply.',
        error: 'Your request could not be sent. Please try again, or email hello@nextstep.com.pt.',
        options: ['Golden Visa / investment immigration', 'D7 visa / passive income', 'Digital Nomad visa', 'Family reunification', 'Real estate purchase', 'Business formation', 'General consultation'],
      },
    },
    footer: {
      desc: 'A boutique consultancy for LGBTQIA+ individuals and families building new lives in Portugal. Your bridge, your advocate, your safe harbour.',
      services: 'Services', company: 'Company', legal: 'Legal',
      legalLinks: ['Privacy policy', 'Terms of service', 'Legal disclaimer'],
      disclaimer: 'nextStep is a consultancy service owned by a registered legal practice in Portugal. This website gives general information only and is not legal advice. Every case is different and needs an individual consultation.',
    },
  },

  pt: {
    nav: { routes: 'Rotas', about: 'Sobre', rights: 'Porquê Portugal', services: 'Serviços', stories: 'Histórias', contact: 'Contacto', cta: 'Marcar consulta', switchLang: 'Switch to English', light: 'Claro', dark: 'Escuro', theme: 'Mudar o tema de cores' },
    hero: {
      eyebrow: 'Direito de relocalização LGBTQIA+ · Portugal',
      titleA: 'O seu próximo passo', titleB: 'é', titleWord: 'casa.',
      sub: 'Orientação jurídica e apoio pessoal para pessoas e famílias LGBTQIA+ que se mudam para Portugal. Tratamos dos vistos, do imóvel e da papelada, e ajudamos a instalar-se.',
      cta1: 'Marcar consulta confidencial', cta2: 'Ver serviços', card: 'Destino · PT', show: 'Mostrar',
    },
    facts: [['Escritório', 'Faro · Algarve'], ['Idiomas', 'EN · PT'], ['Resposta', 'Em 24 horas'], ['Consultas', 'Sob sigilo profissional']],
    routes: {
      eyebrow: 'Rotas', titleA: 'Venha de onde vier.', titleB: 'Nós tratamos da', titleWord: 'chegada.',
      sub: 'Os nossos clientes vêm dos EUA, do Canadá, do Brasil e de outros países. Cada rota tem os seus documentos, visto e prazos. Planeamos tudo, da primeira chamada ao cartão de residência.',
      cols: ['Partida', 'Destino', 'Via', 'Estado'], status: { arrived: 'CHEGOU', boarding: 'EMBARQUE' },
      legend: ['Chegou: rotas das histórias de clientes abaixo', 'Embarque: outras rotas que tratamos com frequência'],
      label: 'Rotas de relocalização',
    },
    about: {
      eyebrow: 'Quem somos', titleA: 'Advogados que', titleWord: 'entendem.',
      p1: 'A nextStep é um escritório boutique para pessoas e famílias LGBTQIA+ que escolhem Portugal. Tratamos de imigração, investimento e relocalização, e traduzimos a cultura além da lei.',
      p2: 'Os nossos advogados juntam profundo conhecimento do direito português e experiência internacional vivida. Somos o seu concierge para grandes decisões, o seu intérprete cultural e o seu defensor. Tem segurança jurídica, atenção pessoal e um porto seguro. Nunca é apenas um número de processo.',
      link: 'Fale com a equipa →', photoAlt: 'Elétrico 28 amarelo numa rua de Lisboa',
      stats: [['300+', 'Famílias apoiadas'], ['20+', 'Anos de experiência'], ['99%', 'Taxa de sucesso'], ['24/7', 'Disponibilidade por marcação']],
    },
    rights: {
      eyebrow: 'Porquê Portugal', titleA: 'Direitos escritos', titleB: 'na', titleWord: 'lei.',
      sub: 'A ILGA-Europe classifica Portugal entre os países mais amigos LGBTQIA+ da Europa. Estas proteções são lei e aplicam-se a si quando viver cá.',
      timeline: [
        ['2004', 'Constituição', 'O artigo 13.º proíbe a discriminação em razão da orientação sexual.'],
        ['2010', 'Casamento', 'O casamento entre pessoas do mesmo sexo torna-se legal.'],
        ['2016', 'Adoção', 'Casais do mesmo sexo passam a ter plenos direitos de adoção.'],
        ['2018', 'Autodeterminação', 'Reconhecimento legal do género sem requisitos médicos.'],
      ],
      why: [
        'Casamento entre pessoas do mesmo sexo legal desde 2010, com direitos de adoção plenamente reconhecidos',
        'Entre as nações mais amigas LGBTQIA+ do mundo segundo a ILGA-Europe',
        'Leis antidiscriminação fortes, com proteção constitucional',
        'Comunidades de expatriados acolhedoras em Lisboa, no Porto e no Algarve',
        'Golden Visa, D7 e Nómada Digital como caminhos para residência e cidadania',
        'Alta qualidade de vida, custo acessível e excelentes cuidados de saúde',
      ],
    },
    services: {
      eyebrow: 'Serviços', titleA: 'Seis áreas de prática.', titleB: 'Um só', titleWord: 'contacto.',
      sub: 'Uma mudança toca várias áreas do direito ao mesmo tempo. Uma só equipa trata de todas, para que nada fique entre dois escritórios.',
      link: 'Fale connosco →',
      items: [
        { route: 'Visto → Residência', title: 'Imigração & vistos', tag: 'O seu caminho, garantido.', text: 'Golden Visa, D7 rendimento passivo, Nómada Digital, reagrupamento familiar, autorizações de residência e cidadania. Cada detalhe tratado com precisão e cuidado.' },
        { route: 'Capital → Imóvel', title: 'Imobiliário & investimento', tag: 'Decisões inteligentes, porto seguro.', text: 'Due diligence imobiliária, contratos de compra, estruturação de investimentos e planeamento fiscal, para decidir com informação num mercado novo.' },
        { route: 'Chegar → Instalar', title: 'Concierge de relocalização', tag: 'Instalação sem complicações.', text: 'NIF, segurança social, conta bancária, saúde, troca da carta de condução e inscrição escolar. Tratamos da burocracia por si.' },
        { route: 'Família → Protegida', title: 'Direito da família & pessoal', tag: 'Os seus direitos, protegidos.', text: 'Reconhecimento de casamento, adoção, responsabilidades parentais, divórcio, guarda e planeamento sucessório, com especialização em direito da família LGBTQIA+ e transfronteiriço.' },
        { route: 'Ideia → Empresa', title: 'Emprego & negócios', tag: 'Construa o que vem a seguir.', text: 'Autorizações de trabalho, contratos, constituição de empresas, direito comercial e estruturação de negócios, quer venha por trabalho ou para começar o seu.' },
        { route: 'Recém-chegado → Vizinho', title: 'Ligação à comunidade', tag: 'Pertença desde o primeiro dia.', text: 'Apresentações a organizações LGBTQIA+, redes de expatriados e recursos locais. Junta-se a uma comunidade que o acolhe.' },
      ],
    },
    places: {
      eyebrow: 'Destinos', titleA: 'Onde vai', titleB: '', titleWord: 'aterrar?',
      sub: 'Lisboa, Porto ou Algarve. Conhecemos as comunidades acolhedoras de cada um e verificamos cada imóvel antes de assinar.',
      qdl: 'Pinhal até ao Atlântico, a minutos do nosso escritório em Faro.', tavira: 'Casas brancas e telhados de terracota.', lagos: 'Falésias, enseadas e água cristalina.',
      pendingTag: 'A sua morada', pendingState: 'Pendente · due diligence', pendingTitle: 'A sua', pendingWord: 'casa.',
      pendingText: 'Contratos, verificação do registo e planeamento fiscal antes de se comprometer.', villaAlt: 'Moradia branca moderna com piscina e palmeiras',
    },
    stories: {
      eyebrow: 'Histórias de clientes', titleA: 'A confiança de famílias', titleWord: 'no mundo inteiro.',
      sub: 'Pessoas e casais que nos confiaram a sua mudança para Portugal.',
      items: [
        { via: 'D7', quote: 'Depois das eleições de 2024, sabíamos que tínhamos de deixar os EUA. A nextStep não tratou só do nosso visto D7. Deu-nos esperança e um caminho claro num tempo incerto. Seis meses depois, estamos em casa.', route: 'São Francisco → Cascais' },
        { via: 'Residência', quote: 'Como mulher trans, tinha medo das complexidades legais e da discriminação. A nextStep tratou-me com dignidade e profissionalismo. Sabiam exatamente pelo que eu estava a passar e fizeram tudo parecer seguro.', route: 'Toronto → Faro' },
        { via: 'Família', quote: 'Precisávamos de advogados que entendessem documentação brasileira, requisitos portugueses e a nossa situação como casal do mesmo sexo com filhos. A equipa da nextStep tratou de tudo. Até nos ajudaram a encontrar escolas!', route: 'São Paulo → Tavira' },
      ],
    },
    contact: {
      eyebrow: 'Contacto', titleA: 'Pronto para o', titleWord: 'próximo passo?',
      sub: 'Marque uma consulta confidencial, protegida pelo sigilo profissional. Trabalhamos em vários fusos horários, por isso encontramos uma hora que lhe convenha.',
      photoAlt: 'Duas pessoas de mãos dadas num caminho arborizado',
      office: 'Escritório', email: 'Email', phone: 'Telefone', hours: 'Horário', hoursValue: '24/7 por marcação', copy: 'Copiar', copied: 'Copiado',
      whatsapp: 'Conversar no WhatsApp', whatsappDesc: 'Resposta rápida, mesmo fora de horas',
      form: {
        tag: 'Nova consulta', ref: 'Confidencial', name: 'Nome completo', email: 'Email', phone: 'Telefone (opcional)', from: 'País de origem',
        service: 'Interesse principal', message: 'A sua situação', placeholder: 'Conte-nos a sua situação e o que espera alcançar.',
        submit: 'Pedir consulta', sending: 'A enviar…', note: 'Respondemos em 24 horas para marcar uma hora.',
        success: 'Obrigado. Respondemos em 24 horas para marcar a sua consulta.',
        missing: 'Indique o seu nome, um email válido e uma breve mensagem para podermos responder.',
        error: 'Não foi possível enviar o pedido. Tente novamente ou escreva para hello@nextstep.com.pt.',
        options: ['Golden Visa / imigração por investimento', 'Visto D7 / rendimento passivo', 'Visto Nómada Digital', 'Reagrupamento familiar', 'Compra de imóvel', 'Constituição de empresa', 'Consulta geral'],
      },
    },
    footer: {
      desc: 'Uma consultora boutique para pessoas e famílias LGBTQIA+ a construir uma nova vida em Portugal. A sua ponte, o seu defensor, o seu porto seguro.',
      services: 'Serviços', company: 'Empresa', legal: 'Legal',
      legalLinks: ['Política de privacidade', 'Termos de serviço', 'Aviso legal'],
      disclaimer: 'A nextStep é um serviço de consultoria pertencente a um escritório de advogados registado em Portugal. Este website fornece apenas informação geral e não constitui aconselhamento jurídico. Cada caso é único e requer uma consulta individual.',
    },
  },
};
