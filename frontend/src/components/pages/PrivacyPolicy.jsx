import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: February 2025",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect information you provide directly to us, such as when you fill out our contact form, request a consultation, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide."
        },
        {
          title: "2. How We Use Your Information",
          content: "We use the information we collect to respond to your inquiries, provide legal services, communicate with you about our services, and improve our website and services. We do not sell or share your personal information with third parties for marketing purposes."
        },
        {
          title: "3. Data Security",
          content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All communications regarding legal matters are protected by attorney-client privilege."
        },
        {
          title: "4. Cookies",
          content: "Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but this may limit your ability to use some features of our website."
        },
        {
          title: "5. Your Rights",
          content: "Under GDPR and Portuguese data protection law, you have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. To exercise these rights, please contact us at hello@nextstep.com.pt."
        },
        {
          title: "6. Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at hello@nextstep.com.pt or at our office address: Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro, Portugal."
        }
      ]
    },
    pt: {
      title: "Política de Privacidade",
      lastUpdated: "Última atualização: Fevereiro 2025",
      sections: [
        {
          title: "1. Informações que Recolhemos",
          content: "Recolhemos informações que nos fornece diretamente, como quando preenche o nosso formulário de contacto, solicita uma consulta ou comunica connosco. Isto pode incluir o seu nome, endereço de email, número de telefone e qualquer outra informação que escolha fornecer."
        },
        {
          title: "2. Como Utilizamos as Suas Informações",
          content: "Utilizamos as informações recolhidas para responder às suas questões, prestar serviços jurídicos, comunicar consigo sobre os nossos serviços e melhorar o nosso website e serviços. Não vendemos nem partilhamos as suas informações pessoais com terceiros para fins de marketing."
        },
        {
          title: "3. Segurança de Dados",
          content: "Implementamos medidas de segurança apropriadas para proteger as suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Todas as comunicações sobre assuntos jurídicos são protegidas pelo sigilo profissional."
        },
        {
          title: "4. Cookies",
          content: "O nosso website pode utilizar cookies e tecnologias de rastreamento semelhantes para melhorar a sua experiência de navegação. Pode configurar o seu navegador para recusar cookies, mas isto pode limitar a sua capacidade de usar algumas funcionalidades do nosso website."
        },
        {
          title: "5. Os Seus Direitos",
          content: "Ao abrigo do RGPD e da lei portuguesa de proteção de dados, tem o direito de aceder, corrigir ou eliminar os seus dados pessoais. Pode também opor-se ao tratamento ou solicitar a portabilidade dos dados. Para exercer estes direitos, contacte-nos em hello@nextstep.com.pt."
        },
        {
          title: "6. Contacte-nos",
          content: "Se tiver alguma questão sobre esta Política de Privacidade, contacte-nos em hello@nextstep.com.pt ou no nosso endereço: Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro, Portugal."
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="bg-[#F8F7F4] min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-heading text-4xl sm:text-5xl text-[#1A1A1A] italic mb-4">{t.title}</h1>
        <p className="text-[#666] mb-12">{t.lastUpdated}</p>
        
        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-heading text-xl text-[#1A1A1A] mb-3">{section.title}</h2>
              <p className="text-[#444] leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
