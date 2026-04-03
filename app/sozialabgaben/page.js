export const metadata = {
  title: 'Sozialabgaben 2025 – Beiträge, Grenzen & Berechnung | GehaltsCheck.de',
  description: 'Sozialabgaben 2025 im Überblick: Krankenversicherung, Rentenversicherung, Arbeitslosenversicherung, Pflegeversicherung — Beitragssätze und Beitragsbemessungsgrenzen.',
  keywords: 'Sozialabgaben 2025, Beitragssätze, Beitragsbemessungsgrenze, Krankenversicherung, Rentenversicherung, Pflegeversicherung',
  alternates: { canonical: 'https://gehaltscheck.de/sozialabgaben' },
};

const C = {
  bg:'#13151f',surface:'#1c1f2e',surface2:'#242738',border:'rgba(255,255,255,0.07)',
  acc:'#f0883e',txt:'#ffffff',muted:'#94a3b8',dim:'#64748b',
  navBg:'rgba(19,21,31,0.85)',dotGrid:'rgba(255,255,255,0.06)',
};

export default function Sozialabgaben() {
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
        @media(max-width:580px){.wrap{padding:0 12px!important;}.sub-tbl th:last-child,.sub-tbl td:last-child{display:none;}.nav-link{display:none;}}
      `}</style>
      <div style={{minHeight:'100vh',background:C.bg,color:C.txt}} className="dot-grid">
        <nav style={{borderBottom:`1px solid ${C.border}`,background:C.navBg,backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}}>
          <div className="wrap" style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:56,gap:16}}>
            <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
              <div style={{background:'linear-gradient(135deg,#f97316,#ea580c)',borderRadius:10,width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>💰</div>
              <span style={{fontWeight:800,fontSize:16,color:C.txt}}>GehaltsCheck.de</span>
            </a>
            <div style={{display:'flex',alignItems:'center',gap:24}}>
              <a href="/steuerklassen" className="nav-link">Steuerklassen</a>
              <a href="/sozialabgaben" className="nav-link active">Sozialabgaben</a>
              <a href="/impressum" className="nav-link">Impressum</a>
            </div>
          </div>
        </nav>

        <div className="wrap" style={{maxWidth:820,margin:'0 auto',padding:'40px 24px 60px'}}>
          <div style={{fontSize:13,color:C.dim,marginBottom:20}}>
            <a href="/" style={{color:C.acc,textDecoration:'none'}}>GehaltsCheck.de</a>{' → '}Sozialabgaben
          </div>

          <div style={card}>
            <h1 style={{fontSize:32,fontWeight:800,color:C.txt,marginBottom:8,lineHeight:1.2}}>Sozialabgaben 2025</h1>
            <p style={{...p,fontSize:17,color:C.txt,marginBottom:20}}>
              Alle <span style={accent}>Beitragssätze und Beitragsbemessungsgrenzen</span> auf einen Blick — verständlich erklärt.
            </p>
            <a href="/" style={{display:'inline-block',background:C.acc,color:'#fff',borderRadius:10,padding:'12px 24px',fontWeight:700,textDecoration:'none',fontSize:14}}>
              → Sozialabgaben für dein Gehalt berechnen
            </a>
          </div>

          <section style={card}>
            <h2 style={h2s}>📊 Beitragssätze 2025 im Überblick</h2>
            <table className="sub-tbl">
              <thead><tr><th>Versicherung</th><th>Gesamtbeitrag</th><th>Arbeitnehmer</th><th>BBG/Monat</th></tr></thead>
              <tbody>
                <tr><td style={{color:C.txt,fontWeight:700}}>Krankenversicherung</td><td style={{color:C.txt}}>14,6% + Zusatzbeitrag</td><td style={{color:C.acc,fontWeight:700}}>~8,15%</td><td style={{color:C.muted}}>5.512,50 €</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Rentenversicherung</td><td style={{color:C.txt}}>18,6%</td><td style={{color:C.acc,fontWeight:700}}>9,3%</td><td style={{color:C.muted}}>8.050 €</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Arbeitslosenversicherung</td><td style={{color:C.txt}}>2,6%</td><td style={{color:C.acc,fontWeight:700}}>1,3%</td><td style={{color:C.muted}}>8.050 €</td></tr>
                <tr><td style={{color:C.txt,fontWeight:700}}>Pflegeversicherung</td><td style={{color:C.txt}}>3,4%</td><td style={{color:C.acc,fontWeight:700}}>1,7%</td><td style={{color:C.muted}}>5.512,50 €</td></tr>
              </tbody>
            </table>
            <p style={{...p,fontSize:12,marginTop:12,color:C.dim}}>BBG = Beitragsbemessungsgrenze. Verdienst oberhalb wird nicht zusätzlich belastet.</p>
          </section>

          <section style={card}>
            <h2 style={h2s}>🏥 Krankenversicherung (KV)</h2>
            <p style={p}>Der allgemeine Beitragssatz beträgt <span style={accent}>14,6%</span>, je zur Hälfte von Arbeitnehmer und Arbeitgeber getragen. Dazu kommt ein kassenindividueller <strong style={{color:C.txt}}>Zusatzbeitrag</strong> (Durchschnitt 2025: ca. 1,7%), ebenfalls hälftig geteilt.</p>
            <div style={highlight}>
              <strong>Rechenbeispiel:</strong> Bei 3.800 € brutto und 1,7% Zusatzbeitrag:<br/>
              AN-Anteil = 3.800 € × (14,6% + 1,7%) / 2 = <span style={accent}>~309,74 €</span>
            </div>
          </section>

          <section style={card}>
            <h2 style={h2s}>👴 Rentenversicherung (RV)</h2>
            <p style={p}>Der Beitragssatz beträgt <span style={accent}>18,6%</span> vom Bruttolohn, hälftig geteilt. Die Beitragsbemessungsgrenze liegt 2025 einheitlich bei <strong style={{color:C.txt}}>8.050 €/Monat</strong> (96.600 €/Jahr).</p>
            <p style={p}>Wer mehr verdient, zahlt auf den Betrag darüber keine Rentenversicherung — bekommt aber auch keine höhere Rente dafür.</p>
          </section>

          <section style={card}>
            <h2 style={h2s}>👶 Pflegeversicherung (PV)</h2>
            <p style={p}>Grundbeitrag: <span style={accent}>3,4%</span>, hälftig geteilt. Sonderregeln:</p>
            <table className="sub-tbl">
              <thead><tr><th>Situation</th><th>Zuschlag/Abschlag</th><th>AN-Anteil</th></tr></thead>
              <tbody>
                <tr><td style={{color:C.txt}}>Kinderlos, über 23 Jahre</td><td style={{color:C.error,fontWeight:700}}>+0,6%</td><td style={{color:C.txt}}>2,3%</td></tr>
                <tr><td style={{color:C.txt}}>1 Kind</td><td style={{color:C.muted}}>Standard</td><td style={{color:C.txt}}>1,7%</td></tr>
                <tr><td style={{color:C.txt}}>2 Kinder</td><td style={{color:'#22c55e',fontWeight:700}}>-0,25%</td><td style={{color:C.txt}}>1,45%</td></tr>
                <tr><td style={{color:C.txt}}>3 Kinder</td><td style={{color:'#22c55e',fontWeight:700}}>-0,50%</td><td style={{color:C.txt}}>1,2%</td></tr>
                <tr><td style={{color:C.txt}}>5+ Kinder</td><td style={{color:'#22c55e',fontWeight:700}}>-1,00%</td><td style={{color:C.txt}}>0,7%</td></tr>
              </tbody>
            </table>
          </section>

          <section style={card}>
            <h2 style={h2s}>📈 Beitragsbemessungsgrenzen 2025</h2>
            <div style={highlight}>
              <strong>KV / PV:</strong> <span style={accent}>66.150 €/Jahr</span> (5.512,50 €/Monat)<br/>
              <strong>RV / AV:</strong> <span style={accent}>96.600 €/Jahr</span> (8.050 €/Monat)
            </div>
            <p style={p}>Oberhalb dieser Grenzen steigen die Sozialabgaben nicht weiter. Für Gutverdiener bedeutet das: der prozentuale Anteil der Sozialabgaben sinkt mit steigendem Gehalt.</p>
          </section>

          <div style={{...card,background:`linear-gradient(135deg,rgba(240,136,62,0.08),${C.surface})`,borderColor:'rgba(240,136,62,0.2)',textAlign:'center'}}>
            <div style={{fontSize:32,marginBottom:12}}>💰</div>
            <h2 style={{...h2s,textAlign:'center'}}>Deine Sozialabgaben berechnen</h2>
            <p style={{...p,textAlign:'center'}}>Unser Rechner zeigt dir genau, wie viel KV, RV, AV und PV von deinem Gehalt abgehen.</p>
            <a href="/" style={{display:'inline-block',background:C.acc,color:'#fff',borderRadius:10,padding:'13px 28px',fontWeight:700,textDecoration:'none',fontSize:15,boxShadow:'0 4px 16px rgba(240,136,62,0.3)'}}>→ Zum Brutto-Netto-Rechner</a>
          </div>

          <footer style={{display:'flex',justifyContent:'center',gap:24,padding:'16px 0',fontSize:12,color:C.dim,borderTop:`1px solid ${C.border}`,flexWrap:'wrap'}}>
            <a href="/steuerklassen" style={{color:C.dim,textDecoration:'none'}}>Steuerklassen</a>
            <a href="/sozialabgaben" style={{color:C.acc,textDecoration:'none'}}>Sozialabgaben</a>
            <a href="/impressum" style={{color:C.dim,textDecoration:'none'}}>Impressum</a>
            <a href="/datenschutz" style={{color:C.dim,textDecoration:'none'}}>Datenschutz</a>
            <span>© 2025 GehaltsCheck.de</span>
          </footer>
        </div>
      </div>
    </>
  );
}
