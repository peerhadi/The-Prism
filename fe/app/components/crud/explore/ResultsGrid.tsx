import GenericObsidianStoryCard from "@/app/(user)/components/HeroCard";
import GenericShortStoryCard from "@/app/(user)/components/SmallCard";

export default function ResultsGrid({ articles, heroStory, small }: any) {
  console.log(articles, heroStory, small);
  return (
    <div className="space-y-10">
      <GenericObsidianStoryCard
        {...heroStory}
        sources={[]}
        onActionClick={() => {}}
      />

      <div className="grid md:grid-cols-2 gap-8">
        {small.map((s: any) => (
          <GenericShortStoryCard
            key={s.id}
            id={s.id}
            title={s.title}
            badge="idk"
            description={s.description}
            imageUrl={s.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
