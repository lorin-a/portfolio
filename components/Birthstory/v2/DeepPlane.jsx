'use client'

import { cloudImg } from '@/lib/cloudinary'
import { IaV1, IaFinal } from '../IaDiagrams'
import { Frame, useSeen } from './frame'
import s from './v2.module.css'

/* Part two — behind the work (F21/F22, the two-plane page). The scanner is done
   at the coda's doorstep; this plane is for the curious. Structure per the F24
   advice: ONE deep core (the entry-flow decision taken to the bottom), then the
   rest stated crisply — the wireframe archive, the words, the pitch. All
   substantive prose is Lorin's, carried verbatim from the V1 draft; only the
   step labels and threshold line are structural copy (provisional, hers). */

/* per-block reveal inside the tall core section */
function Step({ tag, className = '', children }) {
  const [ref, seen] = useSeen(0.14)
  return (
    <div ref={ref} className={`${s.step} ${seen ? s.in : ''} ${className}`}>
      {tag && <p className={`${s.stepTag} ${s.up}`}>{tag}</p>}
      {children}
    </div>
  )
}

/* the "my thinking" register — her first-person judgment, labeled */
function Think({ children }) {
  return (
    <div className={`${s.think} ${s.up}`} style={{ '--d': '140ms' }}>
      <p className={s.thinkTag}>my thinking</p>
      <p className={s.thinkText}>{children}</p>
    </div>
  )
}

/* the three rounds — every screen, stated crisply (the archive register) */
const SHEET = [
  {
    label: 'Version 1 · Week 3',
    change: 'The first version tried to do everything, with a tool for every situation and sub-menus inside menus. It was disorienting.',
    ids: ['v1-1', 'v1-2', 'v1-3', 'v1-4', 'v1-5', 'v1-6', 'v1-7'],
  },
  {
    label: 'Version 2 · Week 4',
    change: 'For the second version I consolidated everything into one filterable notes section and narrowed the flow to two actions, document and reflect, one at a time. It was clearer, but still too many options, and the copy drew a flag too.',
    ids: ['v2-1', 'v2-2', 'v2-3', 'v2-4', 'v2-5', 'v2-6', 'v2-7'],
  },
  {
    label: 'Version 3 · Week 5',
    change: 'By the third version I kept only the features parents came back to, and left room to go deeper.',
    ids: ['v3-1', 'v3-2', 'v3-3', 'v3-4', 'v3-5', 'v3-6', 'v3-7'],
  },
]

/* what testing said → what we did (her real feedback quotes; row about the
   copy flag lives in The Words instead, so nothing is told twice) */
const FLOWS = [
  {
    heard: 'Onboarding is nice, but too many buttons and options. Too many menus.',
    learned: 'Cognitive load was the enemy, not missing features.',
    did: 'Open straight into notes on a timeline; everything else a tap away.',
  },
  {
    heard: 'Timeline is a must; journaling is unique to everyone.',
    learned: 'Some needs are core, others are personal.',
    did: 'The timeline is the home; journaling is there when you want it.',
  },
  {
    heard: 'Big yes to voice recording; medical reflection is valuable but may not need its own category.',
    learned: 'Capture has to fit full hands, and one place beats many.',
    did: 'Voice memos and medical notes land on the one tagged timeline.',
  },
]

