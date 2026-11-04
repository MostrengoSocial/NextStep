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
  { src: images.tavira, from: 'GRU', fromCity: 'São Paulo', to: 'FAO', place: 'Tavira', coord: '37.1264° N · 7.6486° W', alt: { en: 'Tavira, white houses with terracotta roofs below a church', pt: 'Tavira, casas brancas com telhados de terracota' } },
  { src: images.quintaDoLago, from: 'YYZ', fromCity: 'Toronto', to: 'FAO', place: 'Quinta do Lago', coord: '37.0287° N · 8.0170° W', alt: { en: 'Aerial view of the beach and pine forest at Quinta do Lago', pt: 'Vista aérea da praia e do pinhal da Quinta do Lago' } },
  { src: images.lisbon, from: 'JFK', fromCity: 'New York', to: 'LIS', place: 'Lisboa', coord: '38.7223° N · 9.1393° W', alt: { en: 'Yellow tram 28 passing a pink building in Lisbon', pt: 'Elétrico 28 amarelo junto a um prédio cor-de-rosa em Lisboa' } },
  { src: images.lagos, lift: true, from: 'SFO', fromCity: 'San Francisco', to: 'FAO', place: 'Lagos', coord: '37.0814° N · 8.6705° W', alt: { en: 'Rock arches and cliffs on the coast at Lagos', pt: 'Arcos de rocha e falésias na costa de Lagos' } },
];

export const contact = {
  address: 'Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro',
  email: 'hello@nextstep.com.pt',
  phone: '+351 934 229 144',
  whatsapp: 'https://wa.me/351934229144',
};

// Relocation routes. lat/lon are real city coordinates; `to` is the
// destination key in `destinations`. The first three come from client stories.
export const routes = [
  { from: 'San Francisco', code: 'SFO', lat: 37.77, lon: -122.42, to: 'cascais', via: 'D7', status: 'arrived', color: 'var(--red)' },
  { from: 'Toronto', code: 'YYZ', lat: 43.65, lon: -79.38, to: 'faro', via: 'Residency', status: 'arrived', color: 'var(--blue)' },
  { from: 'São Paulo', code: 'GRU', lat: -23.55, lon: -46.63, to: 'tavira', via: 'Family', status: 'arrived', color: 'var(--green)' },
  { from: 'New York', code: 'JFK', lat: 40.71, lon: -74.01, to: 'lisboa', via: 'Nomad', status: 'boarding', color: 'var(--magenta)' },
  { from: 'Rio de Janeiro', code: 'GIG', lat: -22.91, lon: -43.17, to: 'porto', via: 'Golden', status: 'boarding', color: 'var(--orange)' },
  { from: 'Vancouver', code: 'YVR', lat: 49.28, lon: -123.12, to: 'lagos', via: 'D7', status: 'boarding', color: 'var(--yellow)' },
];

export const destinations = {
  porto: { name: 'Porto', lat: 41.15, lon: -8.61 },
  lisboa: { name: 'Lisboa', lat: 38.72, lon: -9.14 },
  cascais: { name: 'Cascais', lat: 38.70, lon: -9.42 },
  lagos: { name: 'Lagos', lat: 37.10, lon: -8.67 },
  faro: { name: 'Faro', lat: 37.02, lon: -7.93 },
  tavira: { name: 'Tavira', lat: 37.13, lon: -7.65 },
};

// Simplified outline of mainland Portugal as [lon, lat] points (approximate).
export const portugalOutline = [
  [-8.87, 41.87], [-8.6, 42.05], [-8.2, 42.14], [-7.9, 41.9], [-7.2, 41.98], [-6.6, 41.95], [-6.19, 41.58],
  [-6.5, 41.3], [-6.93, 41.02], [-6.8, 40.6], [-6.86, 40.27], [-7.03, 39.67], [-7.5, 39.6], [-7.3, 39.45],
  [-7.0, 39.0], [-7.2, 38.75], [-7.3, 38.43], [-6.95, 38.2], [-7.25, 37.95], [-7.5, 37.55], [-7.42, 37.19],
  [-7.65, 37.1], [-7.87, 36.96], [-8.07, 37.05], [-8.25, 37.08], [-8.54, 37.11], [-8.67, 37.08], [-8.95, 37.0],
  [-8.99, 37.03], [-8.79, 37.5], [-8.8, 37.95], [-8.87, 38.2], [-8.78, 38.5], [-9.18, 38.42], [-9.0, 38.62],
  [-9.42, 38.69], [-9.5, 38.78], [-9.42, 39.0], [-9.38, 39.36], [-9.1, 39.6], [-8.9, 40.0], [-8.67, 40.64],
  [-8.69, 41.15], [-8.78, 41.5],
];

