import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Skipfee: vende directo por WhatsApp, sin comisiones";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#13233B",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#2BD15A",
              color: "#0c3d1d",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            <span>Skip</span>
            <span style={{ color: "#2BD15A" }}>Fee</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>
          Vende por WhatsApp.
        </div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, color: "#2BD15A" }}>
          Sin comisiones.
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#A9B6C8", marginTop: 30, maxWidth: 920 }}>
          Tus clientes, tus datos y tus ganancias. Y haz que vuelvan a comprar.
        </div>
      </div>
    ),
    size,
  );
}
