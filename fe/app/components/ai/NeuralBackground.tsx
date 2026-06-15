export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* GLOW BLOBS */}
      <div
        className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] blur-[160px]"
        style={{ background: "var(--primary-glow)" }}
      />

      <div
        className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] blur-[200px]"
        style={{ background: "var(--secondary-glow)" }}
      />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* HORIZONTAL SCANLINES */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(transparent 95%, var(--border-subtle) 100%)",
          backgroundSize: "100% 6px",
        }}
      />

      {/* NOISE TEXTURE (kept external but theme-safe overlay) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
