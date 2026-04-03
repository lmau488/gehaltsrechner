"use client";
import { useState, useCallback } from "react";

/* ═══════════════════════════  Tax Constants 2025  ═══════════════════════════ */
const TAX = {
  grundfrei: 11604,
  zone2end: 17005,
  zone3end: 66760,
  zone4end: 277825,
  soliFreiSingle: 18130,
  soliFreiMarried: 36260,
  werbungskosten: 1230,
  sonderausgaben: 36,
  entlastungAE: 4260,
  kvGeneral: 0.146,
  kvZusatzDefault: 0.017,
  rv: 0.186,
  av: 0.026,
  pvBase: 0.034,
  pvKinderlos: 0.006,
  bbgKV: 66150,
  bbgRV: 96600,
  kirchenSatz8: ['Bayern', 'Baden-Württemberg'],
};

const STEUERKLASSEN = [
  { id: 1, label: 'Klasse 1', desc: 'Ledig / Geschieden' },
  { id: 2, label: 'Klasse 2', desc: 'Alleinerziehend' },
  { id: 3, label: 'Klasse 3', desc: 'Verheiratet (Höherverdienend)' },
  { id: 4, label: 'Klasse 4', desc: 'Verheiratet (Gleich)' },
  { id: 5, label: 'Klasse 5', desc: 'Verheiratet (Geringverdienend)' },
  { id: 6, label: 'Klasse 6', desc: 'Zweitjob / Nebentätigkeit' },
];

const BUNDESLAENDER = [
  'Baden-Württemberg','Bayern','Berlin','Brandenburg','Bremen','Hamburg','Hessen',
  'Mecklenburg-Vorpommern','Niedersachsen','Nordrhein-Westfalen','Rheinland-Pfalz',
  'Saarland','Sachsen','Sachsen-Anhalt','Schleswig-Holstein','Thüringen',
];

const PRESETS = [
  { name: 'Mindestlohn', sub: '~2.054 €', brutto: 2054, icon: '💶' },
  { name: 'Durchschnitt', sub: '~3.800 €', brutto: 3800, icon: '📊' },
  { name: 'Gutverdiener', sub: '~5.500 €', brutto: 5500, icon: '💼' },
  { name: 'Top-Verdiener', sub: '~8.000 €', brutto: 8000, icon: '🏆' },
];

/* ═══════════════════════════  Tax Calculation  ═══════════════════════════ */
function calcESt(zvE) {
  if (zvE <= TAX.grundfrei) return 0;
  if (zvE <= TAX.zone2end) {
    const y = (zvE - TAX.grundfrei) / 10000;
    return Math.floor((922.98 * y + 1400) * y);
  }
  if (zvE <= TAX.zone3end) {
    const z = (zvE - TAX.zone2end) / 10000;
    return Math.floor((181.19 * z + 2397) * z + 1025.38);
  }
  if (zvE <= TAX.zone4end) return Math.floor(0.42 * zvE - 10636.31);
  return Math.floor(0.45 * zvE - 18970.06);
}

function calcEStSK5(zvE) {
  if (zvE <= 0) return 0;
  return calcESt(zvE + TAX.grundfrei);
}

function calcLohnsteuer(annualBrutto, sk) {
  let zvE = annualBrutto;
  if (sk !== 6) zvE -= TAX.werbungskosten;
  if (sk !== 6) zvE -= TAX.sonderausgaben;
  if (sk === 2) zvE -= TAX.entlastungAE;
  zvE = Math.max(0, zvE);

  if (sk === 3) return 2 * calcESt(Math.floor(zvE / 2));
  if (sk === 5 || sk === 6) return calcEStSK5(zvE);
  return calcESt(zvE);
}

function calcSoli(lst, sk) {
  const grenze = (sk === 3) ? TAX.soliFreiMarried : TAX.soliFreiSingle;
  if (lst <= grenze) return 0;
  const full = Math.floor(lst * 0.055);
  const capped = Math.floor((lst - grenze) * 0.119);
  return Math.min(full, capped);
}

