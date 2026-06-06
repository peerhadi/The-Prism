export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-[9px] tracking-[0.35em] text-white/20 uppercase">
        External Auth
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}