// Approximate Algarve coastline, west to east, as [lon, lat] points.
export const algarveCoast = [
  [-8.997, 37.12], [-8.997, 37.023], [-8.95, 37.0], [-8.87, 37.03], [-8.83, 37.065], [-8.73, 37.085], [-8.67, 37.08],
  [-8.66, 37.1], [-8.6, 37.12], [-8.54, 37.115], [-8.47, 37.09], [-8.37, 37.1], [-8.25, 37.085], [-8.19, 37.09],
  [-8.12, 37.07], [-8.07, 37.05], [-8.02, 37.03], [-7.93, 36.99], [-7.87, 36.96], [-7.83, 36.99], [-7.74, 37.05],
  [-7.62, 37.1], [-7.6, 37.13], [-7.45, 37.18], [-7.4, 37.2],
];

// Approximate outline of the Algarve region, clockwise from Odeceixe on the
// west coast: down the west coast, east along the south coast, up the
// Guadiana (border with Spain), then west along the northern boundary.
export const algarveWestCoast = [
  [-8.80, 37.56], [-8.78, 37.44], [-8.83, 37.38], [-8.90, 37.32], [-8.87, 37.29], [-8.91, 37.19], [-8.94, 37.10],
];
export const guadiana = [[-7.41, 37.19], [-7.43, 37.25], [-7.45, 37.38], [-7.47, 37.47], [-7.51, 37.53], [-7.50, 37.58]];
export const algarveNorthBorder = [
  [-7.51, 37.53], [-7.62, 37.47], [-7.75, 37.42], [-8.0, 37.38], [-8.2, 37.36], [-8.45, 37.40], [-8.6, 37.38], [-8.78, 37.44],
];

