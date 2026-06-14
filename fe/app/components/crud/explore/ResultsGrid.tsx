import HeroCard from "@/app/(user)/components/HeroCard";
import ListCard from "@/app/(user)/components/ListCard";
import ShortCard from "@/app/(user)/components/SmallCard";

type Source = { source: string; title: string; url: string };

export default function ResultsGrid({ heroStory, small, list }: { heroStory: { id: string; title: string; description: string; summary?: string; imageUrl: string; sources: string[]; type: string; createdAt: string }; small: { id: string; title: string; description: string; imageUrl: string; sources: string[] }[]; list: { id: string; title: string; description: string; imageUrl: string; sources: string[] }[] }) {
  return (
    <div className="space-y-10">
      <HeroCard
        id={heroStory.id}
        type={heroStory.type}
        createdAt={heroStory.createdAt}
        title={heroStory.title}
        description={heroStory.summary ?? heroStory.description}
        sources={heroStory.sources.map((s: string) => ({ source: s, title: s, url: s }))}
        status="LIVE"
        imageUrl={heroStory.imageUrl}
        onActionClick={() => {}}
      />

      <div className="grid md:grid-cols-2 gap-8">
        {small.map((s) => (
          <ShortCard
            key={s.id}
            id={s.id}
            title={s.title}
            badge="FEATURED"
            sources={s.sources}
            description={s.description}
            imageUrl={s.imageUrl}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-1 gap-8">
        {list.map((s) => (
          <ListCard
            key={s.id}
            id={s.id}
            title={s.title}
            sources={s.sources.map((src: string) => ({ source: src, title: src, url: src }))}
            description={s.description}
            imageUrl={s.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
