'use client'

import { useEffect, useRef, useState } from 'react'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import FeatureWall from '../FeatureWall'
import CarePodFlow from '../CarePodFlow'
import JournalFlow from '../JournalFlow'
import DocReveal from '../DocReveal'
import SearchReveal from '../SearchReveal'
import { IaV1, IaFinal } from '../IaDiagrams'
import { sys } from '../kit'
import s from './v2.module.css'

/* Birth Story V2 — the from-scratch rebuild (F13, her start-over mandate).
   A film strip of designed frames, one idea each; her verbatim words as claims,
   voices, and captions; the artifacts do the talking. The V1 draft is untouched
   at the parent route. Storyboard: BIRTHSTORY-VISUAL-SYSTEM.md §7. */

function useSeen(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, seen]
}

function Frame({ id, tone = 'paper', kicker, threshold = 0.18, className = '', children }) {
  const [ref, seen] = useSeen(threshold)
  return (
    <section ref={ref} id={id} className={`${s.frame} ${s[tone] || ''} ${seen ? s.in : ''} ${className}`}>
      <div className={s.inner}>
        {kicker && <p className={`${s.kicker} ${s.up}`}>{kicker}</p>}
        {children}
      </div>
    </section>
  )
}

function Phone({ src, alt, cap, capClass }) {
  return (
    <figure className={s.shot}>
      <span className={sys.phone} style={{ width: '100%' }}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={sys.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
      </span>
      {cap && <figcaption className={capClass || s.shotCap}>{cap}</figcaption>}
    </figure>
  )
}

/* F3 — the sister's verbatim over the full-bleed duotone */
function VoiceFrame() {
  const birth = birthPhoto('fog', 2400, { grayscale: true })
  const [ref, seen] = useSeen(0.3)
  return (
    <section ref={ref} className={`${s.frame} ${s.voiceFrame} ${seen ? s.in : ''}`}>
      <div className={s.voiceArt} aria-hidden="true"><img src={birth.src} alt="" loading="lazy" draggable="false" /></div>
      <div className={s.voiceScrim} aria-hidden="true" />
      <div className={s.voiceInner}>
        <blockquote className={`${s.voiceQuote} ${s.up}`}>
          “None of our births went according to plan and they were traumatizing, and it doesn’t get
          discussed enough.”
        </blockquote>
        <p className={`${s.voiceWho} ${s.up}`} style={{ '--d': '140ms' }}>From the family interviews · verbatim</p>
      </div>
      <p className={s.voiceByline}>Photo · {birth.byline} / Pexels</p>
    </section>
  )
}

export default function BirthStoryV2() {
  const feedingAlt = 'A mother holds her newborn skin to skin in a hospital bed, in teal-ink duotone.'
  return (
    <div className={s.v2}>
      {/* ── F2 · THE ASK ── */}
      <Frame id="brief" kicker="The brief · Week 1">
        <h2 className={`${s.claim} ${s.claimLong} ${s.up}`} style={{ '--d': '80ms' }}>
          Pitch a concept for Myana’s companion micro-app that helps parents <b>document and
          reflect</b> on their birth experience.
        </h2>
        <div className={s.stakes}>
          {[
            ['80%', 'of U.S. maternal deaths are preventable'],
            ['65%', 'happen after delivery'],
            ['3×', 'the risk for Black mothers'],
          ].map(([fig, label], i) => (
            <div key={fig} className={`${s.stake} ${s.up}`} style={{ '--d': `${160 + i * 110}ms` }}>
              <span className={s.stakeFig}>{fig}</span>
              <p className={s.stakeLabel}>{label}</p>
            </div>
          ))}
        </div>
        <p className={`${s.stakeSrc} ${s.up}`} style={{ '--d': '520ms' }}>A dangerous, under-supported window. Figures from the project brief.</p>
        <p className={`${s.askMeta} ${s.up}`} style={{ '--d': '600ms' }}>
          <span>Client · Myana, with researchers at the University of Pittsburgh</span>
          <span>Context · a 6-week graduate studio at Carnegie Mellon</span>
          <span>Build · concept; the prototypes on this page are working</span>
        </p>
      </Frame>

      {/* ── F3 · THE VOICE ── */}
      <VoiceFrame />

      {/* ── F4 · THE RESEARCH ── */}
      <Frame id="research" kicker="The research · Week 2">
        <h2 className={`${s.claim} ${s.claimLong} ${s.up}`} style={{ '--d': '80ms' }}>
          Capacity rises over time, so the app had to meet <b>three different moments</b>, not one.
        </h2>
        <p className={`${s.line} ${s.up}`} style={{ '--d': '160ms' }}>
          Before we built anything, I researched blogs and existing products and ran information
          interviews with family to get familiar with the subject: my three sisters, my mom, and my
          friend with a toddler.
        </p>
        <div className={s.researchGrid}>
          <figure className={`${s.chat} ${s.up}`} style={{ '--d': '220ms' }}>
            <figcaption className={s.chatHead}>The group call · what they asked for</figcaption>
            <p className={s.chatIn}>Less medical documentation. More photos, and an outline of what actually happened.</p>
            <p className={s.chatIn}>Recognition for doing something this amazing and this hard.</p>
            <p className={s.chatIn}>A space that doesn’t assume a “normal” birth: other people’s stories, resources.</p>
            <p className={s.chatNote}>their asks, summarized</p>
          </figure>
          <div className={s.moments}>
            {[
              ['Early, in the fog', 'Select-one answers, a few taps at a time.'],
              ['Later, once it lifts', 'Free-form journaling, at their own pace.'],
              ['In the end', 'A keepsake book of the whole story.'],
            ].map(([when, what], i) => (
              <div key={when} className={`${s.moment} ${s.up}`} style={{ '--d': `${300 + i * 120}ms` }}>
                <p className={s.momentWhen}>{when}</p>
                <p className={s.momentWhat}>{what}</p>
              </div>
            ))}
          </div>
        </div>
      </Frame>

      {/* ── F5 · HEARD → DID ── */}
      <Frame id="synthesis" tone="white" kicker="What we heard, what we did">
        <div className={s.flows}>
          {[
            {
              heard: 'Onboarding is nice, but too many buttons and options. Too many menus.',
              learned: 'Cognitive load was the enemy, not missing features.',
              did: 'Open straight into notes on a timeline; everything else a tap away.',
            },
            {
              heard: 'Why “reclaim”? Compassionate copy may be signaling a negative experience.',
              learned: 'The words shouldn’t decide the experience for anyone.',
              did: 'Care-centered copy; “Find strength & support” became the Care Pod.',
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
          ].map((r, i) => (
            <div key={r.heard} className={`${s.flow} ${s.up}`} style={{ '--d': `${i * 120}ms` }}>
              <p className={s.heard}>{`“${r.heard}”`}</p>
              <div className={s.thread}>
                <p className={s.learned}>{r.learned}</p>
                <span className={s.leader} aria-hidden="true" />
              </div>
              <p className={s.did}>{r.did}</p>
            </div>
          ))}
        </div>
      </Frame>

      {/* ── F6 · PRINCIPLES ── */}
      <Frame id="principles" kicker="Design principles">
        <ul className={s.principles}>
          {[
            {
              name: 'Compassionate, not clinical',
              why: 'A birth lives inside cold clinical systems; the tool that holds it shouldn’t feel like one.',
            },
            {
              name: 'Integrate facts and feelings',
              why: 'The brief split capture four ways, but a birth isn’t lived in parts, so one timeline holds them together.',
            },
            {
              name: 'Does not disorient',
              why: 'A parent recovering on little sleep can’t afford a maze.',
              taught: 'The principle didn’t change; testing taught me what disorienting really meant.',
            },
            {
              name: 'Trauma-informed, not trauma-assuming',
              why: 'Careful with pain, without deciding a parent’s experience for them.',
              taught: 'My first copy assumed trauma; a parent showed me the words shouldn’t choose the tone.',
            },
          ].map((p, i) => (
            <li key={p.name} className={`${s.principle} ${s.up}`} style={{ '--d': `${i * 110}ms` }}>
              <h3 className={s.principleName}>{p.name}</h3>
              <p className={s.principleWhy}>{p.why}</p>
              {p.taught && <p className={s.principleTaught}>{p.taught}</p>}
            </li>
          ))}
        </ul>
      </Frame>

      {/* ── F7 · THE TURN ── */}
      <Frame id="architecture" kicker="Information architecture · Week 3">
        <h2 className={`${s.claim} ${s.claimLong} ${s.up}`} style={{ '--d': '80ms' }}>
          New parents have limited capacity, which made the user flow <b>make-or-break</b>: it
          decides how a parent spends their few precious free moments.
        </h2>
        <div className={s.turnStage}>
          <figure className={`${s.diagram} ${s.up}`} style={{ '--d': '160ms' }}>
            <IaV1 />
            <figcaption className={s.diagramCap}>The first version: a branching questionnaire that asked conditional questions before any entry.</figcaption>
          </figure>
          <div className={`${s.turnStat} ${s.up}`} style={{ '--d': '260ms' }}>
            <span className={s.turnStem} aria-hidden="true" />
            <span className={s.turnFig}>4 → 0</span>
            <p className={s.turnLabel}>questions before the first entry</p>
            <span className={s.turnStem} aria-hidden="true" />
          </div>
          <figure className={`${s.diagram} ${s.up}`} style={{ '--d': '360ms' }}>
            <IaFinal />
            <figcaption className={s.diagramCap}>What shipped: five tabs, a single add button at center, nothing to answer before beginning.</figcaption>
          </figure>
        </div>
        <p className={`${s.shift} ${s.up}`} style={{ '--d': '440ms' }}>
          Think-aloud testing drove the most significant shift in our approach: from a sequenced
          entry to an <b>immediate</b> one, opening directly into notes on a timeline.
        </p>
        <div className={s.moves}>
          <div className={`${s.move} ${s.up}`} style={{ '--d': '520ms' }}>
            <h3 className={s.moveName}>Open into the task</h3>
            <p className={s.moveText}>
              Rather than layer features, we embedded customization inside a simple core. If a parent
              never leaves the home page, they still get the use case they wanted most: a timeline of
              their documentation.
            </p>
          </div>
          <div className={`${s.move} ${s.up}`} style={{ '--d': '620ms' }}>
            <h3 className={s.moveName}>Unify, don’t fragment</h3>
            <p className={s.moveText}>
              The brief asked for four kinds of capture. Instead of giving each its own corner we put
              them on one timeline you tag and filter, because versions that separated them tested as
              fragmented and confusing.
            </p>
          </div>
        </div>
      </Frame>

      {/* ── F8 · THREE ROUNDS ── */}
      <Frame id="iteration" kicker="Iteration · Weeks 3–5" className={s.roundsFrame}>
        <h2 className={`${s.claim} ${s.up}`} style={{ '--d': '80ms' }}>
          Each round made the app <b>simpler</b>.
        </h2>
        <div className={s.rounds}>
          <div className={`${s.round} ${s.up}`}>
            <div className={s.roundCopy}>
              <p className={s.roundWhen}>Version 1 · Week 3</p>
              <p className={s.roundChange}>
                The first version tried to do everything, with a tool for every situation and
                sub-menus inside menus. It was disorienting.
              </p>
              <p className={s.roundVoice}>Too many menus, too many buttons; the first build tried to do everything.</p>
            </div>
            <div className={s.roundStage}>
              <div className={s.shotOne}>
                <Phone src="/images/birthstory/evolution/screens/v1-3.png" alt="V1: reflect, document, and connect menus stacked on one screen — the build that did too much." cap="V1 · the build that did too much" />
              </div>
            </div>
          </div>
          <div className={`${s.round} ${s.up}`}>
            <div className={s.roundCopy}>
              <p className={s.roundWhen}>Version 2 · Week 4</p>
              <p className={s.roundChange}>
                For the second version I consolidated everything into one filterable notes section and
                narrowed the flow to two actions. Clearer, but still too many options, and the copy
                drew a flag too.
              </p>
              <p className={s.roundVoice}>The word ‘reclaim’ made the app feel braced for trauma.</p>
            </div>
            <div className={s.roundStage}>
              <Phone src="/images/birthstory/evolution/screens/v2-1.png" alt="V2 splash screen." cap="V2 splash" />
              <Phone src="/images/birthstory/evolution/screens/v2-2.png" alt="V2 welcome screen." cap="V2 welcome" />
              <Phone src="/images/birthstory/evolution/screens/v2-3.png" alt="V2: one consolidated menu." cap="one menu" />
            </div>
          </div>
          <div className={`${s.round} ${s.up}`}>
            <div className={s.roundCopy}>
              <p className={s.roundWhen}>Version 3 · Week 5</p>
              <p className={s.roundChange}>
                By the third version I kept only the features parents came back to, and left room to
                go deeper.
              </p>
            </div>
            <div className={s.roundStage}>
              <Phone src="/images/birthstory/evolution/screens/v3-2.png" alt="V3 final home: notes on a timeline." cap="final home" />
              <Phone src="/images/birthstory/evolution/screens/v3-4.png" alt="V3 Birth Story Book screen." cap="Birth Story Book" />
              <Phone src="/images/birthstory/evolution/screens/v3-5.png" alt="V3 search screen." cap="search" />
            </div>
          </div>
        </div>
        <p className={`${s.calm} ${s.up}`}>Watching the versions in order, you can see the app calm down.</p>
      </Frame>

      {/* the crit wall — full-bleed, true color: the red marker is the evidence */}
      <figure className={s.wallBleed}>
        <img
          src={cloudImg('class_notes', 2800, { chain: ['e_brightness:48', 'e_contrast:level_16;type_sigmoidal', 'ar_16:9,c_auto'] })}
          alt="A whiteboard from the final review: printed app screens taped up in two columns labeled Gradient and Color Block, covered in red and orange handwritten feedback."
          loading="lazy"
          draggable="false"
        />
        <figcaption className={s.wallCap}>
          The final review: every screen printed and marked up, with the gradient-versus-color-block
          decision worked out in red.
        </figcaption>
      </figure>

      {/* ── F9 · THE PRODUCT — the sustained teal world ── */}
      <Frame id="product" tone="dark" kicker="The product · working prototypes" className={s.productFrame} threshold={0.06}>
        <h2 className={`${s.claim} ${s.up}`} style={{ '--d': '80ms' }}>
          Birth is unpredictable, so the app is deliberately <b>simple</b>.
        </h2>
        <p className={`${s.line} ${s.up}`} style={{ '--d': '160ms' }}>
          None of the screens below are flat mockups: I rebuilt the wireframes as working prototypes,
          so what you’re seeing is the real interaction.
        </p>

        <div className={`${s.prio} ${s.up}`} style={{ '--d': '240ms' }}>
          <p className={s.prioLine}>The research kept telling me to leave things out.</p>
          <span className={`${s.chip} ${s.chipKept}`}><span className={s.chipTag}>kept</span>sharing</span>
          <span className={`${s.chip} ${s.chipKept}`}><span className={s.chipTag}>kept</span>keepsake book</span>
          <span className={`${s.chip} ${s.chipAdded}`}><span className={s.chipTag}>added</span>search</span>
          <span className={`${s.chip} ${s.chipCut}`}>trackers</span>
          <span className={`${s.chip} ${s.chipCut}`}>birth plan</span>
        </div>

        <div className={`${s.wallWrap} ${s.up}`} style={{ '--d': '320ms' }}>
          <FeatureWall tone="dark" />
        </div>

        <div className={s.feature}>
          <div className={s.featureCopy}>
            <h3 className={`${s.featureName} ${s.up}`}>Documentation</h3>
            <p className={`${s.featureClaim} ${s.up}`} style={{ '--d': '90ms' }}>Calm by default: entries stay closed until you open one.</p>
            <p className={`${s.featureLine} ${s.up}`} style={{ '--d': '170ms' }}>
              Parents told me they wanted to land on the main task, so that’s what the app does. Even
              if nothing else gets used, there’s a timeline of whatever they or a loved one managed to
              add.
            </p>
          </div>
          <div className={`${s.featureMedia} ${s.up}`} style={{ '--d': '200ms' }}>
            <DocReveal />
          </div>
        </div>

        <div className={`${s.feature} ${s.featureFlip}`}>
          <div className={s.featureCopy}>
            <h3 className={`${s.featureName} ${s.up}`}>Care Pod</h3>
            <p className={`${s.featureClaim} ${s.up}`} style={{ '--d': '90ms' }}>You don’t carry it: one person you designate sends the updates.</p>
            <p className={`${s.featureLine} ${s.up}`} style={{ '--d': '170ms' }}>
              The idea came out of a single interview. A parent told me someone in her circle
              remembered a detail about her child’s birth that she had lost, and wished she’d asked
              everyone to add what they remembered while it was fresh. Loved ones reply, and all of it
              saves into the story.
            </p>
          </div>
          <div className={`${s.featureMedia} ${s.up}`} style={{ '--d': '200ms' }}>
            <CarePodFlow />
          </div>
        </div>

        <div className={s.feature}>
          <div className={s.featureCopy}>
            <h3 className={`${s.featureName} ${s.up}`}>Reflection</h3>
            <p className={`${s.featureClaim} ${s.up}`} style={{ '--d': '90ms' }}>No blank page: the deck deals a prompt, and you tag how it felt.</p>
            <p className={`${s.featureLine} ${s.up}`} style={{ '--d': '170ms' }}>
              Every parent wanted to reflect, but the ones who don’t already journal often don’t know
              where to start. So the journal hands them gentle prompts: a letter to a past self, the
              needs that are hard to name, the senses worth keeping.
            </p>
          </div>
          <div className={`${s.featureMedia} ${s.up}`} style={{ '--d': '200ms' }}>
            <JournalFlow />
          </div>
        </div>

        <div className={`${s.feature} ${s.featureFlip}`}>
          <div className={s.featureCopy}>
            <h3 className={`${s.featureName} ${s.up}`}>Search</h3>
            <p className={`${s.featureClaim} ${s.up}`} style={{ '--d': '90ms' }}>A swipe from anywhere; filter by feeling.</p>
            <p className={`${s.featureLine} ${s.up}`} style={{ '--d': '170ms' }}>
              This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone
              digging through the whole app to find one memory.
            </p>
          </div>
          <div className={`${s.featureMedia} ${s.up}`} style={{ '--d': '200ms' }}>
            <SearchReveal />
          </div>
        </div>

        <div className={s.feature}>
          <div className={s.featureCopy}>
            <h3 className={`${s.featureName} ${s.up}`}>The Book</h3>
            <p className={`${s.featureClaim} ${s.up}`} style={{ '--d': '90ms' }}>It can leave the app: a printed book, or a free PDF.</p>
            <p className={`${s.featureLine} ${s.up}`} style={{ '--d': '170ms' }}>
              We took the book seriously the moment a parent told me she wouldn’t trust an app with
              something this precious unless she knew it couldn’t disappear.
            </p>
          </div>
          <div className={`${s.featureMedia} ${s.up}`} style={{ '--d': '200ms' }}>
            <div className={s.bookRow}>
              <Phone src="/images/birthstory/bs-book-order.png" alt="The Birth Story Book screen: order a printed keepsake or download a PDF." cap="Order a keepsake, or download a PDF." capClass={`${s.shotCap} ${s.bookCap}`} />
              <Phone src="/images/birthstory/bs-book-curate.png" alt="A timeline of entries with Drag Content to Curate Your Story, open to collaborators." cap="Curate from what’s already there, together." capClass={`${s.shotCap} ${s.bookCap}`} />
            </div>
          </div>
        </div>
      </Frame>

      {/* ── F10 · THE IDENTITY ── */}
      <Frame id="identity" kicker="The identity · Week 5">
        <h2 className={`${s.claim} ${s.up}`} style={{ '--d': '80ms' }}>
          Calm, emotionally intelligent, and deliberately <b>non-clinical</b>.
        </h2>
        <div className={`${s.wordmarkBand} ${s.up}`} style={{ '--d': '180ms' }}>
          <img src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story wordmark, set in Terfens." width="267" height="54" draggable="false" />
          <p className={s.gradStops}><span>blush</span><span>→</span><span>periwinkle</span><span>→</span><span>teal</span></p>
        </div>
        <div className={s.identityGrid}>
          <div>
            <p className={`${s.identityWhy} ${s.up}`} style={{ '--d': '260ms' }}>
              “I chose a lighter pink into a darker teal because it let me hold two things at once: a
              gender spectrum, and the emotional range of the day itself.”
            </p>
            <div className={`${s.typeRow} ${s.up}`} style={{ '--d': '340ms' }}>
              <span><b>Terfens</b> titles</span>
              <span><b>Gotham</b> everything else</span>
            </div>
          </div>
          <figure className={`${s.board} ${s.up}`} style={{ '--d': '300ms' }}>
            <img
              src="/images/birthstory/moodboard.png"
              alt="The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books."
              loading="lazy"
              draggable="false"
            />
            <figcaption className={s.cap}>
              O’Keeffe’s organic forms, lunar calm, and the orbiting-circle apps that became the Care Pod.
            </figcaption>
          </figure>
        </div>
      </Frame>

      {/* ── F11 · THE OUTCOME ── */}
      <Frame id="outcome" kicker="The outcome · Week 6">
        <blockquote className={`${s.outcomeQuote} ${s.up}`} style={{ '--d': '80ms' }}>
          “I wish this could be real right now!”
        </blockquote>
        <p className={`${s.outcomeWho} ${s.up}`} style={{ '--d': '160ms' }}>Sarah Burns, MSW, LSW · client</p>
        <div className={s.outcomeGrid}>
          <div>
            <h2 className={`${s.claim} ${s.claimLong} ${s.up}`} style={{ '--d': '220ms', fontSize: 'clamp(1.5rem, 1.2rem + 1.3vw, 2.3rem)' }}>
              The client loved it, and it still isn’t getting built.
            </h2>
            <p className={`${s.line} ${s.up}`} style={{ '--d': '300ms' }}>
              When we presented, the client had almost nothing to change. There’s no real signal the
              app will get built: Myana sponsored the project because it might inform future versions
              of their product, and the pitch was probably as much for us as for them, but it gave the
              concept a real starting point.
            </p>
          </div>
          <figure className={`${s.outcomeFig} ${s.up}`} style={{ '--d': '260ms' }}>
            <img
              src={cloudImg('IMG_3012', 1600)}
              alt="The studio team standing together in front of the projector screen, with our client Sarah Burns smiling on the video call behind them."
              loading="lazy"
              draggable="false"
            />
            <figcaption className={s.cap}>The team and our client, Sarah Burns, at the final review.</figcaption>
          </figure>
        </div>
      </Frame>

      {/* ── F12 · THE CODA ── */}
      <Frame id="close" tone="dark">
        <div className={s.codaInner}>
          <p className={`${s.codaLine} ${s.up}`}>
            I’m a big dreamer. I try to do everything first, then narrow and narrow until I get to
            the heart of it.
          </p>
          <p className={`${s.codaSub} ${s.up}`} style={{ '--d': '120ms' }}>
            Designing something and then being able to build it myself is the direction I’m headed.
            The working prototypes on this page are that proof.
          </p>
          <div className={`${s.codaActions} ${s.up}`} style={{ '--d': '220ms' }}>
            <a className={s.codaCta} href="mailto:lorinanderberg1@gmail.com">Get in touch</a>
            <a className={s.codaAlt} href="/">See more work</a>
          </div>
        </div>
        <p className={s.colophon}>
          Participant quotes appear with their consent; names are withheld. Figma for wireframes and
          visual design · Claude Code for the working prototypes on this page · icons from SVG Repo ·
          photography by Saul Siguenza, Craig Adderley, and Jonathan Borba via Pexels · studio and
          review photos, CMU IXD Studio.
        </p>
      </Frame>
    </div>
  )
}
