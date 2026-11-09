import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ArrowDown, ArrowUpRight, Compass, Menu, X } from "lucide-react";
import "@/App.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1762005662451-b6bbf4d23fd5?auto=format&fit=crop&w=1800&q=85";
const TEMPLE_IMAGE = "https://images.unsplash.com/photo-1741836646461-a95d77335f67?auto=format&fit=crop&w=1200&q=85";
const WARRIOR_IMAGE = "https://images.unsplash.com/photo-1621422747516-240c0f5f987a?auto=format&fit=crop&w=1200&q=85";

const timeline = [
  { id: "vedic", year: "1500—600 BCE", title: "Vedic Period", hindi: "वैदिक युग", text: "Ritual, clan and the first grammar of organized battle.", detail: "From tribal formations to the early language of the ratha, Vedic warfare fused ritual authority with mobility. The bow, chariot and oath shaped a warrior culture that would echo across Indian epics.", image: WARRIOR_IMAGE },
  { id: "mahabharata", year: "c. 1000—300 BCE", title: "Mahabharata Age", hindi: "महाभारत काल", text: "The epic battlefield becomes a laboratory of strategy.", detail: "Kurukshetra preserves an intricate imagination of command: vyuha formations, heralds, duels and rules of engagement. Its stories still teach the cost of decisions made under pressure.", image: HERO_IMAGE },
  { id: "mahajanapadas", year: "600—321 BCE", title: "Mahajanapadas", hindi: "महाजनपद", text: "Sixteen kingdoms compete for roads, rivers and power.", detail: "Fortified cities, standing armies and expanding trade routes transformed warfare from a clan affair into an affair of state. Magadha's rise set the stage for empire.", image: TEMPLE_IMAGE },
  { id: "maurya", year: "321—185 BCE", title: "Mauryan Empire", hindi: "मौर्य साम्राज्य", text: "A continental machine of administration and intelligence.", detail: "Chandragupta's state organized infantry, cavalry, elephants and chariots into a disciplined force. Kautilya's Arthashastra records the systems behind the spectacle: spies, supply lines and diplomacy.", image: HERO_IMAGE },
  { id: "gupta", year: "320—550 CE", title: "Gupta Period", hindi: "गुप्त काल", text: "Cavalry and statecraft carry a golden age outward.", detail: "Gupta campaigns relied on flexible cavalry, alliances and a sophisticated imperial imagination. Samudragupta's southern expedition is remembered on stone as much as in strategy.", image: WARRIOR_IMAGE },
  { id: "chola", year: "850—1279 CE", title: "Chola Thalassocracy", hindi: "चोल समुद्री शक्ति", text: "Power crosses the Bay of Bengal under a tiger banner.", detail: "The Cholas extended military reach by sea, connecting ports, trade and conquest. Naval power became an instrument of diplomacy, commerce and cultural exchange.", image: TEMPLE_IMAGE },
];

