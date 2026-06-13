import HeroCard from "@/app/(user)/components/HeroCard";
import ListCard from "@/app/(user)/components/ListCard";
import ShortCard from "@/app/(user)/components/SmallCard";

export default function ResultsGrid({ articles, heroStory, small, list }: any) {
  return (
    <div className="space-y-10">
      <HeroCard {...heroStory} sources={[]} onActionClick={() => {}} />

      <div className="grid md:grid-cols-2 gap-8">
        {small.map((s: any) => (
          <ShortCard
            key={s.id}
            id={s.id}
            title={s.title}
            badge="idk"
            sources={s.sources}
            description={s.description}
            imageUrl={s.imageUrl}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-1 gap-8">
        {list.map((s: any) => (
          <ListCard
            key={s.id}
            id={s.id}
            title={s.title}
            badge="idk"
            sources={s.sources}
            description={s.description}
            imageUrl={s.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
