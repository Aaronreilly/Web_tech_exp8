import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

const products = [
  { id: 1, name: "NovaBook Air 14", category: "Laptops", price: 74999, oldPrice: 82999, tag: "BESTSELLER", icon: "💻", color: "lavender", description: "A lightweight laptop built for everyday work and creativity.", specs: ["14-inch display", "16 GB memory", "512 GB SSD"] },
  { id: 2, name: "Pulse Pro X", category: "Audio", price: 12999, oldPrice: 15999, tag: "POPULAR", icon: "🎧", color: "mint", description: "Immersive wireless audio with comfortable all-day listening.", specs: ["Active noise control", "30-hour battery", "Bluetooth 5.3"] },
  { id: 3, name: "Orbit S2", category: "Wearables", price: 8999, oldPrice: 10999, tag: "NEW", icon: "⌚", color: "peach", description: "A smart everyday companion for activity and notifications.", specs: ["AMOLED display", "Health tracking", "Water resistant"] },
  { id: 4, name: "PixelOne 12", category: "Phones", price: 42999, oldPrice: 46999, tag: "LIMITED DEAL", icon: "📱", color: "blue", description: "A fast, vivid smartphone designed to keep up with you.", specs: ["OLED display", "128 GB storage", "Fast charging"] },
  { id: 5, name: "Studio Keys Mini", category: "Accessories", price: 5499, oldPrice: 6499, tag: "CREATOR PICK", icon: "⌨️", color: "pink", description: "A compact wireless keyboard for tidy desks and focused work.", specs: ["Compact layout", "Wireless connection", "Rechargeable"] },
  { id: 6, name: "EchoPod Mini", category: "Audio", price: 3999, oldPrice: 4999, tag: "GREAT VALUE", icon: "🔊", color: "yellow", description: "Small speaker, clear sound, and easy music wherever you go.", specs: ["Rich stereo sound", "12-hour battery", "USB-C charging"] }
];

const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(value);

function Header({ count }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand"><span className="brand-mark">T</span> TechNest<span className="brand-dot">.</span></Link>
      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <a className="saved-pill" href="/products" aria-label={`${count} saved products`}>♡ <span>{count}</span></a>
    </header>
  );
}

function Footer() {
  return <footer className="footer"><div><Link to="/" className="brand footer-brand"><span className="brand-mark">T</span> TechNest<span className="brand-dot">.</span></Link><p>Thoughtful tech. Better everyday.</p></div><span>Student project · React + Vite</span></footer>;
}

function ProductCard({ product, saved, onToggle }) {
  return (
    <article className="product-card">
      <div className={`product-art ${product.color}`}>
        <span className="product-tag">{product.tag}</span>
        <button className={`heart ${saved ? "is-saved" : ""}`} onClick={() => onToggle(product.id)} aria-label={saved ? "Remove from saved" : "Save product"}>{saved ? "♥" : "♡"}</button>
        <span className="product-emoji" role="img" aria-label={product.category}>{product.icon}</span>
        <span className="art-orbit" />
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="spec-list">{product.specs.slice(0, 2).map(spec => <span key={spec}>{spec}</span>)}</div>
        <div className="product-bottom"><div><strong>{money(product.price)}</strong><del>{money(product.oldPrice)}</del></div><button className="details-btn" onClick={() => onToggle(product.id, true)}>Details ↗</button></div>
      </div>
    </article>
  );
}

function ProductGrid({ items, saved, onToggle }) {
  if (!items.length) return <div className="empty-state">No products found. Try another search or category.</div>;
  return <div className="product-grid">{items.map(product => <ProductCard key={product.id} product={product} saved={saved.includes(product.id)} onToggle={onToggle} />)}</div>;
}

