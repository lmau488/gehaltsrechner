export const metadata = { title: 'Impressum – GehaltsCheck.de', robots: 'noindex' };

const C = {
  bg:'#13151f',surface:'#1c1f2e',border:'rgba(255,255,255,0.07)',
  acc:'#f0883e',txt:'#ffffff',muted:'#94a3b8',dim:'#64748b',
  navBg:'rgba(19,21,31,0.85)',dotGrid:'rgba(255,255,255,0.06)',
};

export default function Impressum() {
  const card = {background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,padding:'28px 32px',marginBottom:20};
  const h2s = {fontSize:18,fontWeight:700,color:C.acc,marginBottom:8,marginTop:24};
  const p = {fontSize:15,color:C.muted,lineHeight:1.8,marginBottom:12};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;background:${C.bg};}
        .dot-grid{background-image:radial-gradient(circle,${C.dotGrid} 1px,transparent 1px);background-size:28px 28px;}
        .nav-link{color:${C.muted};text-decoration:none;font-size:14px;font-weight:500;transition:color 0.15s;padding:6px 0;}
        .nav-link:hover{color:${C.txt};}.nav-link.active{color:${C.acc};}
        @media(max-width:580px){.wrap{padding:0 12px!important;}.nav-link{display:none;}}
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
              <a href="/sozialabgaben" className="nav-link">Sozialabgaben</a>
              <a href="/impressum" className="nav-link active">Impressum</a>
            </div>
          </div>
        </nav>
        <div className="wrap" style={{maxWidth:820,margin:'0 auto',padding:'40px 24px 60px'}}>
          <div style={{fontSize:13,color:C.dim,marginBottom:20}}>
            <a href="/" style={{color:C.acc,textDecoration:'none'}}>GehaltsCheck.de</a>{' → '}Impressum
          </div>
          <div style={card}>
            <h1 style={{fontSize:32,fontWeight:800,color:C.txt,marginBottom:8}}>Impressum</h1>
            <p style={{...p,color:C.dim,fontSize:13}}>Angaben gemäß § 5 TMG / § 18 Abs. 2 MStV</p>
            <h2 style={h2s}>Verantwortlich</h2>
            <p style={p}><strong style={{color:C.txt}}>Luis Mauermaier</strong><br/>Wolnzacher Weg 9a<br/>85283 Wolnzach<br/>Deutschland</p>
            <h2 style={h2s}>Kontakt</h2>
            <p style={p}>E-Mail: luis.mauermaier@proton.me</p>
            <h2 style={h2s}>Haftungsausschluss</h2>
            <p style={{...p,fontSize:14,color:C.dim}}>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Die Berechnungen basieren auf § 32a EStG und den aktuellen Sozialversicherungsbeiträgen.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.
              Die Berechnung ersetzt keine steuerliche Beratung.
            </p>
          </div>
          <div style={{...card,background:`linear-gradient(135deg,rgba(240,136,62,0.08),${C.surface})`,borderColor:'rgba(240,136,62,0.2)',textAlign:'center'}}>
            <div style={{fontSize:32,marginBottom:12}}>💰</div>
            <p style={{...p,textAlign:'center'}}>Zurück zum kostenlosen Gehaltsrechner</p>
            <a href="/" style={{display:'inline-block',background:C.acc,color:'#fff',borderRadius:10,padding:'13px 28px',fontWeight:700,textDecoration:'none',fontSize:15,boxShadow:'0 4px 16px rgba(240,136,62,0.3)'}}>→ Zum Brutto-Netto-Rechner</a>
          </div>
          <footer style={{display:'flex',justifyContent:'center',gap:24,padding:'16px 0',fontSize:12,color:C.dim,borderTop:`1px solid ${C.border}`,flexWrap:'wrap'}}>
            <a href="/impressum" style={{color:C.acc,textDecoration:'none'}}>Impressum</a>
            <a href="/datenschutz" style={{color:C.dim,textDecoration:'none'}}>Datenschutz</a>
            <span>© 2025 GehaltsCheck.de</span>
          </footer>
        </div>
      </div>
    </>
  );
}
