import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content, contactImage } from '../../data/mock';
import { useInView } from '../../hooks/useInView';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Mail, Phone, Clock, Send, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

export const Contact = () => {
  const { language } = useLanguage();
  const t = content[language].contact;
  const [headerRef, headerVisible] = useInView();
  const [contentRef, contentVisible] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(language === 'en' ? 'Please fill in all required fields.' : 'Por favor preencha todos os campos obrigat\u00f3rios.');
      return;
    }
    const submissions = JSON.parse(localStorage.getItem('nextstep_submissions') || '[]');
    submissions.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('nextstep_submissions', JSON.stringify(submissions));
    toast.success(t.form.success);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="contact" className="relative">
      {/* Curved section divider */}
      <div className="bg-[#F8F7F4]">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 lg:h-20">
          <path d="M0 80 C480 0, 960 0, 1440 80 L1440 80 L0 80 Z" fill="#141414" />
        </svg>
      </div>

      {/* Dark contact section */}
      <div className="bg-[#141414] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div
            ref={headerRef}
            className={cn(
              'mb-14 anim-fade-up',
              headerVisible ? 'visible' : ''
            )}
          >
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white italic">
              {t.title}
            </h2>
          </div>

          <div
            ref={contentRef}
            className={cn(
              'grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-1000 ease-out delay-200',
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {/* Left — Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-2">{t.form.name} *</label>
                    <Input value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder={t.form.name}
                      className="h-12 bg-white/[0.06] border-white/10 text-white focus:border-[#1A8A84] focus:ring-[#1A8A84]/20 rounded-xl text-sm placeholder:text-white/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-2">{t.form.email} *</label>
                    <Input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder={t.form.email}
                      className="h-12 bg-white/[0.06] border-white/10 text-white focus:border-[#1A8A84] focus:ring-[#1A8A84]/20 rounded-xl text-sm placeholder:text-white/20" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-2">{t.form.phone}</label>
                    <Input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder={t.form.phone}
                      className="h-12 bg-white/[0.06] border-white/10 text-white focus:border-[#1A8A84] focus:ring-[#1A8A84]/20 rounded-xl text-sm placeholder:text-white/20" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/50 mb-2">{t.form.service}</label>
                    <Select value={formData.service} onValueChange={(val) => handleChange('service', val)}>
                      <SelectTrigger className="h-12 bg-white/[0.06] border-white/10 text-white focus:border-[#1A8A84] focus:ring-[#1A8A84]/20 rounded-xl text-sm [&>span]:text-white/20">
                        <SelectValue placeholder={t.form.service} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1E1E1E] border-white/10 text-white">
                        {t.form.serviceOptions.map((opt) => (
                          <SelectItem key={opt} value={opt} className="text-sm text-white/70 focus:bg-white/10 focus:text-white">{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">{language === 'en' ? 'Message' : 'Mensagem'} *</label>
                  <Textarea value={formData.message} onChange={(e) => handleChange('message', e.target.value)} placeholder={t.form.message} rows={5}
                    className="bg-white/[0.06] border-white/10 text-white focus:border-[#1A8A84] focus:ring-[#1A8A84]/20 rounded-xl text-sm placeholder:text-white/20 resize-none" />
                </div>
                <Button type="submit" className="w-full bg-white hover:bg-white/90 text-[#1A1A1A] h-13 text-sm font-semibold rounded-full transition-all duration-300">
                  <Send className="w-4 h-4 mr-2" />
                  {t.form.submit}
                </Button>

                {/* Messaging buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a href="https://wa.me/351210000000" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-[#25D366]/40 hover:bg-white/[0.04] transition-all duration-300 group">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div className="text-sm font-medium text-white/70">{t.messaging.whatsapp}</div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#25D366] ml-auto transition-colors" />
                  </a>
                  <a href="https://m.me/nextstepportugal" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-[#0084FF]/40 hover:bg-white/[0.04] transition-all duration-300 group">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0084FF] flex-shrink-0">
                      <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259L10.733 8.4l3.13 3.259 5.889-3.259-6.559 6.563z" />
                    </svg>
                    <div className="text-sm font-medium text-white/70">{t.messaging.messenger}</div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#0084FF] ml-auto transition-colors" />
                  </a>
                </div>
              </form>
            </div>

            {/* Right — Image */}
            <div className="hidden lg:block">
              <div className="rounded-3xl overflow-hidden h-full">
                <img
                  src={contactImage}
                  alt="Portugal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
