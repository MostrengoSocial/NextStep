import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const TermsOfService = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: February 2025",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using the nextStep website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website."
        },
        {
          title: "2. Services Description",
          content: "nextStep provides consultancy services related to immigration, investment, and relocation to Portugal. Our services are provided through a registered legal practice in Portugal. The information on this website is for general informational purposes only."
        },
        {
          title: "3. No Attorney-Client Relationship",
          content: "Using this website or contacting us through the contact form does not create an attorney-client relationship. Such a relationship is only established through a formal engagement agreement signed by both parties."
        },
        {
          title: "4. Disclaimer of Warranties",
          content: "This website and its content are provided 'as is' without warranties of any kind. We do not guarantee that the information on this website is complete, accurate, or current. Each legal situation is unique and requires individual consultation."
        },
        {
          title: "5. Limitation of Liability",
          content: "nextStep shall not be liable for any damages arising from your use of this website or reliance on any information provided herein. This limitation applies to direct, indirect, incidental, and consequential damages."
        },
        {
          title: "6. Intellectual Property",
          content: "All content on this website, including text, graphics, logos, and images, is the property of nextStep and is protected by copyright and other intellectual property laws. You may not reproduce or distribute this content without our written permission."
        },
        {
          title: "7. Governing Law",
          content: "These Terms of Service are governed by and construed in accordance with the laws of Portugal. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Portuguese courts."
        },
        {
          title: "8. Contact",
          content: "For questions about these Terms of Service, please contact us at hello@nextstep.com.pt."
        }
      ]
    },
    pt: {
      title: "Termos de Serviço",
      lastUpdated: "Última atualização: Fevereiro 2025",
      sections: [
        {
          title: "1. Aceitação dos Termos",
          content: "Ao aceder e utilizar o website da nextStep, aceita e concorda em ficar vinculado a estes Termos de Serviço. Se não concordar com estes termos, por favor não utilize o nosso website."
        },
        {
          title: "2. Descrição dos Serviços",
          content: "A nextStep fornece serviços de consultoria relacionados com imigração, investimento e relocalização para Portugal. Os nossos serviços são prestados através de um escritório de advocacia registado em Portugal. As informações neste website são apenas para fins informativos gerais."
        },
        {
          title: "3. Ausência de Relação Advogado-Cliente",
          content: "A utilização deste website ou o contacto através do formulário não cria uma relação advogado-cliente. Tal relação só é estabelecida através de um contrato de prestação de serviços formal assinado por ambas as partes."
        },
        {
          title: "4. Isenção de Garantias",
          content: "Este website e o seu conteúdo são fornecidos 'tal como estão', sem garantias de qualquer tipo. Não garantimos que as informações neste website sejam completas, precisas ou atuais. Cada situação jurídica é única e requer consulta individual."
        },
        {
          title: "5. Limitação de Responsabilidade",
          content: "A nextStep não será responsável por quaisquer danos decorrentes da utilização deste website ou da confiança em qualquer informação aqui fornecida. Esta limitação aplica-se a danos diretos, indiretos, incidentais e consequenciais."
        },
        {
          title: "6. Propriedade Intelectual",
          content: "Todo o conteúdo deste website, incluindo texto, gráficos, logótipos e imagens, é propriedade da nextStep e está protegido por direitos de autor e outras leis de propriedade intelectual. Não pode reproduzir ou distribuir este conteúdo sem a nossa permissão escrita."
        },
        {
          title: "7. Lei Aplicável",
          content: "Estes Termos de Serviço são regidos e interpretados de acordo com as leis de Portugal. Quaisquer litígios decorrentes destes termos estarão sujeitos à jurisdição exclusiva dos tribunais portugueses."
        },
        {
          title: "8. Contacto",
          content: "Para questões sobre estes Termos de Serviço, contacte-nos em hello@nextstep.com.pt."
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
