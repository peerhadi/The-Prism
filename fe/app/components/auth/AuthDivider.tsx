export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[var(--border)]" />

      <span
        className="text-[9px] uppercase"
        style={{
          color: "var(--text-faint)",
          letterSpacing: "0.35em",
        }}
      >
        External Auth
      </span>

      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}
