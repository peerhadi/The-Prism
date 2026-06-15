import { CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <CardHeader className="pt-10 pb-6">
      <CardTitle
        className="text-center text-[36px] font-black tracking-[0.25em] uppercase bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--primary), var(--accent), var(--secondary))",
        }}
      >
        {title}
      </CardTitle>

      <p
        className="mt-1 text-center text-[10px] tracking-[0.45em] uppercase"
        style={{
          color: "var(--text-faint)",
        }}
      >
        {subtitle}
      </p>
    </CardHeader>
  );
}
