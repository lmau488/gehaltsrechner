export const metadata = {
  title: 'Steuerklassen 2025 – Übersicht, Wechsel & Unterschiede | GehaltsCheck.de',
  description: 'Alle 6 Steuerklassen erklärt: Wer bekommt welche Steuerklasse? Unterschiede, Wechselmöglichkeiten und Auswirkungen auf das Nettogehalt — kompakt und verständlich.',
  keywords: 'Steuerklassen, Steuerklasse 1 2 3 4 5 6, Steuerklasse wechseln, Steuerklassen Übersicht, Lohnsteuerklasse',
  alternates: { canonical: 'https://gehaltscheck.de/steuerklassen' },
  openGraph: { title: 'Steuerklassen 2025 – Übersicht & Unterschiede', description: 'Alle 6 Steuerklassen erklärt: Unterschiede, Wechsel, Auswirkungen aufs Netto.', url: 'https://gehaltscheck.de/steuerklassen' },
};

const C = {
  bg:'#13151f',surface:'#1c1f2e',surface2:'#242738',border:'rgba(255,255,255,0.07)',
  acc:'#f0883e',txt:'#ffffff',muted:'#94a3b8',dim:'#64748b',
  navBg:'rgba(19,21,31,0.85)',dotGrid:'rgba(255,255,255,0.06)',
  success:'#22c55e',error:'#ef4444',
};