export default function DeepPlane() {
  const [gateRef, gateSeen] = useSeen(0.3)
  return (
    <>
      {/* ── THE THRESHOLD — the visible reason for the register switch ── */}
      <section ref={gateRef} className={`${s.frame} ${s.gate} ${gateSeen ? s.in : ''}`} aria-label="Part two, behind the work">
        <div className={s.inner}>
          <span className={`${s.gateStem} ${s.up}`} aria-hidden="true" />
          <p className={`${s.kicker} ${s.gateKicker} ${s.up}`} style={{ '--d': '100ms' }}>Part two</p>
          <h2 className={`${s.claim} ${s.gateClaim} ${s.up}`} style={{ '--d': '180ms' }}>Behind the work</h2>
          <p className={`${s.line} ${s.gateLine} ${s.up}`} style={{ '--d': '280ms' }}>
            The story is told above. This is how it was made: one decision taken all the way down,
            then every screen of every round, the words, and the pitch.
          </p>
        </div>
      </section>

      {/* ── 09 · THE DEEP CORE — the entry-flow decision, to the bottom ── */}
      <Frame id="core" kicker="09 · One decision, all the way down" className={s.deep} threshold={0.06}>
        <h2 className={`${s.claim} ${s.claimLong} ${s.voice} ${s.up}`} style={{ '--d': '80ms' }}>
          Capacity rises over time, so the app had to meet <b>three different moments</b>, not one.
        </h2>

        {/* the evidence — where the constraint came from */}
        <Step tag="the evidence">
          <div className={s.coreGrid}>
            <div className={s.coreCopy}>
              <p className={`${s.deepProse} ${s.up}`}>
                This was a design sprint on a concept already built on extensive research, so our work
                focused on concept iteration. Before we built anything, I researched blogs and existing
                products and ran information interviews with family to get familiar with the subject:
                my three sisters, my mom, and my friend with a toddler.
              </p>
              <Think>
                My thinking was rooted in my close family members’ traumatic experiences, which led me
                to a trauma-informed approach. I wanted the right balance between the individual feat
                of giving birth and the collective experience around it, with an interaction matched to
                a new parent’s capacity. So I left medical documentation optional and, by the final
                iteration, built the design around events on a timeline.
              </Think>
            </div>
            <aside className={`${s.moments} ${s.up}`} style={{ '--d': '200ms' }} aria-label="How they said they would use it">
              <p className={s.stepTag}>how they’d use it</p>
              <div className={s.moment}>
                <p className={s.momentWhen}>Early, in the fog</p>
                <p className={s.momentWhat}>Select-one answers, a few taps at a time.</p>
              </div>
              <div className={s.moment}>
                <p className={s.momentWhen}>Later, once it lifts</p>
                <p className={s.momentWhat}>Free-form journaling, at their own pace.</p>
              </div>
              <div className={s.moment}>
                <p className={s.momentWhen}>In the end</p>
                <p className={s.momentWhat}>A keepsake book of the whole story.</p>
              </div>
            </aside>
          </div>
        </Step>

        {/* the first attempt — the mistake, owned */}
        <Step tag="the first attempt">
          <div className={s.coreGrid}>
            <div className={s.coreCopy}>
              <p className={`${s.deepProse} ${s.up}`}>
                Our first attempt met the user in the moment. The opening menu asked what phase they
                were in, before, during, or after the birth, at home or in the hospital, to determine
                the need, and with it the best feature for that moment.
              </p>
              <Think>
                Looking back, it did the opposite of what we intended. Meant to lower cognitive load,
                it gate-kept features instead of offering freedom and autonomy, and it made the app
                layered and disorienting: a form at the front desk while you’re still catching your
                breath.
              </Think>
            </div>
            <figure className={`${s.iaFig} ${s.up}`} style={{ '--d': '200ms' }}>
              <IaV1 />
              <figcaption className={s.cap}>
                ia-v1 · a branching questionnaire that asked conditional questions before any entry.
              </figcaption>
            </figure>
          </div>
        </Step>

        {/* what testing said — the correction arrives from outside */}
        <Step tag="what testing said">
          <div className={s.coreGrid}>
            <p className={`${s.deepProse} ${s.up}`}>
              We took three versions through critique, a client check-in, and one round of think-aloud
              testing (TAP) with parents our client connected us with, and changed direction based on
              what we heard.
            </p>
            <figure className={`${s.tapFig} ${s.up}`} style={{ '--d': '160ms' }}>
              <img
                src="https://res.cloudinary.com/dc17mvdyv/image/upload/f_auto,q_auto,w_1300/v1782679668/UX_Interview.jpg"
                alt="A think-aloud walkthrough over Zoom, with two facilitators on the right and the parent tile blurred for privacy on the left."
                loading="lazy"
                draggable="false"
              />
              <figcaption className={s.cap}>
                A think-aloud (TAP) walkthrough over Zoom: parents talked through the wireframes so we
                could hear where the flow broke · parent blurred for privacy
              </figcaption>
            </figure>
          </div>
          <div className={s.flows}>
            {FLOWS.map((f) => (
              <div key={f.did} className={`${s.flow} ${s.up}`}>
                <p className={s.heard}>{`“${f.heard}”`}</p>
                <div className={s.thread}>
                  <p className={s.learned}>{f.learned}</p>
                  <span className={s.leader} aria-hidden="true" />
                </div>
                <p className={s.did}>{f.did}</p>
              </div>
            ))}
          </div>
        </Step>

        {/* what shipped — the resolution, named as decisions */}
        <Step tag="what shipped">
          <figure className={`${s.iaFig} ${s.iaFigWide} ${s.up}`}>
            <IaFinal />
            <figcaption className={s.cap}>
              ia-final · five tabs, a single add button at center, nothing to answer before beginning.
            </figcaption>
          </figure>
          <div className={s.moves}>
            <div className={`${s.move} ${s.up}`} style={{ '--d': '120ms' }}>
                <h3 className={s.moveName}>Open into the task</h3>
                <p className={s.moveText}>
                  Rather than layer features, we embedded customization and options inside a simple
                  core, always available in the nav bar: four features, each with room to go deeper.
                  If a parent never leaves the home page, they still get the use case they wanted most,
                  a timeline of their documentation. The rest can be explored another time.
                </p>
              </div>
              <div className={`${s.move} ${s.up}`} style={{ '--d': '220ms' }}>
                <h3 className={s.moveName}>Unify, don’t fragment</h3>
                <p className={s.moveText}>
                  We also stopped splitting the data up. The brief asked for four kinds of capture,
                  medical, contextual, narrative, and feelings, and instead of giving each its own
                  corner we put them on one timeline you tag and filter, because earlier versions that
                  separated them tested as fragmented and confusing.
                </p>
              </div>
            </div>
          <figure className={`${s.stripFig} ${s.up}`} style={{ '--d': '200ms' }}>
            <div className={s.stripStack}>
              <img src="/images/birthstory/evolution/flows/onboarding-v1.png" alt="The version 1 onboarding flow: a walkthrough that asks the parent questions before any entry." loading="lazy" draggable="false" />
              <img src="/images/birthstory/evolution/flows/onboarding-v2.png" alt="The version 2 onboarding flow: a welcome screen and a swipe-through tour of four features." loading="lazy" draggable="false" />
              <img src="/images/birthstory/evolution/flows/onboarding-v3.png" alt="The version 3 onboarding flow: straight into the timeline, nothing to answer first." loading="lazy" draggable="false" />
            </div>
            <figcaption className={s.cap}>
              The onboarding flow across the three rounds, top to bottom: each version asks less
              before the first entry.
            </figcaption>
          </figure>
        </Step>

        {/* the honest edge — what a six-week studio can't know */}
        <Step tag="what I couldn’t test">
          <p className={`${s.deepProse} ${s.frictionText} ${s.up}`}>
            A six-week studio can’t show whether parents come back weeks later, once the fog has
            lifted. That return is the whole promise of the product, so it’s the part I most wish I
            had been able to test.
          </p>
        </Step>
      </Frame>

      {/* ── 10 · THE ARCHIVE — every screen of every round, stated crisply ── */}
      <Frame id="rounds-archive" tone="white" kicker="10 · Three rounds, every screen" className={s.deep} threshold={0.06}>
        <div className={s.sheet}>
          {SHEET.map((row) => (
            <div key={row.label} className={`${s.sheetRow} ${s.up}`}>
              <div className={s.sheetIntro}>
                <p className={s.roundWhen}>{row.label}</p>
                <p className={s.sheetChange}>{row.change}</p>
              </div>
              <div className={s.thumbs}>
                {row.ids.map((id, i) => (
                  <img
                    key={id}
                    className={s.thumb}
                    src={`/images/birthstory/evolution/screens/${id}.png`}
                    alt={`${row.label.split(' · ')[0]} wireframe, screen ${i + 1} of ${row.ids.length}.`}
                    loading="lazy"
                    draggable="false"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Frame>

      {/* ── 11 · THE WORDS — the rename, before and after ── */}
      <Frame id="words" kicker="11 · The words" className={s.deep}>
        <h2 className={`${s.claim} ${s.claimLong} ${s.voice} ${s.up}`} style={{ '--d': '80ms' }}>
          The copy is trauma-informed without <b>assuming</b> trauma.
        </h2>
        <div className={s.wordsGrid}>
          <div className={s.coreCopy}>
            <p className={`${s.deepProse} ${s.up}`}>
              Because I knew births could be traumatic, I wrote the first copy in a careful,
              trauma-informed tone, and a parent I interviewed showed me I had gone too far. She
              didn’t connect with the word “reclaim,” and it made me realize I was leaning on the
              hard parts, missing how much a birth can also be about connection. I didn’t want the
              words to decide the experience for anyone.
            </p>
            <p className={`${s.deepProse} ${s.up}`} style={{ '--d': '100ms' }}>
              So I rewrote toward connection and left room for people to bring their own tone. Same
              for “Find strength &amp; support” as a feature name: it positioned the new mother in a
              negative light, when in fact most are empowered by doing an amazing and hard thing. It
              became the Care Pod.
            </p>
            <p className={`${s.deepProse} ${s.up}`} style={{ '--d': '200ms' }}>
              The next thing I’d do is balance the reflection prompts so they reach for joy as
              readily as they make room for distress.
            </p>
          </div>
          <div className={s.wordsPanel}>
            <div className={`${s.saidWrap} ${s.up}`} style={{ '--d': '160ms' }}>
              <p className={s.stepTag}>a parent said</p>
              <p className={s.heard}>
                “Assuming there’s a trauma, you shouldn’t call it that. I appreciate the
                acknowledgement, but it feels like an implied negative.”
              </p>
            </div>
            <div className={`${s.revs} ${s.up}`} style={{ '--d': '280ms' }}>
              <p className={s.stepTag}>the rewrites</p>
              <div className={s.rev}>
                <p className={s.revDraft}>“Reclaim your narrative.”</p>
                <span className={s.revArrow} aria-hidden="true">→</span>
                <p className={s.did}>“A space to make sense of it, in your own words.”</p>
              </div>
              <div className={s.rev}>
                <p className={s.revDraft}>“Find strength &amp; support”</p>
                <span className={s.revArrow} aria-hidden="true">→</span>
                <p className={s.did}>“Care Pod”</p>
              </div>
            </div>
          </div>
        </div>
      </Frame>

      {/* ── 12 · THE PITCH ── */}
      <Frame id="pitch" kicker="12 · The pitch" className={s.deep}>
        {/* the full client deck (Presentation, 22pp) embeds here once it's off
            the LaCie drive — the slot is designed, the asset isn't local yet */}
        <figure className={`${s.pitchFig} ${s.up}`}>
          <img
            src={cloudImg('IMG_3010', 2000)}
            alt="The studio's projector screen during the final presentation: the client joining over Zoom on the left, the class at their tables in the room tile on the right."
            loading="lazy"
            draggable="false"
          />
          <figcaption className={s.cap}>The final presentation: our client joined over Zoom.</figcaption>
        </figure>
      </Frame>
    </>
  )
}
