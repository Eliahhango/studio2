import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Globe, Shield, HardHat, 
  ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, 
  ArrowUpRight, CheckCircle2, Zap, BarChart3, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 'home' | 'about' | 'digital' | 'security' | 'engineering' | 'insights' | 'contact';

// --- Components ---

const Navbar = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, screen: Screen }[] = [
    { label: 'ABOUT', screen: 'about' },
    { label: 'DIGITAL', screen: 'digital' },
    { label: 'SECURITY', screen: 'security' },
    { label: 'ENGINEERING', screen: 'engineering' },
    { label: 'INSIGHTS', screen: 'insights' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-grid py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setScreen('home')}
        >
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="font-mono font-bold text-white">E</span>
          </div>
          <span className="font-mono font-semibold tracking-tighter text-xl">ELITECHWIZ</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.screen}
              onClick={() => setScreen(link.screen)}
              className={`font-mono text-xs tracking-widest transition-colors hover:text-primary ${activeScreen === link.screen ? 'text-primary' : 'text-muted'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setScreen('contact')}
            className="btn-primary py-2 px-5 text-xs"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-grid p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.screen}
                onClick={() => { setScreen(link.screen); setIsMenuOpen(false); }}
                className={`font-mono text-sm tracking-widest text-left ${activeScreen === link.screen ? 'text-primary' : 'text-muted'}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => { setScreen('contact'); setIsMenuOpen(false); }}
              className="btn-primary w-full"
            >
              CONTACT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <footer className="bg-surface border-t border-grid pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="font-mono font-bold text-white">E</span>
            </div>
            <span className="font-mono font-semibold tracking-tighter text-xl">ELITECHWIZ</span>
          </div>
          <p className="text-muted text-sm leading-relaxed max-w-xs">
            A premium multi-division company managing specialized digital, security, and engineering services.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-muted hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-white mb-6 uppercase">Divisions</h4>
          <ul className="space-y-4">
            <li><button onClick={() => setScreen('digital')} className="text-muted text-sm hover:text-primary transition-colors">Digital Solutions</button></li>
            <li><button onClick={() => setScreen('security')} className="text-muted text-sm hover:text-primary transition-colors">Security Advisory</button></li>
            <li><button onClick={() => setScreen('engineering')} className="text-muted text-sm hover:text-primary transition-colors">Civil Engineering</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-white mb-6 uppercase">Company</h4>
          <ul className="space-y-4">
            <li><button onClick={() => setScreen('about')} className="text-muted text-sm hover:text-primary transition-colors">About Us</button></li>
            <li><button onClick={() => setScreen('insights')} className="text-muted text-sm hover:text-primary transition-colors">Insights & Work</button></li>
            <li><button onClick={() => setScreen('contact')} className="text-muted text-sm hover:text-primary transition-colors">Contact</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-white mb-6 uppercase">Newsletter</h4>
          <p className="text-muted text-sm mb-4">Stay updated with our latest corporate insights.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-background border border-grid px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
            />
            <button className="bg-primary px-4 py-2"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted text-[10px] tracking-widest uppercase">© 2026 ELITECHWIZ GROUP. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="text-muted text-[10px] tracking-widest uppercase hover:text-white">Privacy Policy</a>
          <a href="#" className="text-muted text-[10px] tracking-widest uppercase hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// --- Screen Components ---

const HomeScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  return (
    <div className="pt-20 relative overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 flex justify-between">
          <div className="w-px h-full bg-white/5" />
          <div className="w-px h-full bg-white/5 hidden md:block" />
          <div className="w-px h-full bg-white/5 hidden md:block" />
          <div className="w-px h-full bg-white/5" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-end pb-20 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="font-mono text-xs tracking-[0.2em] text-primary mb-6 block uppercase">Unified Expertise. Specialized Execution.</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
            One trusted brand delivering specialist Digital, Security, and Engineering services.
          </h1>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <button 
              onClick={() => setScreen('contact')}
              className="btn-primary"
            >
              CONSULT WITH US
            </button>
            <p className="text-muted text-lg max-w-md leading-relaxed">
              We bridge the gap between complex technical challenges and streamlined business outcomes through our multi-division approach.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Division Selector Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-grid relative z-10">
        {[
          {
            id: 'digital',
            title: 'DIGITAL',
            desc: 'Websites, branding, UI/UX, and full-stack development services.',
            accent: 'bg-accent-digital',
            icon: <Globe size={32} className="text-accent-digital" />,
            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 'security',
            title: 'SECURITY',
            desc: 'Cybersecurity, risk assessments, and strategic advisory.',
            accent: 'bg-accent-security',
            icon: <Shield size={32} className="text-accent-security" />,
            img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 'engineering',
            title: 'ENGINEERING',
            desc: 'Civil engineering, project support, and site supervision.',
            accent: 'bg-accent-engineering',
            icon: <HardHat size={32} className="text-accent-engineering" />,
            img: 'https://images.unsplash.com/photo-1503387762-592dee58c160?auto=format&fit=crop&q=80&w=1000'
          }
        ].map((div, idx) => (
          <motion.div
            key={div.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            onClick={() => setScreen(div.id as Screen)}
            className="group relative h-[600px] cursor-pointer overflow-hidden border-r border-grid last:border-r-0"
          >

            <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100">
              <img 
                src={div.img} 
                alt={div.title} 
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-12 space-y-6">
              {div.icon}
              <h3 className="text-3xl font-bold tracking-tight">{div.title}</h3>
              <p className="text-muted leading-relaxed group-hover:text-white transition-colors">{div.desc}</p>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span className="font-mono text-xs tracking-widest flex items-center gap-2 text-primary">
                  EXPLORE SERVICES <ArrowRight size={14} />
                </span>
              </div>
            </div>
            
            {/* Hover Border */}
            <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </section>

      {/* Trusted Partners */}
      <section className="py-20 border-t border-white/10 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted mb-12 block uppercase text-center">Trusted by Industry Leaders</span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
            {['GLOBAL TECH', 'SECURE NET', 'URBAN BUILD', 'PRIME DIGITAL', 'CORE SYSTEMS'].map(partner => (
              <span key={partner} className="font-mono font-bold text-xl tracking-tighter">{partner}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutScreen = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.2em] text-primary mb-6 block uppercase">Corporate Profile</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-12 tracking-tight">
              A legacy of technical excellence and strategic innovation.
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted leading-relaxed text-lg">
              <p>
                Founded on the principle of integrated expertise, EliTechWiz has evolved from a specialized consultancy into a multi-division corporate group. We provide a unified gateway for businesses seeking high-end digital, security, and engineering services.
              </p>
              <p>
                Our methodology is rooted in precision. By housing specialized divisions under one corporate banner, we ensure that every project benefits from cross-disciplinary insights and a shared commitment to quality.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-center border-l border-white/10 pl-12">
            <div className="space-y-12">
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">500+</h4>
                <p className="font-mono text-xs tracking-widest text-muted uppercase">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">15+</h4>
                <p className="font-mono text-xs tracking-widest text-muted uppercase">Years of Operation</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">3</h4>
                <p className="font-mono text-xs tracking-widest text-muted uppercase">Specialized Divisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface/30 py-32 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold mb-20 text-center">Our Evolution</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            <div className="space-y-24">
              {[
                { year: '2010', title: 'Foundation', desc: 'EliTechWiz established as a boutique engineering consultancy.' },
                { year: '2015', title: 'Digital Expansion', desc: 'Launch of the Digital division to meet growing demand for web solutions.' },
                { year: '2019', title: 'Security Advisory', desc: 'Strategic acquisition of a cybersecurity firm to form the Security division.' },
                { year: '2024', title: 'Unified Corporate Group', desc: 'Restructuring into the current multi-division corporate architecture.' }
              ].map((item, idx) => (
                <div key={item.year} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center md:text-left">
                    <div className={`space-y-4 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="text-primary font-mono text-xl font-bold">{item.year}</span>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="text-muted max-w-sm mx-auto md:mx-0">{item.desc}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full z-10 relative hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-20">Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {[
            { name: 'Elias Thorne', role: 'Group CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
            { name: 'Sarah Chen', role: 'Head of Digital', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
            { name: 'Marcus Vane', role: 'Security Director', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
            { name: 'Elena Rossi', role: 'Chief Engineer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' }
          ].map((member) => (
            <div key={member.name} className="group relative aspect-[3/4] overflow-hidden bg-surface border border-white/10">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const DigitalScreen = () => {
  return (
    <div className="pt-20">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sticky Sidebar */}
        <aside className="lg:w-1/3 lg:h-screen lg:sticky lg:top-0 p-12 lg:p-24 flex flex-col justify-center border-r border-white/10">
          <div className="border-l-4 border-accent-digital pl-8 space-y-6">
            <span className="font-mono text-xs tracking-[0.2em] text-accent-digital uppercase">Division: Digital</span>
            <h1 className="text-5xl font-bold tracking-tight">Crafting premium digital experiences.</h1>
            <p className="text-muted leading-relaxed">
              From high-performance web applications to cohesive brand identity systems, our digital division delivers technical excellence with an editorial eye.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6">
            {['UI/UX Design', 'Full-Stack Development', 'Brand Identity', 'Digital Strategy'].map(service => (
              <div key={service} className="flex items-center gap-4 text-sm font-mono tracking-widest text-muted">
                <div className="w-2 h-2 bg-accent-digital" />
                {service.toUpperCase()}
              </div>
            ))}
          </div>
        </aside>

        {/* Scrolling Content */}
        <main className="lg:w-2/3">
          <section className="p-6 lg:p-24 space-y-24">
            {[
              { title: 'Vanguard FinTech', category: 'Web Application', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200' },
              { title: 'Lumina Branding', category: 'Identity System', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200' },
              { title: 'Aether Platform', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200' }
            ].map((work, idx) => (
              <motion.div 
                key={work.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden mb-8">
                  <img 
                    src={work.img} 
                    alt={work.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-accent-digital uppercase mb-2 block">{work.category}</span>
                    <h3 className="text-3xl font-bold">{work.title}</h3>
                  </div>
                  <ArrowUpRight className="text-muted group-hover:text-accent-digital transition-colors" size={32} />
                </div>
              </motion.div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

const SecurityScreen = () => {
  return (
    <div className="pt-32 pb-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]">
      <section className="max-w-3xl mx-auto px-6 text-center mb-32">
        <span className="font-mono text-xs tracking-[0.2em] text-accent-security mb-6 block uppercase">Division: Security</span>
        <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Resilient Defense. Strategic Advisory.</h1>
        <p className="text-muted text-xl leading-relaxed">
          In an era of evolving threats, we provide the architectural integrity and strategic foresight required to protect your most critical assets.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {[
          { label: 'Vulnerability Scans', value: '10k+', icon: <Zap /> },
          { label: 'Compliance Audits', value: '100%', icon: <CheckCircle2 /> },
          { label: 'Threat Mitigation', value: '24/7', icon: <Shield /> }
        ].map(stat => (
          <div key={stat.label} className="bg-surface border border-white/10 p-10 text-center space-y-4">
            <div className="flex justify-center text-accent-security">{stat.icon}</div>
            <h4 className="text-4xl font-bold text-white">{stat.value}</h4>
            <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="bg-surface border-l-4 border-accent-security p-12 md:p-20">
          <p className="text-2xl md:text-3xl italic font-medium leading-relaxed mb-8">
            "Security is not a product, but a process. Our mission is to embed resilience into the very fabric of our clients' operations, ensuring they can innovate with confidence."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent-security/20 rounded-full flex items-center justify-center text-accent-security">
              <Users size={20} />
            </div>
            <div>
              <p className="font-bold">Marcus Vane</p>
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">Security Director</p>
            </div>
          </div>
        </div>
      </section>

        <section className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-12 text-center">Our Security Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { title: 'Risk Assessment', desc: 'Comprehensive identification of digital and physical vulnerabilities.' },
                { title: 'Defense-in-Depth', desc: 'Multi-layered security protocols across all infrastructure levels.' },
                { title: 'Incident Response', desc: 'Rapid containment and recovery strategies for security events.' }
              ].map((step, idx) => (
                <div key={step.title} className="flex gap-6">
                  <span className="font-mono text-accent-security font-bold">0{idx + 1}</span>
                  <div>
                    <h4 className="font-bold mb-2">{step.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface border border-white/10 aspect-square flex items-center justify-center p-12 relative overflow-hidden">
               {/* Abstract Diagram Placeholder */}
               <div className="w-full h-full border border-accent-security/20 rounded-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-accent-security/40 rounded-full flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border border-accent-security/60 rounded-full flex items-center justify-center">
                      <Shield size={48} className="text-accent-security" />
                    </div>
                  </div>
               </div>
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-security/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
    </div>
  );
};

const EngineeringScreen = () => {
  return (
    <div className="pt-32 pb-20 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:60px_60px] bg-opacity-5">
      <section className="max-w-3xl mx-auto px-6 text-center mb-32">
        <span className="font-mono text-xs tracking-[0.2em] text-accent-engineering mb-6 block uppercase">Division: Engineering</span>
        <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Precision Engineering. Sustainable Impact.</h1>
        <p className="text-muted text-xl leading-relaxed">
          We provide specialized civil engineering consulting and site supervision, ensuring that complex projects are delivered with structural integrity and operational efficiency.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="aspect-[21/9] bg-surface border border-white/10 overflow-hidden relative group">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" 
            alt="Engineering Site" 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-4xl font-bold">Project Blueprints</h3>
              <p className="font-mono text-xs tracking-widest text-accent-engineering uppercase">Site Planning & Supervision</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        {[
          { label: 'Projects Supervised', value: '250+', icon: <HardHat /> },
          { label: 'Consulting Hours', value: '50k+', icon: <BarChart3 /> },
          { label: 'Safety Rating', value: 'A+', icon: <CheckCircle2 /> }
        ].map(stat => (
          <div key={stat.label} className="space-y-4">
            <div className="text-accent-engineering">{stat.icon}</div>
            <h4 className="text-4xl font-bold text-white">{stat.value}</h4>
            <p className="font-mono text-[10px] tracking-widest text-muted uppercase">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6">
        <div className="border-t border-white/10 pt-20">
          <p className="text-2xl md:text-3xl italic font-medium leading-relaxed mb-8 text-center">
            "Our engineering philosophy is built on the intersection of traditional structural principles and modern sustainable practices. We don't just build; we engineer for the future."
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-accent-engineering/20 rounded-full flex items-center justify-center text-accent-engineering">
              <HardHat size={20} />
            </div>
            <div className="text-center">
              <p className="font-bold">Elena Rossi</p>
              <p className="font-mono text-[10px] tracking-widest text-muted uppercase">Chief Engineer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const InsightsScreen = () => {
  const [filter, setFilter] = useState<'all' | 'digital' | 'security' | 'engineering'>('all');

  const items = [
    { id: 1, title: 'The Future of Zero-Trust Architecture', div: 'security', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Scaling React Applications for Enterprise', div: 'digital', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Sustainable Materials in Modern Civil Engineering', div: 'engineering', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Cyber Resilience in Critical Infrastructure', div: 'security', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Design Systems: From Component to Culture', div: 'digital', img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Advanced Site Supervision Techniques', div: 'engineering', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800' },
  ];

  const filteredItems = filter === 'all' ? items : items.filter(i => i.div === filter);

  const getAccentColor = (div: string) => {
    if (div === 'digital') return 'text-accent-digital';
    if (div === 'security') return 'text-accent-security';
    if (div === 'engineering') return 'text-accent-engineering';
    return 'text-primary';
  };

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <h1 className="text-5xl font-bold mb-12 tracking-tight">Insights & Featured Work</h1>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-8 sticky top-24 bg-background z-20">
          {['all', 'digital', 'security', 'engineering'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`font-mono text-xs tracking-widest px-6 py-2 transition-all ${filter === f ? 'bg-primary text-white' : 'text-muted hover:text-white'}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer bg-surface border border-white/10 overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <span className={`font-mono text-[10px] tracking-widest uppercase ${getAccentColor(item.div)}`}>
                    {item.div}
                  </span>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <div className="pt-4 flex items-center gap-2 text-muted font-mono text-[10px] tracking-widest">
                    READ CASE STUDY <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Impact Metrics Banner */}
      <section className="mt-32 bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-xl text-center md:text-left">
            Delivering measurable impact across every division we operate.
          </h2>
          <div className="grid grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <h4 className="text-5xl font-bold text-white mb-2">98%</h4>
              <p className="font-mono text-[10px] tracking-widest text-white/70 uppercase">Client Retention</p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-5xl font-bold text-white mb-2">12+</h4>
              <p className="font-mono text-[10px] tracking-widest text-white/70 uppercase">Global Markets</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactScreen = () => {
  const [inquiryType, setInquiryType] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left: Info */}
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-primary mb-6 block uppercase">Contact & Routing</span>
              <h1 className="text-5xl font-bold mb-8 tracking-tight">Let's discuss your next project.</h1>
              <p className="text-muted text-lg leading-relaxed max-w-md">
                Our intelligent inquiry router ensures your message reaches the correct specialist team for an efficient response.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-surface border border-white/10 flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Corporate Headquarters</h4>
                  <p className="text-muted text-sm">1200 Innovation Way, Suite 500<br />Tech District, CA 94105</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-surface border border-white/10 flex items-center justify-center text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">General Inquiries</h4>
                  <p className="text-muted text-sm">contact@elitechwiz.com</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-surface border border-white/10 flex items-center justify-center text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Global Support</h4>
                  <p className="text-muted text-sm">+1 (800) 555-ELITE</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h4 className="font-mono text-[10px] tracking-widest text-muted uppercase mb-6">Regional Offices</h4>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold text-sm">London, UK</p>
                  <p className="text-muted text-xs">EMEA Operations</p>
                </div>
                <div>
                  <p className="font-bold text-sm">Singapore</p>
                  <p className="text-muted text-xs">APAC Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-surface p-8 md:p-12 border border-white/10">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold">Inquiry Received</h3>
                <p className="text-muted max-w-xs">
                  Your request has been routed to the appropriate division. Reference ID: <span className="text-white font-mono">ETW-99284</span>
                </p>
                <button onClick={() => setSubmitted(false)} className="text-primary font-mono text-xs tracking-widest hover:underline">SEND ANOTHER MESSAGE</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="font-mono text-[10px] tracking-widest text-muted uppercase">Inquiry Type</label>
                  <select 
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-background border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  >
                    <option value="general">General Corporate Inquiry</option>
                    <option value="digital">Digital & Branding Services</option>
                    <option value="security">Security & Risk Advisory</option>
                    <option value="engineering">Engineering & Supervision</option>
                    <option value="partnership">Strategic Partnership</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-muted uppercase">Full Name</label>
                    <input required type="text" className="w-full bg-background border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-muted uppercase">Email Address</label>
                    <input required type="email" className="w-full bg-background border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>

                {(inquiryType !== 'general') && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-muted uppercase">Company Name</label>
                      <input required type="text" className="w-full bg-background border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] tracking-widest text-muted uppercase">Industry</label>
                      <input required type="text" className="w-full bg-background border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="font-mono text-[10px] tracking-widest text-muted uppercase">Message</label>
                  <textarea required rows={5} className="w-full bg-background border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
                </div>

                <button type="submit" className="btn-primary w-full py-4">
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScreen]);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen setScreen={setActiveScreen} />;
      case 'about': return <AboutScreen />;
      case 'digital': return <DigitalScreen />;
      case 'security': return <SecurityScreen />;
      case 'engineering': return <EngineeringScreen />;
      case 'insights': return <InsightsScreen />;
      case 'contact': return <ContactScreen />;
      default: return <HomeScreen setScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeScreen={activeScreen} setScreen={setActiveScreen} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setScreen={setActiveScreen} />
    </div>
  );
}
