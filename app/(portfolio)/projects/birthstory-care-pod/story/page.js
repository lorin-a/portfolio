import BirthStoryStory from '@/components/Birthstory/story/BirthStoryStory'

// THE STORY SPINE — the full seven-beat flow of the artifact-led grammar:
// one birth told in the product's own time. Review-only draft.
export const metadata = {
  title: 'Birth Story — the story spine',
  robots: { index: false, follow: false, nocache: true },
}

export default function BirthStoryStoryPage() {
  return <BirthStoryStory />
}