function Home({ saved, onToggle }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const categories = ["All", "Laptops", "Phones", "Audio", "Wearables", "Accessories"];
  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);

  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVOURITE TECH</span>
        <h1>Good tech.<br /><span>Great possibilities.</span></h1>
        <p>Discover thoughtfully selected devices that make work, play, and everyday life feel a little smarter.</p>
        <div className="hero-actions"><a className="primary-btn" href="#products">Explore collection <span>↘</span></a><Link className="text-link" to="/about">Our approach ↗</Link></div>
        <div className="hero-proof"><div className="avatar-stack"><i>✦</i><i>⚡</i><i>◈</i></div><span><strong>Curated for you</strong><br />Useful features, clear choices.</span></div>
      </div>
      <div className="hero-visual">
        <div className="visual-glow" />
        <div className="hero-device laptop"><div className="laptop-screen"><div className="screen-shape">N<span>.</span></div><small>CREATE WITHOUT LIMITS</small></div><div className="laptop-base" /></div>
        <div className="floating-note note-top"><span>✦</span><div><b>Design meets function</b><small>Picked with purpose</small></div></div>
        <div className="floating-note note-bottom"><span className="note-icon">↗</span><div><small>STARTING FROM</small><b>₹3,999</b></div></div>
        <span className="visual-caption">THE EVERYDAY EDIT / 2026</span>
      </div>
    </section>
    <section className="trust-strip"><div><strong>✳  Curated collection</strong><span>Quality over clutter</span></div><div><strong>⌁  Clear product details</strong><span>Know what you are choosing</span></div><div><strong>↗  Made for real life</strong><span>Work, create, and unwind</span></div></section>
    <section className="catalog section-wrap" id="products">
      <div className="section-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Find your next <span>favourite.</span></h2></div><Link to="/products" className="text-link">View all products ↗</Link></div>
      <div className="catalog-controls"><div className="filters">{categories.map(c => <button key={c} className={category === c ? "filter active" : "filter"} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" /></label></div>
      <ProductGrid items={filtered.slice(0, 6)} saved={saved} onToggle={onToggle} />
    </section>
    <section className="calculator-band"><div><span className="eyebrow light-eyebrow">A LITTLE HELPER</span><h2>Planning your tech budget?</h2><p>Use our simple calculator to estimate your total before you decide.</p></div><Link className="light-btn" to="/calculator">Open budget calculator ↗</Link></section>
  </>;
}

function ProductsPage({ saved, onToggle }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", "Laptops", "Phones", "Audio", "Wearables", "Accessories"];
  const filtered = products.filter(p => (category === "All" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()));
  return <main className="page-wrap"><span className="eyebrow">EXPLORE THE RANGE</span><h1 className="page-title">The product <span>collection.</span></h1><p className="page-intro">Browse our selection of devices and everyday essentials.</p><div className="catalog-controls page-controls"><div className="filters">{categories.map(c => <button key={c} className={category === c ? "filter active" : "filter"} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by product name..." /></label></div><ProductGrid items={filtered} saved={saved} onToggle={onToggle} /></main>;
}

function AboutPage() {
  return <main className="page-wrap info-page"><span className="eyebrow">WHY TECHNEST</span><h1 className="page-title">Less scrolling.<br /><span>Better choosing.</span></h1><p className="page-intro">TechNest is a student-built tech showcase designed to make exploring everyday devices simple, clear, and enjoyable.</p><div className="info-grid"><article><span>01</span><h3>Thoughtful selection</h3><p>A focused collection across laptops, audio, phones, wearables, and accessories.</p></article><article><span>02</span><h3>Details that matter</h3><p>Product descriptions, key specifications, and sample prices are presented in one place.</p></article><article><span>03</span><h3>Simple experience</h3><p>Responsive layouts, quick filters, saved favourites, and smooth page navigation.</p></article></div><p className="disclaimer">Demo notice: product names, prices, and specifications are sample content for this academic project. This site does not process purchases.</p></main>;
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  function submit(e) { e.preventDefault(); setSent(true); }
  return <main className="page-wrap contact-layout"><div><span className="eyebrow">GET IN TOUCH</span><h1 className="page-title">Let's talk <span>tech.</span></h1><p className="page-intro">Have a suggestion for a product or an idea to improve the showcase? Send a demo message below.</p><div className="contact-note"><span>✉</span><div><strong>We welcome your ideas</strong><p>This demo form displays a confirmation in the browser. It does not send data to a server.</p></div></div></div><form className="contact-form" onSubmit={submit}><label>Your name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Enter your name" /></label><label>Email address<input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@example.com" /></label><label>Message<textarea required rows="5" value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Tell us what's on your mind..." /></label><button className="primary-btn full-btn" type="submit">Send message ↗</button>{sent && <p className="success-message" role="status">Thanks, {form.name}! Your demo message is ready.</p>}</form></main>;
}

function CalculatorPage() {
  const [budget, setBudget] = useState("80000");
  const [selected, setSelected] = useState([1, 2]);
  const chosen = products.filter(p => selected.includes(p.id));
  const total = chosen.reduce((sum, p) => sum + p.price, 0);
  const numericBudget = Number(budget) || 0;
  return <main className="page-wrap calculator-page"><span className="eyebrow">PLAN WITH CONFIDENCE</span><h1 className="page-title">Your tech <span>budget.</span></h1><p className="page-intro">Choose products and compare their combined sample price with your budget.</p><div className="budget-layout"><section className="budget-panel"><label className="budget-label">Your budget (₹)<input type="number" min="0" value={budget} onChange={e => setBudget(e.target.value)} /></label><h3>Select products</h3>{products.map(p => <label className="budget-item" key={p.id}><input type="checkbox" checked={selected.includes(p.id)} onChange={() => setSelected(selected.includes(p.id) ? selected.filter(id => id !== p.id) : [...selected, p.id])} /><span className="budget-emoji">{p.icon}</span><span className="budget-product"><b>{p.name}</b><small>{p.category}</small></span><strong>{money(p.price)}</strong></label>)}</section><aside className="budget-summary"><span className="eyebrow light-eyebrow">YOUR ESTIMATE</span><p className="summary-caption">Combined price</p><h2>{money(total)}</h2><div className="summary-line"><span>Your budget</span><b>{money(numericBudget)}</b></div><div className="summary-line"><span>{total <= numericBudget ? "Remaining" : "Over budget"}</span><b className={total > numericBudget ? "over-budget" : ""}>{money(Math.abs(numericBudget - total))}</b></div><div className="budget-meter"><span style={{width: `${numericBudget > 0 ? Math.min(100, total / numericBudget * 100) : total > 0 ? 100 : 0}%`}} /></div><p className="budget-status">{total <= numericBudget ? "You're within your planned budget." : "Your selection is above your planned budget."}</p><button className="light-btn full-btn" onClick={() => {setSelected([]);}}>Clear selection</button><small className="sample-note">{chosen.length} product{chosen.length === 1 ? "" : "s"} selected · sample prices only</small></aside></div></main>;
}

export default function App() {
  const [saved, setSaved] = useState([]);
  const [notice, setNotice] = useState(null);
  function toggleSaved(id, showDetails = false) {
    if (showDetails) {
      const p = products.find(item => item.id === id);
      setNotice(p);
      return;
    }
    setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }
  return <><Header count={saved.length} /><Routes><Route path="/" element={<Home saved={saved} onToggle={toggleSaved} />} /><Route path="/products" element={<ProductsPage saved={saved} onToggle={toggleSaved} />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/calculator" element={<CalculatorPage />} /><Route path="*" element={<main className="page-wrap"><h1>Page not found</h1><Link className="primary-btn" to="/">Return home</Link></main>} /></Routes><Footer />
    {notice && <div className="modal-backdrop" onClick={() => setNotice(null)}><section className="product-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setNotice(null)} aria-label="Close details">×</button><div className={`modal-art product-art ${notice.color}`}><span className="product-emoji">{notice.icon}</span></div><span className="category">{notice.category}</span><h2 id="modal-title">{notice.name}</h2><p>{notice.description}</p><h3>{money(notice.price)} <del>{money(notice.oldPrice)}</del></h3><ul>{notice.specs.map(spec => <li key={spec}>{spec}</li>)}</ul><button className="primary-btn full-btn" onClick={() => {setSaved(current => current.includes(notice.id) ? current : [...current, notice.id]);setNotice(null);}}>♡ Save product</button><small className="sample-note">Sample product details — not for sale.</small></section></div>}
  </>;
}