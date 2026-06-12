"use client";

export default function FieldInput({ label, icon: Icon, ...props }: any) {
  return (
    <div className="space-y-2">
      <label
        className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {Icon && (
          <Icon
            size={14}
            style={{
              color: "var(--primary)",
            }}
          />
        )}

        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-lg p-4 outline-none transition"
        style={{
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          color: "var(--text-primary)",
        }}
      />
    </div>
  );
}
