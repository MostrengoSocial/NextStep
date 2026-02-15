import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LegalDisclaimer = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Legal Disclaimer",
      lastUpdated: "Last updated: February 2025",
      sections: [
        {
          title: "General Information Only",
          content: "The information provided on this website is for general informational purposes only and should not be construed as legal advice. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information."
        },
        {
          title: "No Attorney-Client Relationship",
          content: "The use of this website, including the contact form or any communication through this site, does not create an attorney-client relationship between you and nextStep or any of its attorneys. An attorney-client relationship is only formed when there is a signed engagement letter between you and our firm."
        },
        {
          title: "Individual Consultation Required",
          content: "Every legal matter is unique, and the information on this website may not apply to your specific situation. Before making any decisions based on the information provided, you should consult with a qualified legal professional who can assess your individual circumstances."
        },
        {
          title: "No Guarantee of Results",
          content: "Past results do not guarantee future outcomes. Every case is different, and the outcome of any legal matter depends on a variety of factors specific to each case. Testimonials on this website represent individual experiences and do not guarantee similar results."
        },
        {
          title: "Third-Party Links",
          content: "This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of linked sites and accept no responsibility for them or for any loss or damage that may arise from your use of them."
        },
        {
          title: "Changes to This Disclaimer",
          content: "We reserve the right to modify this legal disclaimer at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website after any changes indicates your acceptance of the modified disclaimer."
        },
        {
          title: "Contact Information",
          content: "If you have any questions about this Legal Disclaimer or require legal assistance, please contact us at hello@nextstep.com.pt or visit our office at Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro, Portugal."
        }
      ]
    },
    pt: {
      title: "Aviso Legal",
      lastUpdated: "Última atualização: Fevereiro 2025",
      sections: [
        {
          title: "Informação Geral Apenas",
          content: "As informações fornecidas neste website são apenas para fins informativos gerais e não devem ser interpretadas como aconselhamento jurídico. Embora nos esforcemos por manter as informações precisas e atualizadas, não fazemos representações ou garantias de qualquer tipo, expressas ou implícitas, sobre a completude, precisão, fiabilidade ou adequação das informações."
        },
        {
          title: "Ausência de Relação Advogado-Cliente",
          content: "A utilização deste website, incluindo o formulário de contacto ou qualquer comunicação através deste site, não cria uma relação advogado-cliente entre si e a nextStep ou qualquer dos seus advogados. Uma relação advogado-cliente só é formada quando existe uma carta de compromisso assinada entre si e o nosso escritório."
        },
        {
          title: "Consulta Individual Necessária",
          content: "Cada questão jurídica é única, e as informações neste website podem não se aplicar à sua situação específica. Antes de tomar quaisquer decisões com base nas informações fornecidas, deve consultar um profissional jurídico qualificado que possa avaliar as suas circunstâncias individuais."
        },
        {
          title: "Sem Garantia de Resultados",
          content: "Resultados passados não garantem resultados futuros. Cada caso é diferente, e o resultado de qualquer questão jurídica depende de uma variedade de fatores específicos de cada caso. Os testemunhos neste website representam experiências individuais e não garantem resultados semelhantes."
        },
        {
          title: "Links de Terceiros",
          content: "Este website pode conter links para websites de terceiros. Estes links são fornecidos apenas para sua conveniência. Não temos controlo sobre o conteúdo dos sites ligados e não aceitamos responsabilidade por eles ou por qualquer perda ou dano que possa surgir da sua utilização."
        },
        {
          title: "Alterações a Este Aviso",
          content: "Reservamo-nos o direito de modificar este aviso legal a qualquer momento. As alterações serão efetivas imediatamente após a publicação neste website. A sua utilização continuada do website após quaisquer alterações indica a sua aceitação do aviso modificado."
        },
        {
          title: "Informações de Contacto",
          content: "Se tiver alguma questão sobre este Aviso Legal ou necessitar de assistência jurídica, contacte-nos em hello@nextstep.com.pt ou visite o nosso escritório em Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro, Portugal."
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