function compute(brutto, sk, kirchensteuer, kirchenSatz, kinder, kvZusatz) {
  const annual = brutto * 12;
  const monthBBGkv = TAX.bbgKV / 12;
  const monthBBGrv = TAX.bbgRV / 12;
  const basisKV = Math.min(brutto, monthBBGkv);
  const basisRV = Math.min(brutto, monthBBGrv);

  const kv = Math.round(basisKV * (TAX.kvGeneral + kvZusatz) / 2 * 100) / 100;
  const rv = Math.round(basisRV * TAX.rv / 2 * 100) / 100;
  const av = Math.round(basisRV * TAX.av / 2 * 100) / 100;
  let pvRate = TAX.pvBase / 2;
  if (kinder === 0) pvRate += TAX.pvKinderlos / 2;
  if (kinder >= 2) pvRate -= Math.min(kinder - 1, 4) * 0.0025;
  pvRate = Math.max(0, pvRate);
  const pv = Math.round(basisKV * pvRate * 100) / 100;
  const sozial = kv + rv + av + pv;

  const lst = Math.round(calcLohnsteuer(annual, sk) / 12 * 100) / 100;
  const soli = Math.round(calcSoli(calcLohnsteuer(annual, sk), sk) / 12 * 100) / 100;
  const kirche = kirchensteuer ? Math.round(lst * kirchenSatz * 100) / 100 : 0;
  const steuern = lst + soli + kirche;
  const netto = Math.round((brutto - sozial - steuern) * 100) / 100;

  return { netto, lst, soli, kirche, kv, rv, av, pv, sozial, steuern, brutto };
}

/* ═══════════════════════════  Colors  ═══════════════════════════ */
const C = {
  bg:'#13151f',surface:'#1c1f2e',surface2:'#242738',border:'rgba(255,255,255,0.07)',
  acc:'#f0883e',accHover:'#e07020',accLight:'rgba(240,136,62,0.15)',
  txt:'#ffffff',muted:'#94a3b8',dim:'#64748b',
  success:'#22c55e',warning:'#f59e0b',error:'#ef4444',info:'#60a5fa',
  navBg:'rgba(19,21,31,0.85)',inputBg:'#242738',inputBorder:'rgba(255,255,255,0.12)',
  dotGrid:'rgba(255,255,255,0.06)',checkBg:'rgba(255,255,255,0.03)',presetBg:'rgba(255,255,255,0.06)',
};

const eur = (v) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const pct = (part, total) => total > 0 ? Math.round(part / total * 1000) / 10 : 0;

function BreakdownBar({ label, value, total, color }) {
  const p = pct(value, total);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: C.muted }}>{label}</span>
        <span style={{ color: C.txt, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>{eur(value)}</span>
      </div>
      <div style={{ height: 6, background: C.checkBg, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(p, 100)}%`, background: color, borderRadius: 3, transition: 'width 0.5s ease' }} />
      </div>
      <div style={{ fontSize: 10, color: C.dim, marginTop: 2, textAlign: 'right' }}>{p}%</div>
    </div>
  );
}

function StatBox({ label, value, sub, color }) {
  return (
    <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: '14px 12px', textAlign: 'center' }}>
      <div style={{ fontSize: 10, color: C.dim, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 5, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function AdSlot({ height, label }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: height || 90, color: C.dim, fontSize: 11, textAlign: 'center', padding: 16, width: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${C.acc}22,transparent)` }} />
      <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6, opacity: 0.4, fontWeight: 600 }}>Anzeige</div>
      <div style={{ opacity: 0.25, fontSize: 10 }}>{label}</div>
    </div>
  );
}

const FAQ = [
  { q: 'Wie berechnet man das Nettogehalt?', a: 'Vom Bruttogehalt werden Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer sowie Sozialabgaben (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen.' },
  { q: 'Was bleibt von 3.000 € brutto netto?', a: 'Bei Steuerklasse 1 ohne Kirchensteuer bleiben ca. 2.010–2.050 € netto (je nach KV-Zusatzbeitrag).' },
  { q: 'Welche Steuerklasse ist die beste?', a: 'SK 1 für Ledige, SK 3/5 für Verheiratete mit unterschiedlichem Einkommen, SK 4/4 bei ähnlichem Verdienst. Die Wahl beeinflusst nur die monatliche Vorauszahlung, nicht die Jahressteuerlast.' },
  { q: 'Was ist der Solidaritätszuschlag?', a: '5,5% der Lohnsteuer. Seit 2021 fällt er erst ab ca. 73.000 € Jahresbrutto an. Ca. 90% zahlen keinen Soli mehr.' },
  { q: 'Wie hoch sind die Sozialabgaben 2025?', a: 'AN-Anteil: KV ~8,15%, RV 9,3%, AV 1,3%, PV ~1,7% (2,3% kinderlos). Gesamt ca. 20–21% bis zur Beitragsbemessungsgrenze.' },
  { q: 'Was ist die Beitragsbemessungsgrenze?', a: 'Die Grenze bis zu der Sozialabgaben berechnet werden. 2025: 5.512 €/Monat (KV/PV), 8.050 €/Monat (RV/AV).' },
];

