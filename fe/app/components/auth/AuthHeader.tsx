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
      <CardTitle className="text-center text-[36px] font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-fuchsia-400 uppercase">
        {title}
      </CardTitle>

      <p className="mt-1 text-center text-[10px] tracking-[0.45em] text-cyan-300/60 uppercase">
        {subtitle}
      </p>
    </CardHeader>
  );
}
