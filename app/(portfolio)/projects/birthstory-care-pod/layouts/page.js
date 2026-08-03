import LayoutLab from '@/components/Birthstory/LayoutLab'

// Layout lab — a private comparison route, not a page. Four candidate flows for
// the case-study template, built for real so they can be scrolled side by side.
// Delete this route once the grammar is picked.
export const metadata = {
  title: 'Layout lab — Birth Story template flow',
  robots: { index: false, follow: false, nocache: true },
}

export default function LayoutsPage() {
  return <LayoutLab />
}
