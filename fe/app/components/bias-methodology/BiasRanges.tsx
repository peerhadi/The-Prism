import BiasRangeCard from "./BiasRangeCard";

interface BiasRange {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

export default function BiasRanges({ ranges }: { ranges: BiasRange[] }) {
  return (
    <section className="mt-16 grid gap-8 md:grid-cols-2">
      {ranges.map((range: BiasRange) => (
        <BiasRangeCard key={range.title} range={range} />
      ))}
    </section>
  );
}
