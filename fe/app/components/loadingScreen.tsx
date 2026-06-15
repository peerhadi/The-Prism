export function PrismLoader() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary-soft),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--secondary-soft),transparent_30%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Glow */}
      <div className="absolute h-[400px] w-[400px] rounded-full bg-[var(--primary-soft)] blur-[140px]" />

      <div className="absolute h-[500px] w-[500px] rounded-full bg-[var(--secondary-soft)] blur-[160px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Spinner */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full border border-[var(--primary-border)]" />

          <div className="absolute inset-0 h-20 w-20 animate-spin rounded-full border-t-2 border-[var(--primary)] border-r-2 border-r-transparent border-b-transparent border-l-transparent" />

          <div className="absolute inset-3 h-14 w-14 animate-spin rounded-full border-t border-[var(--secondary)] border-r-transparent border-b-transparent border-l-transparent [animation-duration:2s]" />
        </div>

        {/* Text */}
        <div className="mt-8 text-center">
          <p className="text-[11px] font-black tracking-[0.4em] text-[var(--primary)] uppercase">
            Prism Network
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Loading Archive
          </h2>

          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Synchronizing intelligence streams...
          </p>
        </div>

        {/* Animated dots */}
        <div className="mt-6 flex gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)]" />

          <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] [animation-delay:150ms]" />

          <div className="h-2 w-2 animate-bounce rounded-full bg-[var(--primary)] [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
