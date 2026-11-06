// Title and description of every page, in English and Portuguese.
// Used by the pages (usePageMeta) and by the build's prerender step (scripts/prerender.mjs).
export const PAGE_META = {
  "/": {
    en: { title: "LGBTQIA+ Immigration Lawyers in Portugal | nextStep", description: "Legal guidance and personal support for LGBTQIA+ people and families moving to Portugal: visas, property, family law and settling in. Based in Faro." },
    pt: { title: "Advogados de Imigração LGBTQIA+ em Portugal | nextStep", description: "Orientação jurídica e apoio pessoal para pessoas e famílias LGBTQIA+ que se mudam para Portugal: vistos, imobiliário, direito da família. Em Faro." },
  },
  "/privacy-policy": {
    en: { title: "Privacy Policy | nextStep", description: "How nextStep collects, uses and protects your personal data, and your rights under GDPR and Portuguese data protection law." },
    pt: { title: "Política de Privacidade | nextStep", description: "Como a nextStep recolhe, utiliza e protege os seus dados pessoais, e os seus direitos ao abrigo do RGPD." },
  },
  "/terms-of-service": {
    en: { title: "Terms of Service | nextStep", description: "The terms that apply when you use the nextStep website and book a consultation with our legal and relocation team." },
    pt: { title: "Termos de Serviço | nextStep", description: "Os termos que se aplicam ao utilizar o website da nextStep e ao marcar uma consulta com a nossa equipa." },
  },
  "/legal-disclaimer": {
    en: { title: "Legal Disclaimer | nextStep", description: "The nextStep website gives general information only and is not legal advice. Every case needs an individual consultation." },
    pt: { title: "Aviso Legal | nextStep", description: "O website da nextStep fornece apenas informação geral e não constitui aconselhamento jurídico." },
  },
};

// Pages listed in the sitemap and prerendered at build time.
export const PRERENDER_PATHS = ['/', '/privacy-policy', '/terms-of-service', '/legal-disclaimer'];