export default function Steuerklassen() {
  const card = {background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,padding:'28px 32px',marginBottom:20};
  const h2s = {fontSize:20,fontWeight:700,color:C.acc,marginBottom:12,marginTop:0};
  const p = {fontSize:15,color:C.muted,lineHeight:1.8,marginBottom:12};
  const accent = {color:C.acc,fontWeight:700};
  const highlight = {background:'rgba(240,136,62,0.08)',border:'1px solid rgba(240,136,62,0.2)',borderRadius:12,padding:'16px 20px',marginBottom:16};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;background:${C.bg};}
        .dot-grid{background-image:radial-gradient(circle,${C.dotGrid} 1px,transparent 1px);background-size:28px 28px;}
        .nav-link{color:${C.muted};text-decoration:none;font-size:14px;font-weight:500;transition:color 0.15s;padding:6px 0;}
        .nav-link:hover{color:${C.txt};}.nav-link.active{color:${C.acc};}
        .sub-tbl{width:100%;border-collapse:collapse;}
        .sub-tbl th,.sub-tbl td{padding:10px 14px;text-align:left;font-size:13px;border-bottom:1px solid ${C.border};}
        .sub-tbl th{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${C.dim};font-weight:700;background:${C.surface2};}
        @media(max-width:580px){.wrap{padding:0 12px!important;}.sub-tbl th:nth-child(3),.sub-tbl td:nth-child(3){display:none;}.nav-link{display:none;}}
      `}</style>
      <div style={{minHeight:'100vh',background:C.bg,color:C.txt}} className="dot-grid">
        <nav style={{borderBottom:`1px solid ${C.border}`,background:C.navBg,backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}}>
          <div className="wrap" style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56,gap:16}}>
            <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
              <div style={{background:'linear-gradient(135deg,#f97316,#ea580c)',borderRadius:10,width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>💰</div>
              <span style={{fontWeight:800,fontSize:16,color:C.txt}}>GehaltsCheck.de</span>
            </a>
            <div style={{display:'flex',alignItems:'center',gap:24}}>
              <a href="/steuerklassen" className="nav-link active">Steuerklassen</a>
              <a href="/sozialabgaben" className="nav-link">Sozialabgaben</a>
              <a href="/impressum" className="nav-link">Impressum</a>
            </div>
          </div>
        </nav>

        <div className="wrap" style={{maxWidth:820,margin:'0 auto',padding:'40px 24px 60px'}}>
          <div style={{fontSize:13,color:C.dim,marginBottom:20}}>
            <a href="/" style={{color:C.acc,textDecoration:'none'}}>GehaltsCheck.de</a>{' → '}Steuerklassen
          </div>

          <div style={card}>
            <h1 style={{fontSize:32,fontWeight:800,color:C.txt,marginBottom:8,lineHeight:1.2}}>Steuerklassen 2025</h1>
            <p style={{...p,fontSize:17,color:C.txt,marginBottom:20}}>
              Welche <span style={accent}>Steuerklasse</span> gilt für wen? Alle 6 Klassen erklärt — mit Unterschieden, Freibeträgen und Tipps zum Wechsel.
            </p>
            <a href="/" style={{display:'inline-block',background:C.acc,color:'#fff',borderRadius:10,padding:'12px 24px',fontWeight:700,textDecoration:'none',fontSize:14}}>
              → Netto mit deiner Steuerklasse berechnen
            </a>
          </div>

          <section style={card}>
            <h2 style={h2s}>📋 Übersicht aller 6 Steuerklassen</h2>
            <table className="sub-tbl">
              <thead><tr><th>Klasse</th><th>Für wen?</th><th>Grundfreibetrag</th></tr></thead>
              <tbody>
                <tr><td style={{color:C.txt,fontWeight:700}}>Klasse 1</td><td style={{color:C.muted}}>Ledige, Geschiedene, Verwitwete</td><td style={{color:C.txt}}>11.604 €</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Klasse 2</td><td style={{color:C.muted}}>Alleinerziehende (mit Kind im Haushalt)</td><td style={{color:C.txt}}>11.604 € + 4.260 € Entlastung</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Klasse 3</td><td style={{color:C.muted}}>Verheiratet, höheres Einkommen (Partner in SK 5)</td><td style={{color:C.txt}}>2× 11.604 € (Splitting)</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Klasse 4</td><td style={{color:C.muted}}>Verheiratet, ähnliches Einkommen</td><td style={{color:C.txt}}>11.604 €</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Klasse 5</td><td style={{color:C.muted}}>Verheiratet, geringeres Einkommen (Partner in SK 3)</td><td style={{color:C.txt}}>Kein Grundfreibetrag</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Klasse 6</td><td style={{color:C.muted}}>Zweitjob, Nebentätigkeit</td><td style={{color:C.txt}}>Kein Grundfreibetrag</td></tr>
              </tbody>
            </table>
          </section>

          <section style={card}>
            <h2 style={h2s}>💡 Steuerklasse 1 — Der Standard</h2>
            <p style={p}>Die häufigste Steuerklasse in Deutschland. Sie gilt automatisch für alle <strong style={{color:C.txt}}>ledigen, geschiedenen oder dauerhaft getrennt lebenden</strong> Arbeitnehmer.</p>
            <div style={highlight}>
              <strong>Freibeträge SK 1:</strong> Grundfreibetrag <span style={accent}>11.604 €</span>, Werbungskosten-Pauschale <span style={accent}>1.230 €</span>, Sonderausgaben-Pauschale <span style={accent}>36 €</span>
            </div>
          </section>

          <section style={card}>
            <h2 style={h2s}>👨‍👧 Steuerklasse 2 — Alleinerziehende</h2>
            <p style={p}>Für Alleinerziehende mit mindestens einem Kind im Haushalt. Der <strong style={{color:C.txt}}>Entlastungsbetrag von 4.260 €</strong> reduziert die Steuerlast deutlich gegenüber SK 1.</p>
            <div style={highlight}>
              <strong>Voraussetzung:</strong> Mindestens ein Kind mit Hauptwohnsitz in deinem Haushalt, für das du Kindergeld erhältst. Keine weitere volljährige Person im Haushalt.
            </div>
          </section>

          <section style={card}>
            <h2 style={h2s}>💑 Steuerklasse 3 & 5 — Das Ehepaar-Modell</h2>
            <p style={p}>Die Kombination <strong style={{color:C.txt}}>3/5</strong> lohnt sich, wenn ein Partner deutlich mehr verdient. Der Besserverdienende zahlt in SK 3 weniger Lohnsteuer, der andere in SK 5 mehr.</p>
            <div style={{background:'rgba(96,165,250,0.1)',border:'1px solid rgba(96,165,250,0.25)',borderRadius:12,padding:'16px 20px',marginBottom:16}}>
              <strong style={{color:'#60a5fa'}}>Wichtig:</strong> <span style={{color:C.muted}}>Die Steuerklassenwahl beeinflusst nur die <strong style={{color:C.txt}}>monatliche Vorauszahlung</strong>. Die tatsächliche Jahressteuerlast bleibt gleich — Über- oder Unterzahlungen werden über die Steuererklärung ausgeglichen.</span>
            </div>
            <p style={p}><strong style={{color:C.txt}}>Faustregel:</strong> SK 3/5 lohnt sich ab ca. 60/40 Einkommensverhältnis. Bei ähnlichem Gehalt ist SK 4/4 besser.</p>
          </section>

          <section style={card}>
            <h2 style={h2s}>🔄 Steuerklasse wechseln</h2>
            <p style={p}>Seit 2020 ist ein Wechsel <strong style={{color:C.txt}}>mehrmals pro Jahr</strong> möglich (vorher nur 1×). Der Antrag läuft über das Finanzamt oder online via ELSTER.</p>
            <table className="sub-tbl">
              <thead><tr><th>Anlass</th><th>Neuer Anspruch</th></tr></thead>
              <tbody>
                <tr><td style={{color:C.txt}}>Heirat</td><td style={{color:C.muted}}>SK 4/4 (automatisch) oder Antrag auf 3/5</td></tr>
                <tr><td style={{color:C.txt}}>Scheidung</td><td style={{color:C.muted}}>SK 1 (ab Folgejahr)</td></tr>
                <tr><td style={{color:C.txt}}>Kind geboren (alleinerziehend)</td><td style={{color:C.muted}}>Antrag auf SK 2</td></tr>
                <tr><td style={{color:C.txt}}>Zweitjob aufgenommen</td><td style={{color:C.muted}}>SK 6 für den Nebenjob (automatisch)</td></tr>
              </tbody>
            </table>
          </section>

          <div style={{...card,background:`linear-gradient(135deg,rgba(240,136,62,0.08),${C.surface})`,borderColor:'rgba(240,136,62,0.2)',textAlign:'center'}}>
            <div style={{fontSize:32,marginBottom:12}}>💰</div>
            <h2 style={{...h2s,textAlign:'center'}}>Was bleibt netto übrig?</h2>
            <p style={{...p,textAlign:'center'}}>Berechne dein Nettogehalt mit deiner Steuerklasse — kostenlos und sofort.</p>
            <a href="/" style={{display:'inline-block',background:C.acc,color:'#fff',borderRadius:10,padding:'13px 28px',fontWeight:700,textDecoration:'none',fontSize:15,boxShadow:'0 4px 16px rgba(240,136,62,0.3)'}}>→ Zum Brutto-Netto-Rechner</a>
          </div>

          <footer style={{display:'flex',justifyContent:'center',gap:24,padding:'16px 0',fontSize:12,color:C.dim,borderTop:`1px solid ${C.border}`,flexWrap:'wrap'}}>
            <a href="/steuerklassen" style={{color:C.acc,textDecoration:'none'}}>Steuerklassen</a>
            <a href="/sozialabgaben" style={{color:C.dim,textDecoration:'none'}}>Sozialabgaben</a>
            <a href="/impressum" style={{color:C.dim,textDecoration:'none'}}>Impressum</a>
            <a href="/datenschutz" style={{color:C.dim,textDecoration:'none'}}>Datenschutz</a>
            <span>© 2025 GehaltsCheck.de</span>
          </footer>
        </div>
      </div>
    </>
  );
}