const modules = [
  { number: "01", title: "Ancient Indian Armies", hindi: "प्राचीन भारतीय सेनाएँ", kicker: "THE FOUR ARMS", text: "Infantry, cavalry, chariots and elephants formed a living system—each arm answering a different terrain and tempo.", tags: ["Infantry", "Cavalry", "Chariots", "War elephants"], image: WARRIOR_IMAGE },
  { number: "02", title: "Weapons & Armour", hindi: "शस्त्र और कवच", kicker: "THE ARSENAL", text: "From the curved bow to the iron mace, weapon design encoded a philosophy of distance, force and protection.", tags: ["Bow & arrow", "Sword", "Spear", "Mace", "Shield"], image: HERO_IMAGE },
  { number: "03", title: "Vyuha Formations", hindi: "व्यूह रचनाएँ", kicker: "THE GEOMETRY OF BATTLE", text: "Battle lines became symbols: Chakravyuha, Garuda, Makara and Krauncha—formations built to move, lure and contain.", tags: ["Chakravyuha", "Garuda", "Makara", "Krauncha"], image: TEMPLE_IMAGE },
  { number: "04", title: "Arthashastra", hindi: "अर्थशास्त्र", kicker: "THE SCIENCE OF POWER", text: "Kautilya's manual moves beyond the battlefield into administration, intelligence and the four instruments of statecraft.", tags: ["Sama", "Dana", "Bheda", "Danda", "Saptanga"], image: WARRIOR_IMAGE },
  { number: "05", title: "Fortresses & Frontiers", hindi: "दुर्ग और सीमा", kicker: "DEFENCE AS DESIGN", text: "Hill forts, water forts and forest forts turned landscape itself into a defensive ally against siege and surprise.", tags: ["Fort types", "Siege craft", "Architecture", "Terrain"], image: TEMPLE_IMAGE },
  { number: "06", title: "Naval Warfare", hindi: "नौसैनिक युद्ध", kicker: "THE OCEAN THEATRE", text: "Chola fleets made the sea a road: expeditions, ships and trade routes carried ambition across the horizon.", tags: ["Chola navy", "Expeditions", "Ships", "Trade routes"], image: HERO_IMAGE },
];