export const coastTowns = [
  { key: 'lagos', name: 'Lagos', lat: 37.10, lon: -8.67, anchor: 'place-lagos' },
  { key: 'portimao', name: 'Portimão', lat: 37.14, lon: -8.54, minor: true },
  { key: 'albufeira', name: 'Albufeira', lat: 37.09, lon: -8.25, minor: true },
  { key: 'sagres', name: 'Sagres', lat: 37.01, lon: -8.94, minor: true },
  { key: 'monchique', name: 'Monchique', lat: 37.32, lon: -8.56, minor: true },
  { key: 'vrsa', name: 'V. R. S. António', lat: 37.19, lon: -7.42, minor: true },
  { key: 'qdl', name: 'Quinta do Lago', lat: 37.04, lon: -8.02, anchor: 'place-qdl' },
  { key: 'faro', name: 'Faro', lat: 37.02, lon: -7.93, office: true },
  { key: 'tavira', name: 'Tavira', lat: 37.13, lon: -7.65, anchor: 'place-tavira' },
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
    nav: { routes: 'Routes', about: 'About', rights: 'Why Portugal', services: 'Services', stories: 'Stories', contact: 'Contact', cta: 'Book a consultation', switchLang: 'Mudar para Português', light: 'Light', dark: 'Dark', theme: 'Switch colour theme', you: 'You' },
    hero: {
      eyebrow: 'LGBTQIA+ relocation law · Portugal',
      titleA: 'Your next step', titleB: 'is', titleWord: 'home.',
      sub: 'Legal guidance and personal support for LGBTQIA+ people and families moving to Portugal. We handle the visas, the property and the paperwork, and we help you settle in.',
      cta1: 'Book a confidential consultation', cta2: 'See our services', card: 'Destination · PT', show: 'Show',
      pass: { title: 'Boarding pass', from: 'From', to: 'To', passenger: 'Passenger', you: 'You', gate: 'Gate', seat: 'Seat', home: 'Home', boarding: 'Boarding', now: 'When ready', stub: 'Admit one · Portugal' },
    },
    facts: [['Office', 'Faro · Algarve'], ['Languages', 'EN · PT'], ['Reply time', 'Within 24 hours'], ['Consultations', 'Legally privileged']],
    routes: {
      eyebrow: 'Routes', titleA: "Wherever you're leaving from.", titleB: 'We handle the', titleWord: 'arrival.',
      sub: 'Clients come to us from the US, Canada, Brazil and beyond. Each route has its own documents, visa and timing. We plan it from the first call to your residence card.',
      cols: ['From', 'To', 'Pathway', 'Status'], status: { arrived: 'ARRIVED', boarding: 'BOARDING' },
      legend: ['Arrived: routes from the client stories below', 'Boarding: other routes we handle often'],
      inset: 'Portugal · enlarged', note: 'City positions are real coordinates. Portugal is enlarged so each destination is visible.',
      arrow: 'to',
      label: 'Relocation routes',
    },
    about: {
      eyebrow: 'Who we are', titleA: 'Lawyers who', titleWord: 'get it.',
      p1: 'nextStep is a boutique legal practice for LGBTQIA+ individuals and families choosing Portugal. We cover immigration, investment and relocation, and we translate the culture as well as the law.',
      p2: 'Our attorneys combine deep Portuguese legal expertise with lived international experience. We act as your concierge for big decisions, your cultural interpreter and your advocate. You get legal security, personal attention and a safe harbour. You are never just a case number.',
      link: 'Talk to the team →', photoAlt: 'Yellow tram 28 in a Lisbon street',
      bridge: {
        title: 'We build bridges to your new life.', there: 'Where you are', here: 'Your new life',
        towers: [['Legal', 'Visas, contracts, rights'], ['Cultural', 'Language, customs, community'], ['Personal', 'Schools, healthcare, home']],
        label: 'A bridge from where you are to your new life, held up by legal, cultural and personal support',
      },
      houses: { title: 'Families supported', caption: 'Each filled house is one family we have helped settle in Portugal. The outlined ones are for the families still to come.', next: 'Yours could be next', label: '300 filled houses and 20 outlined houses' },
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
      plan: {
        title: 'How a typical move fits together', note: 'Illustrative. Every case has its own timeline.', month: 'Month',
        hint: 'Select a service to see what it covers.', included: "What's included", timing: 'Typical timing', months: 'Months', ongoing: 'and ongoing',
        milestones: [[0, 'First consultation'], [4, 'Arrival'], [6, 'Settled']],
        lanes: [
          { short: 'Immigration', start: 0, end: 4.5, text: 'Visa application and residence permit' },
          { short: 'Real estate', start: 1, end: 4, text: 'Due diligence and purchase' },
          { short: 'Concierge', start: 3.5, end: 6, text: 'NIF, bank, healthcare, schools' },
          { short: 'Family law', start: 0, end: 6, text: 'Recognition and documents, as needed', light: true },
          { short: 'Business', start: 2, end: 5, text: 'Contracts or company set-up' },
          { short: 'Community', start: 4, end: 6, text: 'Introductions, then ongoing', open: true },
        ],
      },
      link: 'Talk to us →',
      items: [
        { route: 'Visa → Residence', title: 'Immigration & visas', includes: ['Golden Visa', 'D7 passive income', 'Digital Nomad visa', 'Family reunification', 'Residence permits', 'Citizenship'], tag: 'Your pathway, secured.', text: 'Golden Visa, D7 passive income, Digital Nomad, family reunification, residence permits and citizenship. Every detail handled with precision and care.' },
        { route: 'Capital → Property', title: 'Real estate & investment', includes: ['Property due diligence', 'Purchase contracts', 'Investment structuring', 'Tax planning'], tag: 'Smart decisions, safe harbour.', text: 'Property due diligence, purchase contracts, investment structuring and tax planning, so you make informed decisions in a foreign market.' },
        { route: 'Arrive → Settle', title: 'Relocation concierge', includes: ['NIF tax number', 'Social security', 'Bank account', 'Healthcare (SNS)', 'Driving licence exchange', 'School enrolment'], tag: 'Settling in, sorted.', text: 'NIF, social security, bank account, healthcare, driving licence exchange and school enrolment. We deal with the bureaucracy so you can settle in.' },
        { route: 'Family → Protected', title: 'Family & personal law', includes: ['Marriage recognition', 'Adoption', 'Parental rights', 'Divorce and custody', 'Estate planning'], tag: 'Your rights, protected.', text: 'Marriage recognition, adoption, parental rights, divorce, custody and estate planning, with specialist knowledge of LGBTQIA+ and cross-border family law.' },
        { route: 'Idea → Company', title: 'Employment & business', includes: ['Work permits', 'Employment contracts', 'Company formation', 'Commercial law'], tag: 'Build what comes next.', text: 'Work permits, employment contracts, company formation, commercial law and business structuring, whether you move for a job or start your own.' },
        { route: 'Newcomer → Neighbour', title: 'Community connection', includes: ['LGBTQIA+ organisations', 'Expat networks', 'Local resources'], tag: 'Belong from day one.', text: 'Introductions to LGBTQIA+ organisations, expat networks and local resources. You join a community that welcomes you.' },
      ],
    },
    places: {
      eyebrow: 'Destinations', titleA: 'Where will', titleB: 'you', titleWord: 'land?',
      sub: 'Lisbon, Porto or the Algarve. We know the welcoming communities in each, and we check every property before you sign.',
      qdl: 'Pine forest down to the Atlantic, minutes from our Faro office.', tavira: 'White houses and terracotta roofs.', lagos: 'Cliffs, coves and clear water.',
      pendingTag: 'Your address', pendingState: 'Pending · due diligence', pendingTitle: 'Your', pendingWord: 'home.',
      pendingText: 'Contracts, title checks and tax planning before you commit.', villaAlt: 'Modern white villa with a pool and palm trees',
      coast: { title: 'The Algarve, west to east', office: 'nextStep office', ocean: 'Atlantic Ocean', region: 'Algarve', north: 'Alentejo', spain: 'Spain', river: 'Guadiana', note: 'Approximate outline of the whole region. Towns placed by real coordinates.', km: '10 km', label: 'Map of the Algarve coast with Lagos, Quinta do Lago, Faro and Tavira' },
    },
    stories: {
      eyebrow: 'Client stories', titleA: 'Trusted by families', titleWord: 'worldwide.',
      sub: 'Individuals and couples who trusted us with their move to Portugal.',
      photoAlt: 'Two people holding hands on a tree-lined path', journey: 'From first call to home', note: 'Milestones come from each client’s own story. Timing is shown only where the client gave it.', home: 'Home',
      items: [
        { via: 'D7', quote: "After the 2024 election, we knew we had to leave the US. nextStep didn't just handle our D7 visa. They gave us hope and a clear path during an uncertain time. Six months later, we're home.", route: 'San Francisco → Cascais', steps: ['First call', 'D7 visa', 'The move', 'Home'], when: 'Six months' },
        { via: 'Residency', quote: 'As a trans woman, I was terrified of the legal complexity and of discrimination. nextStep treated me with dignity and professionalism. They knew exactly what I was going through and made everything feel safe.', route: 'Toronto → Faro', steps: ['First call', 'Residency', 'Moving to Faro', 'Home'] },
        { via: 'Family', quote: "We needed lawyers who understood Brazilian documents, Portuguese requirements and our situation as a same-sex couple with kids. nextStep's team handled it all flawlessly. They even helped us find schools!", route: 'São Paulo → Tavira', steps: ['First call', 'Documents', 'Schools', 'Home'] },
      ],
    },
    contact: {
      eyebrow: 'Contact', titleA: 'Let’s start', titleWord: 'your journey.',
      sub: 'Book a confidential consultation, protected by attorney-client privilege. We work across time zones, so we can meet when it suits you.',
      photoAlt: 'Two people holding hands on a tree-lined path',
      office: 'Office', email: 'Email', phone: 'Phone', hours: 'Hours', hoursValue: '24/7 by appointment', copy: 'Copy', copied: 'Copied',
      whatsapp: 'Chat on WhatsApp', whatsappDesc: 'Quick replies, even outside office hours',
      map: { title: 'Find the office', floor: '4th floor, D', directions: 'Get directions', note: 'Schematic map, not to scale', centre: 'Faro · Centre', label: 'Schematic map of central Faro with a pin on Largo de São Luís' },
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
      services: 'Services', company: 'Company', legal: 'Legal', askA: 'Ready for your', askWord: 'next step?', step: 'Step', of: 'of',
      legalLinks: ['Privacy policy', 'Terms of service', 'Legal disclaimer'],
      disclaimer: 'nextStep is a consultancy service owned by a registered legal practice in Portugal. This website gives general information only and is not legal advice. Every case is different and needs an individual consultation.',
    },
  },

  pt: {
    nav: { routes: 'Rotas', about: 'Sobre', rights: 'Porquê Portugal', services: 'Serviços', stories: 'Histórias', contact: 'Contacto', cta: 'Marcar consulta', switchLang: 'Switch to English', light: 'Claro', dark: 'Escuro', theme: 'Mudar o tema de cores', you: 'Você' },
    hero: {
      eyebrow: 'Direito de relocalização LGBTQIA+ · Portugal',
      titleA: 'O seu próximo passo', titleB: 'é', titleWord: 'casa.',
      sub: 'Orientação jurídica e apoio pessoal para pessoas e famílias LGBTQIA+ que se mudam para Portugal. Tratamos dos vistos, do imóvel e da papelada, e ajudamos a instalar-se.',
      cta1: 'Marcar consulta confidencial', cta2: 'Ver serviços', card: 'Destino · PT', show: 'Mostrar',
      pass: { title: 'Cartão de embarque', from: 'Partida', to: 'Destino', passenger: 'Passageiro', you: 'Você', gate: 'Porta', seat: 'Lugar', home: 'Casa', boarding: 'Embarque', now: 'Quando quiser', stub: 'Entrada · Portugal' },
    },
    facts: [['Escritório', 'Faro · Algarve'], ['Idiomas', 'EN · PT'], ['Resposta', 'Em 24 horas'], ['Consultas', 'Sob sigilo profissional']],
    routes: {
      eyebrow: 'Rotas', titleA: 'Venha de onde vier.', titleB: 'Nós tratamos da', titleWord: 'chegada.',
      sub: 'Os nossos clientes vêm dos EUA, do Canadá, do Brasil e de outros países. Cada rota tem os seus documentos, visto e prazos. Planeamos tudo, da primeira chamada ao cartão de residência.',
      cols: ['Partida', 'Destino', 'Via', 'Estado'], status: { arrived: 'CHEGOU', boarding: 'EMBARQUE' },
      legend: ['Chegou: rotas das histórias de clientes abaixo', 'Embarque: outras rotas que tratamos com frequência'],
      inset: 'Portugal · ampliado', note: 'As cidades estão nas coordenadas reais. Portugal está ampliado para se ver cada destino.',
      arrow: 'para',
      label: 'Rotas de relocalização',
    },
    about: {
      eyebrow: 'Quem somos', titleA: 'Advogados que', titleWord: 'entendem.',
      p1: 'A nextStep é um escritório boutique para pessoas e famílias LGBTQIA+ que escolhem Portugal. Tratamos de imigração, investimento e relocalização, e traduzimos a cultura além da lei.',
      p2: 'Os nossos advogados juntam profundo conhecimento do direito português e experiência internacional vivida. Somos o seu concierge para grandes decisões, o seu intérprete cultural e o seu defensor. Tem segurança jurídica, atenção pessoal e um porto seguro. Nunca é apenas um número de processo.',
      link: 'Fale com a equipa →', photoAlt: 'Elétrico 28 amarelo numa rua de Lisboa',
      bridge: {
        title: 'Construímos pontes para a sua nova vida.', there: 'Onde está', here: 'A sua nova vida',
        towers: [['Jurídico', 'Vistos, contratos, direitos'], ['Cultural', 'Língua, costumes, comunidade'], ['Pessoal', 'Escolas, saúde, casa']],
        label: 'Uma ponte de onde está até à sua nova vida, sustentada por apoio jurídico, cultural e pessoal',
      },
      houses: { title: 'Famílias apoiadas', caption: 'Cada casa preenchida é uma família que ajudámos a instalar-se em Portugal. As casas por preencher são para as famílias que ainda vêm.', next: 'A próxima pode ser a sua', label: '300 casas preenchidas e 20 por preencher' },
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
      plan: {
        title: 'Como se organiza uma mudança típica', note: 'Ilustrativo. Cada caso tem o seu próprio calendário.', month: 'Mês',
        hint: 'Escolha um serviço para ver o que inclui.', included: 'O que inclui', timing: 'Calendário típico', months: 'Meses', ongoing: 'e depois sempre',
        milestones: [[0, 'Primeira consulta'], [4, 'Chegada'], [6, 'Instalado']],
        lanes: [
          { short: 'Imigração', start: 0, end: 4.5, text: 'Pedido de visto e autorização de residência' },
          { short: 'Imobiliário', start: 1, end: 4, text: 'Due diligence e compra' },
          { short: 'Concierge', start: 3.5, end: 6, text: 'NIF, banco, saúde, escolas' },
          { short: 'Família', start: 0, end: 6, text: 'Reconhecimento e documentos, se necessário', light: true },
          { short: 'Negócios', start: 2, end: 5, text: 'Contratos ou constituição de empresa' },
          { short: 'Comunidade', start: 4, end: 6, text: 'Apresentações e depois sempre', open: true },
        ],
      },
      link: 'Fale connosco →',
      items: [
        { route: 'Visto → Residência', title: 'Imigração & vistos', includes: ['Golden Visa', 'D7 rendimento passivo', 'Visto Nómada Digital', 'Reagrupamento familiar', 'Autorizações de residência', 'Cidadania'], tag: 'O seu caminho, garantido.', text: 'Golden Visa, D7 rendimento passivo, Nómada Digital, reagrupamento familiar, autorizações de residência e cidadania. Cada detalhe tratado com precisão e cuidado.' },
        { route: 'Capital → Imóvel', title: 'Imobiliário & investimento', includes: ['Due diligence imobiliária', 'Contratos de compra', 'Estruturação de investimentos', 'Planeamento fiscal'], tag: 'Decisões inteligentes, porto seguro.', text: 'Due diligence imobiliária, contratos de compra, estruturação de investimentos e planeamento fiscal, para decidir com informação num mercado novo.' },
        { route: 'Chegar → Instalar', title: 'Concierge de relocalização', includes: ['NIF', 'Segurança social', 'Conta bancária', 'Saúde (SNS)', 'Troca da carta de condução', 'Inscrição escolar'], tag: 'Instalação sem complicações.', text: 'NIF, segurança social, conta bancária, saúde, troca da carta de condução e inscrição escolar. Tratamos da burocracia por si.' },
        { route: 'Família → Protegida', title: 'Direito da família & pessoal', includes: ['Reconhecimento de casamento', 'Adoção', 'Responsabilidades parentais', 'Divórcio e guarda', 'Planeamento sucessório'], tag: 'Os seus direitos, protegidos.', text: 'Reconhecimento de casamento, adoção, responsabilidades parentais, divórcio, guarda e planeamento sucessório, com especialização em direito da família LGBTQIA+ e transfronteiriço.' },
        { route: 'Ideia → Empresa', title: 'Emprego & negócios', includes: ['Autorizações de trabalho', 'Contratos de trabalho', 'Constituição de empresas', 'Direito comercial'], tag: 'Construa o que vem a seguir.', text: 'Autorizações de trabalho, contratos, constituição de empresas, direito comercial e estruturação de negócios, quer venha por trabalho ou para começar o seu.' },
        { route: 'Recém-chegado → Vizinho', title: 'Ligação à comunidade', includes: ['Organizações LGBTQIA+', 'Redes de expatriados', 'Recursos locais'], tag: 'Pertença desde o primeiro dia.', text: 'Apresentações a organizações LGBTQIA+, redes de expatriados e recursos locais. Junta-se a uma comunidade que o acolhe.' },
      ],
    },
    places: {
      eyebrow: 'Destinos', titleA: 'Onde vai', titleB: '', titleWord: 'aterrar?',
      sub: 'Lisboa, Porto ou Algarve. Conhecemos as comunidades acolhedoras de cada um e verificamos cada imóvel antes de assinar.',
      qdl: 'Pinhal até ao Atlântico, a minutos do nosso escritório em Faro.', tavira: 'Casas brancas e telhados de terracota.', lagos: 'Falésias, enseadas e água cristalina.',
      pendingTag: 'A sua morada', pendingState: 'Pendente · due diligence', pendingTitle: 'A sua', pendingWord: 'casa.',
      pendingText: 'Contratos, verificação do registo e planeamento fiscal antes de se comprometer.', villaAlt: 'Moradia branca moderna com piscina e palmeiras',
      coast: { title: 'O Algarve, de oeste para este', office: 'Escritório nextStep', ocean: 'Oceano Atlântico', region: 'Algarve', north: 'Alentejo', spain: 'Espanha', river: 'Guadiana', note: 'Contorno aproximado de toda a região. Localidades nas coordenadas reais.', km: '10 km', label: 'Mapa da costa algarvia com Lagos, Quinta do Lago, Faro e Tavira' },
    },
    stories: {
      eyebrow: 'Histórias de clientes', titleA: 'A confiança de famílias', titleWord: 'no mundo inteiro.',
      sub: 'Pessoas e casais que nos confiaram a sua mudança para Portugal.',
      photoAlt: 'Duas pessoas de mãos dadas num caminho arborizado', journey: 'Da primeira chamada até casa', note: 'Os marcos vêm da história de cada cliente. O tempo só aparece quando o cliente o indicou.', home: 'Casa',
      items: [
        { via: 'D7', quote: 'Depois das eleições de 2024, sabíamos que tínhamos de deixar os EUA. A nextStep não tratou só do nosso visto D7. Deu-nos esperança e um caminho claro num tempo incerto. Seis meses depois, estamos em casa.', route: 'São Francisco → Cascais', steps: ['Primeira chamada', 'Visto D7', 'A mudança', 'Casa'], when: 'Seis meses' },
        { via: 'Residência', quote: 'Como mulher trans, tinha medo das complexidades legais e da discriminação. A nextStep tratou-me com dignidade e profissionalismo. Sabiam exatamente pelo que eu estava a passar e fizeram tudo parecer seguro.', route: 'Toronto → Faro', steps: ['Primeira chamada', 'Residência', 'Mudança para Faro', 'Casa'] },
        { via: 'Família', quote: 'Precisávamos de advogados que entendessem documentação brasileira, requisitos portugueses e a nossa situação como casal do mesmo sexo com filhos. A equipa da nextStep tratou de tudo. Até nos ajudaram a encontrar escolas!', route: 'São Paulo → Tavira', steps: ['Primeira chamada', 'Documentos', 'Escolas', 'Casa'] },
      ],
    },
    contact: {
      eyebrow: 'Contacto', titleA: 'Vamos começar', titleWord: 'a sua jornada.',
      sub: 'Marque uma consulta confidencial, protegida pelo sigilo profissional. Trabalhamos em vários fusos horários, por isso encontramos uma hora que lhe convenha.',
      photoAlt: 'Duas pessoas de mãos dadas num caminho arborizado',
      office: 'Escritório', email: 'Email', phone: 'Telefone', hours: 'Horário', hoursValue: '24/7 por marcação', copy: 'Copiar', copied: 'Copiado',
      whatsapp: 'Conversar no WhatsApp', whatsappDesc: 'Resposta rápida, mesmo fora de horas',
      map: { title: 'Encontre o escritório', floor: '4.º andar, D', directions: 'Obter direções', note: 'Mapa esquemático, sem escala', centre: 'Faro · Centro', label: 'Mapa esquemático do centro de Faro com marcador no Largo de São Luís' },
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
      services: 'Serviços', company: 'Empresa', legal: 'Legal', askA: 'Pronto para o', askWord: 'próximo passo?', step: 'Passo', of: 'de',
      legalLinks: ['Política de privacidade', 'Termos de serviço', 'Aviso legal'],
      disclaimer: 'A nextStep é um serviço de consultoria pertencente a um escritório de advogados registado em Portugal. Este website fornece apenas informação geral e não constitui aconselhamento jurídico. Cada caso é único e requer uma consulta individual.',
    },
  },
};
