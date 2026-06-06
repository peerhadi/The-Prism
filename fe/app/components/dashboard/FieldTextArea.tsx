"use client";

export default function FieldTextArea({ label, icon: Icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-cyan-300 text-xs tracking-[0.3em] uppercase">
        {Icon && <Icon size={14} className="text-cyan-400" />}
        {label}
      </label>

      <textarea
        {...props}
        className="w-full p-4 bg-black/40 border border-cyan-500/10
        focus:border-cyan-400 outline-none rounded-lg min-h-[120px]"
      />
    </div>
  );
}
