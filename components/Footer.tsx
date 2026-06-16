import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap-wide">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/">
              <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M5 33 L18 9 a3 3 0 0 1 5 0 L31 25" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.5 25 h10" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                <circle cx="24" cy="33" r="4.5" fill="#2BD15A" />
              </svg>{" "}
              Skip<span className="green" style={{ color: "var(--green)" }}>Fee</span>
            </Link>
            <p>La plataforma para vender por WhatsApp y manejar tu restaurante, sin regalarle tu margen ni tu información a nadie.</p>
          </div>
          <div>
            <h4>Producto</h4>
            <ul>
              <li><Link href="/para-tus-clientes">Para tus clientes</Link></li>
              <li><Link href="/para-tu-negocio">Para tu negocio</Link></li>
              <li><Link href="/precios">Precios</Link></li>
              <li><Link href="/pre-registro">Pre-registro</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:hola@skipfee.co">hola@skipfee.co</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/terminos">Términos</Link></li>
              <li><Link href="/privacidad">Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Skipfee</span>
          <span>Hecho con cariño en Medellín 🇨🇴</span>
        </div>
      </div>
    </footer>
  );
}
