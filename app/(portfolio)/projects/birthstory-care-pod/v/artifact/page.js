import VArtifact from '@/components/Birthstory/variants/VArtifact'

// Direction study B — one pinned phone narrates the whole case study; every
// chapter changes what is on its screen. Review-only route.
export const metadata = {
  title: 'Birth Story — direction B · One Artifact',
  robots: { index: false, follow: false, nocache: true },
}

export default function Page() {
  return <VArtifact />
}