/* ═══════════════════════════  Main Component  ═══════════════════════════ */
export default function Home() {
  const [brutto, setBrutto] = useState(3800);
  const [sk, setSk] = useState(1);
  const [bundesland, setBundesland] = useState('Nordrhein-Westfalen');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinder, setKinder] = useState(0);
  const [kvZusatz, setKvZusatz] = useState(1.7);
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const IS = { background: C.inputBg, border: `1px solid ${C.inputBorder}`, borderRadius: 8, color: C.txt, padding: '10px 12px', fontSize: 14, width: '100%', minWidth: 0, maxWidth: '100%', display: 'block', outline: 'none', boxSizing: 'border-box', fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'border-color 0.2s,box-shadow 0.2s', colorScheme: 'dark' };
  const LS = { display: 'block', fontSize: 11, color: C.dim, marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 };
  const kirchenSatz = TAX.kirchenSatz8.includes(bundesland) ? 0.08 : 0.09;

  const run = useCallback(() => {
    setResult(compute(brutto, sk, kirchensteuer, kirchenSatz, kinder, kvZusatz / 100));
  }, [brutto, sk, kirchensteuer, kirchenSatz, kinder, kvZusatz]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;background:${C.bg};}
        .wrap{max-width:1200px;margin:0 auto;padding:0 24px;}
        .hero{display:flex;flex-direction:column;gap:32px;padding:48px 0 32px;}
        .main-layout{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:start;padding-bottom:60px;}
        .ad-side{display:flex;flex-direction:column;gap:16px;position:sticky;top:80px;}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .form-grid > div{min-width:0;overflow:hidden;}
        .stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
        .presets{display:flex;gap:8px;flex-wrap:wrap;}
        input:focus,select:focus{border-color:${C.acc}!important;box-shadow:0 0 0 3px rgba(240,136,62,0.2)!important;outline:none;}
        input[type=number]::-webkit-inner-spin-button{opacity:1;}
        .btn-calc{transition:all 0.2s;}.btn-calc:hover{background:${C.accHover}!important;transform:translateY(-1px);box-shadow:0 8px 24px rgba(240,136,62,0.4)!important;}.btn-calc:active{transform:translateY(0);}
        .preset-btn{transition:all 0.15s;}.preset-btn:hover{border-color:${C.acc}!important;background:${C.accLight}!important;}
        .nav-link{color:${C.muted};text-decoration:none;font-size:14px;font-weight:500;transition:color 0.15s;padding:6px 0;}.nav-link:hover{color:${C.txt};}
        .faq-q{cursor:pointer;transition:color 0.15s;}.faq-q:hover{color:${C.acc}!important;}
        .dot-grid{background-image:radial-gradient(circle,${C.dotGrid} 1px,transparent 1px);background-size:28px 28px;}
        @media(max-width:960px){.main-layout{grid-template-columns:1fr;}.ad-side{display:none;}.wrap{padding:0 16px;}}
        @media(max-width:768px){.hero{padding:32px 0 24px;}.hero h1{font-size:28px!important;}}
        @media(max-width:580px){.form-grid{grid-template-columns:1fr;}.stats-grid{grid-template-columns:1fr 1fr;}.presets{gap:6px;}.preset-btn{padding:6px 10px!important;font-size:11px!important;}.nav-link{display:none;}input[type=number],select{font-size:16px!important;padding:12px!important;height:48px!important;}}
        @media(max-width:380px){.stats-grid{grid-template-columns:1fr;}.wrap{padding:0 10px;}.hero h1{font-size:24px!important;}.presets{flex-direction:column;}.preset-btn{width:100%!important;justify-content:center!important;}}
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg, color: C.txt }} className="dot-grid">

        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${C.border}`, background: C.navBg, backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, gap: 16 }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', borderRadius: 10, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💰</div>
              <span style={{ fontWeight: 800, fontSize: 16, color: C.txt }}>GehaltsCheck.de</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <a href="/steuerklassen" className="nav-link">Steuerklassen</a>
              <a href="/sozialabgaben" className="nav-link">Sozialabgaben</a>
              <a href="/impressum" className="nav-link">Impressum</a>
            </div>
          </div>
        </nav>

        <div className="wrap">

          {/* Hero */}
          <section className="hero">
            <div style={{ paddingTop: 8 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.accLight, border: '1px solid rgba(240,136,62,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.acc, display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: C.acc, fontWeight: 600 }}>Kostenloser Rechner 2025</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: C.txt, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>Brutto Netto Rechner</h1>
              <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
                Berechne dein Nettogehalt in Sekunden — mit allen Steuerklassen, Sozialabgaben und Kirchensteuer. Kostenlos, ohne Anmeldung.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="/steuerklassen" style={{ background: C.presetBg, border: `1px solid ${C.border}`, borderRadius: 9, padding: '9px 18px', color: C.muted, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📋 Steuerklassen</a>
                <a href="/sozialabgaben" style={{ background: C.presetBg, border: `1px solid ${C.border}`, borderRadius: 9, padding: '9px 18px', color: C.muted, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📊 Sozialabgaben</a>
              </div>
            </div>
          </section>

          {/* Main Layout */}
          <div className="main-layout">
            <div>

              {/* Quick Presets */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: C.dim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700, marginBottom: 10 }}>Schnellauswahl</div>
                <div className="presets">
                  {PRESETS.map(p => (
                    <button key={p.name} className="preset-btn" onClick={() => setBrutto(p.brutto)} style={{ background: C.presetBg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: C.txt, fontSize: 13, fontWeight: 500 }}>
                      <span>{p.icon}</span><span>{p.name}</span><span style={{ color: C.dim, fontSize: 11 }}>{p.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}><AdSlot height={90} label="728×90 Leaderboard" /></div>

              {/* Input Form */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: '24px 28px', marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.txt, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ background: C.accLight, borderRadius: 6, padding: '2px 8px', fontSize: 11, color: C.acc }}>Eingaben</span>
                </div>
                <div className="form-grid">
                  <div>
                    <label style={LS}>Bruttogehalt (monatlich)</label>
                    <div style={{ position: 'relative' }}>
                      <input type="number" value={brutto} onChange={e => setBrutto(+e.target.value)} style={IS} min={0} step={100} />
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: C.dim, fontSize: 13, pointerEvents: 'none' }}>€/Monat</span>
                    </div>
                  </div>
                  <div>
                    <label style={LS}>Steuerklasse</label>
                    <select value={sk} onChange={e => setSk(+e.target.value)} style={IS}>
                      {STEUERKLASSEN.map(s => <option key={s.id} value={s.id}>{s.label} — {s.desc}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={LS}>Bundesland</label>
                    <select value={bundesland} onChange={e => setBundesland(e.target.value)} style={IS}>
                      {BUNDESLAENDER.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={LS}>KV-Zusatzbeitrag (%)</label>
                    <input type="number" value={kvZusatz} onChange={e => setKvZusatz(+e.target.value)} style={IS} min={0} max={5} step={0.1} />
                  </div>
                  <div>
                    <label style={LS}>Kinder</label>
                    <select value={kinder} onChange={e => setKinder(+e.target.value)} style={IS}>
                      {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? 'Keine Kinder' : `${n} Kind${n > 1 ? 'er' : ''}`}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={LS}>Kirchensteuer</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 42 }}>
                      <button onClick={() => setKirchensteuer(!kirchensteuer)} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: kirchensteuer ? C.acc : C.surface2, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: kirchensteuer ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                      </button>
                      <span style={{ fontSize: 13, color: kirchensteuer ? C.txt : C.dim }}>
                        {kirchensteuer ? `Ja (${TAX.kirchenSatz8.includes(bundesland) ? '8' : '9'}%)` : 'Nein'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn-calc" onClick={run} style={{ width: '100%', marginTop: 20, padding: '14px 24px', background: C.acc, color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: 'pointer', letterSpacing: 1, boxShadow: '0 4px 16px rgba(240,136,62,0.3)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  NETTO BERECHNEN
                </button>
              </div>

              {/* Results */}
              {result && (
                <>
                  <div style={{ background: `linear-gradient(135deg,rgba(240,136,62,0.1),${C.surface})`, border: '1px solid rgba(240,136,62,0.25)', borderRadius: 18, padding: 28, marginBottom: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: C.dim, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>Dein Nettogehalt</div>
                    <div style={{ fontSize: 'clamp(36px,5vw,52px)', fontWeight: 800, color: C.success, fontFamily: "'JetBrains Mono',monospace", letterSpacing: -1 }}>{eur(result.netto)}</div>
                    <div style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>von {eur(result.brutto)} brutto · Abgabenlast {pct(result.brutto - result.netto, result.brutto)}%</div>
                  </div>

                  <div className="stats-grid" style={{ marginBottom: 20 }}>
                    <StatBox label="Netto / Jahr" value={eur(result.netto * 12)} color={C.success} />
                    <StatBox label="Steuern" value={eur(result.steuern)} sub={`${pct(result.steuern, result.brutto)}% vom Brutto`} color={C.warning} />
                    <StatBox label="Sozialabgaben" value={eur(result.sozial)} sub={`${pct(result.sozial, result.brutto)}% vom Brutto`} color={C.info} />
                  </div>

                  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: '24px 28px', marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.txt, marginBottom: 16 }}>Detailaufstellung</div>
                    <div style={{ fontSize: 11, color: C.dim, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>Steuern</div>
                    <BreakdownBar label="Lohnsteuer" value={result.lst} total={result.brutto} color={C.warning} />
                    <BreakdownBar label="Solidaritätszuschlag" value={result.soli} total={result.brutto} color="#eab308" />
                    {kirchensteuer && <BreakdownBar label="Kirchensteuer" value={result.kirche} total={result.brutto} color="#a78bfa" />}
                    <div style={{ fontSize: 11, color: C.dim, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginTop: 16, fontWeight: 600 }}>Sozialabgaben</div>
                    <BreakdownBar label="Krankenversicherung" value={result.kv} total={result.brutto} color={C.info} />
                    <BreakdownBar label="Rentenversicherung" value={result.rv} total={result.brutto} color="#818cf8" />
                    <BreakdownBar label="Arbeitslosenversicherung" value={result.av} total={result.brutto} color="#34d399" />
                    <BreakdownBar label="Pflegeversicherung" value={result.pv} total={result.brutto} color="#f472b6" />
                    <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
                      <span style={{ color: C.muted }}>Gesamtabzüge</span>
                      <span style={{ color: C.error, fontFamily: "'JetBrains Mono',monospace" }}>{eur(result.steuern + result.sozial)}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}><AdSlot height={250} label="300×250 Rectangle" /></div>
                </>
              )}

              {/* FAQ */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 18, padding: '24px 28px', marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: C.txt, marginBottom: 16 }}>Häufige Fragen</h2>
                {FAQ.map((f, i) => (
                  <div key={i} style={{ borderBottom: i < FAQ.length - 1 ? `1px solid ${C.border}` : 'none', paddingBottom: 12, marginBottom: 12 }}>
                    <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: C.txt, fontSize: 14, fontWeight: 600 }}>
                      <span>{f.q}</span>
                      <span style={{ color: C.acc, fontSize: 18, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>+</span>
                    </div>
                    {openFaq === i && <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8, marginTop: 8 }}>{f.a}</p>}
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '14px 18px', fontSize: 12, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
                ⚠ Unverbindliche Berechnung nach § 32a EStG (Stand 2024/2025). Kein Ersatz für steuerliche Beratung. Abweichungen durch individuelle Freibeträge, geldwerte Vorteile oder Sonderzahlungen möglich.
              </div>

              {/* Footer */}
              <footer style={{ display: 'flex', justifyContent: 'center', gap: 24, padding: '16px 0', fontSize: 12, color: C.dim, borderTop: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
                <a href="/steuerklassen" style={{ color: C.dim, textDecoration: 'none' }}>Steuerklassen</a>
                <a href="/sozialabgaben" style={{ color: C.dim, textDecoration: 'none' }}>Sozialabgaben</a>
                <a href="/impressum" style={{ color: C.dim, textDecoration: 'none' }}>Impressum</a>
                <a href="/datenschutz" style={{ color: C.dim, textDecoration: 'none' }}>Datenschutz</a>
                <span>© 2025 GehaltsCheck.de</span>
              </footer>
            </div>

            {/* Sidebar */}
            <div className="ad-side">
              <AdSlot height={250} label="300×250 Rectangle" />
              <AdSlot height={600} label="300×600 Half Page" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
