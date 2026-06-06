import BiasRangeCard from "./BiasRangeCard";

export default function BiasRanges({ ranges }: any) {
  return (
    <section className="mt-16 grid gap-8 md:grid-cols-2">
      {ranges.map((range: any) => (
        <BiasRangeCard key={range.title} range={range} />
      ))}
    </section>
  );
}