function App() {
  const [activeEra, setActiveEra] = useState(timeline[3]);
  const [activeModule, setActiveModule] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); window.removeEventListener("mousemove", move); };
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const selectedModules = useMemo(() => modules.slice(0, 6), []);

  return (
    <div className="site-shell">
      <div className="cursor-aura" style={{ left: cursor.x, top: cursor.y }} />
      <nav className="topbar" data-testid="main-navigation">
        <button className="brand" onClick={() => scrollTo("top")} data-testid="brand-home-button"><span className="brand-mark">✦</span><span>SHATRU<span>KALAN</span></span></button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => scrollTo("timeline")} data-testid="nav-timeline-button">Timeline</button>
          <button onClick={() => scrollTo("modules")} data-testid="nav-library-button">The Archive</button>
          <button onClick={() => scrollTo("principles")} data-testid="nav-principles-button">Principles</button>
        </div>
        <button className="nav-menu" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-button">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <button className="chapter-button" onClick={() => scrollTo("timeline")} data-testid="explore-chapters-button">Explore chapters <ArrowUpRight size={15} /></button>
      </nav>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid" />
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>AN ATLAS OF STRATEGY · 1500 BCE—1279 CE</motion.p>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 55 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9 } } }}>War was<br /><em>never</em> singular.</motion.h1>
            <motion.p className="hero-intro" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>A visual archive of ancient Indian warfare—where <strong>शक्ति</strong> met strategy, and every battlefield told a story.</motion.p>
            <motion.button className="hero-cta" onClick={() => scrollTo("timeline")} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} data-testid="hero-explore-button"><span>Enter the archive</span><ArrowDown size={18} /></motion.button>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: "easeOut" }}><img src={HERO_IMAGE} alt="Ancient Indian chariot sculpture" data-testid="hero-image" /><div className="hero-visual-caption"><span>PLATE 001</span><span>RATHA · THE MOVING TEMPLE</span></div></motion.div>
          <div className="hero-index">01 <span>/</span> 15</div><div className="hero-side-note">शस्त्र · शक्ति · रणनीति</div>
        </section>

        <div className="marquee" aria-label="Archive themes"><div>THE ART OF WAR <span>✦</span> THE SCIENCE OF POWER <span>✦</span> THE MEMORY OF EMPIRE <span>✦</span> THE ART OF WAR <span>✦</span></div></div>

        <section className="timeline-section section-wrap" id="timeline"><div className="section-heading"><p className="eyebrow">01 / CHRONICLE</p><h2>Six ages.<br /><em>One</em> continuum.</h2><p>Follow the arc of Indian military thought—from the first chariot hymns to fleets that crossed oceans.</p></div><div className="timeline-layout"><div className="timeline-rail" data-testid="historical-timeline">{timeline.map((era, index) => <button key={era.id} className={`era-node ${activeEra.id === era.id ? "active" : ""}`} onClick={() => setActiveEra(era)} data-testid={`timeline-era-${era.id}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{era.year}</strong><b>{era.title}</b></button>)}</div><AnimatePresence mode="wait"><motion.article className="era-feature" key={activeEra.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }} data-testid="active-era-feature"><div className="era-image"><img src={activeEra.image} alt={activeEra.title} /><span>{activeEra.hindi}</span></div><div className="era-copy"><p className="eyebrow">{activeEra.year}</p><h3>{activeEra.title}</h3><p className="large-copy">{activeEra.text}</p><p>{activeEra.detail}</p><button className="text-link" onClick={() => setActiveModule({ ...activeEra, kicker: "CHRONICLE ENTRY", tags: ["Context", "Command", "Culture"] })} data-testid="era-read-more-button">Read the field note <ArrowUpRight size={15} /></button></div></motion.article></AnimatePresence></div></section>

        <section className="archive-section section-wrap" id="modules"><div className="section-heading archive-heading"><p className="eyebrow">02 / THE ARCHIVE</p><h2>Tools of a<br /><em>civilisation.</em></h2><p>Short field notes on the systems, weapons and ideas that made an empire move.</p></div><div className="module-grid">{selectedModules.map((module, index) => <motion.button whileHover={{ y: -8 }} transition={{ duration: .25 }} className={`module-card card-${index + 1}`} key={module.number} onClick={() => setActiveModule(module)} data-testid={`archive-card-${module.number}`}><div className="card-image"><img src={module.image} alt={module.title} /><span>{module.hindi}</span></div><div className="card-body"><div className="card-top"><span>{module.number}</span><span>{module.kicker}</span></div><h3>{module.title}</h3><p>{module.text}</p><div className="tag-row">{module.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><span className="card-open">Open field note <ArrowUpRight size={15} /></span></div></motion.button>)}</div></section>

        <section className="principles-section section-wrap" id="principles"><div className="principle-orbit"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><Compass size={38} /><span>धर्म</span><span>नीति</span><span>विजय</span></div><div className="principle-copy"><p className="eyebrow">03 / CONTEMPORARY RELEVANCE</p><h2>Strategy is<br /><em>a discipline.</em></h2><p className="large-copy">The battlefield changes. The questions endure.</p><p>Leadership, decision-making, teamwork and terrain awareness—ancient military thought remains a living lens for modern management.</p><button className="hero-cta small" onClick={() => setActiveModule({ title: "The strategic lens", hindi: "रणनीतिक दृष्टि", kicker: "FIELD NOTE 15", text: "Read the past as a toolkit, not a museum.", detail: "The most enduring lesson is not conquest; it is clarity. Know the terrain, read the signals, align the team, and act with consequence.", tags: ["Leadership", "Decision-making", "Teamwork"] })} data-testid="principles-read-button">Read the final principle <ArrowUpRight size={16} /></button></div></section>
      </main>

      <footer><span>SHATRUKALAN / शत्रुकलन</span><span>AN OPEN ARCHIVE OF ANCIENT INDIAN WARFARE</span><span>© 2025</span></footer>

      <AnimatePresence>{activeModule && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModule(null)} data-testid="detail-modal-backdrop"><motion.div className="detail-modal" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(e) => e.stopPropagation()} data-testid="detail-modal"><button className="modal-close" onClick={() => setActiveModule(null)} data-testid="detail-modal-close"><X size={18} /></button><p className="eyebrow">{activeModule.kicker}</p><h2>{activeModule.title}</h2><p className="modal-hindi">{activeModule.hindi}</p><div className="modal-rule" /><p className="large-copy">{activeModule.text}</p><p>{activeModule.detail}</p><div className="modal-tags">{(activeModule.tags || []).map(tag => <span key={tag}>{tag}</span>)}</div></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}

export default App;
