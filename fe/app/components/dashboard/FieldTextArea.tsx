"use client";

interface FieldTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
}

export default function FieldTextArea({ label, icon: Icon, ...props }: FieldTextAreaProps) {
  return (
    <div className="space-y-2">
      <label
        className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        {Icon && (
          <span style={{ color: "var(--primary)" }}>
            <Icon size={14} />
          </span>
        )}

        {label}
      </label>

      <textarea
        {...props}
        className="min-h-[120px] w-full rounded-lg p-4 outline-none transition"
        style={{
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          color: "var(--text-primary)",
        }}
      />
    </div>
  );
}
