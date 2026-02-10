'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '@/styles/project.module.css'

export default function GroundswellPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [showTimeline, setShowTimeline] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentOutcomeImage, setCurrentOutcomeImage] = useState(0)
  const [lightboxImage, setLightboxImage] = useState(null)
  // Component gallery states
  const [currentCtbImage, setCurrentCtbImage] = useState(0)
  const [currentPodImage, setCurrentPodImage] = useState(0)
  const [currentArtWallImage, setCurrentArtWallImage] = useState(0)
  const heroRef = useRef(null)
  
  // Consistent arrow button style (outline only, matching image 5)
  const arrowButtonStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    border: '2px solid var(--project-accent)',
    backgroundColor: 'transparent',
    color: 'var(--project-accent)',
    cursor: 'pointer',
    fontSize: '1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    flexShrink: 0
  }
  
  // Outcome gallery images
  const outcomeImages = [
    { src: '/images/groundswell/gs-install-01.jpg', alt: 'Groundswell installation at UPMC - view 1' },
    { src: '/images/groundswell/gs-install-02.jpg', alt: 'Groundswell installation at UPMC - view 2' },
    { src: '/images/groundswell/gs-install-03.jpg', alt: 'Groundswell installation at UPMC - view 3' },
    { src: '/images/groundswell/gs-install-04.jpg', alt: 'Groundswell installation at UPMC - view 4' },
    { src: '/images/groundswell/gs-install-05.jpg', alt: 'Groundswell installation at UPMC - view 5' },
  ]
  
  // CTB Email gallery images
  const ctbImages = [
    { src: '/images/groundswell/gs-ctb-detail-01.jpg', alt: 'Ceased to Breathe email redesign - full view' },
    { src: '/images/groundswell/gs-ctb-detail-02.jpg', alt: 'Ceased to Breathe email redesign - detail' },
    { src: '/images/groundswell/gs-ctb-detail-03.jpg', alt: 'Ceased to Breathe email redesign - mockup' },
  ]
  
  // Pod gallery images
  const podImages = [
    { src: '/images/groundswell/gs-pod-detail-01.jpg', alt: 'Groundswell restorative pod - exterior view' },
    { src: '/images/groundswell/gs-pod-detail-02.jpg', alt: 'Groundswell restorative pod - interior view' },
    { src: '/images/groundswell/gs-pod-detail-03.jpg', alt: 'Groundswell restorative pod - detail' },
  ]
  
  // Art Wall gallery images  
  const artWallImages = [
    { src: '/images/groundswell/gs-artwall-detail-01.jpg', alt: 'Groundswell Garden art wall - full view' },
    { src: '/images/groundswell/gs-artwall-detail-02.jpg', alt: 'Groundswell Garden art wall - detail' },
    { src: '/images/groundswell/gs-artwall-detail-03.jpg', alt: 'Groundswell Garden art wall - close-up' },
  ]
  
  const nextOutcomeImage = () => setCurrentOutcomeImage((prev) => (prev + 1) % outcomeImages.length)
  const prevOutcomeImage = () => setCurrentOutcomeImage((prev) => (prev - 1 + outcomeImages.length) % outcomeImages.length)
  
  const nextCtbImage = () => setCurrentCtbImage((prev) => (prev + 1) % ctbImages.length)
  const prevCtbImage = () => setCurrentCtbImage((prev) => (prev - 1 + ctbImages.length) % ctbImages.length)
  
  const nextPodImage = () => setCurrentPodImage((prev) => (prev + 1) % podImages.length)
  const prevPodImage = () => setCurrentPodImage((prev) => (prev - 1 + podImages.length) % podImages.length)
  
  const nextArtWallImage = () => setCurrentArtWallImage((prev) => (prev + 1) % artWallImages.length)
  const prevArtWallImage = () => setCurrentArtWallImage((prev) => (prev - 1 + artWallImages.length) % artWallImages.length)
  
  const timelineSections = [
    { id: 'context', label: 'Context' },
    { id: 'process', label: 'Process' },
    { id: 'synthesis', label: 'Synthesis' },
    { id: 'impact', label: 'Impact' },
  ]
  
  const projectColors = {
    '--project-accent': '#554D65',
    '--project-accent-light': '#F8EBE5',
    '--project-accent-text': '#554D65',
  }
  
  const cards = [
    { id: 1, name: 'welcome' }, { id: 2, name: 'embrace' }, { id: 3, name: 'numb' },
    { id: 4, name: 'present' }, { id: 5, name: 'angry' }, { id: 6, name: 'grateful' },
    { id: 7, name: 'exhausted' }, { id: 8, name: 'joyful' }, { id: 9, name: 'invisible' },
    { id: 10, name: 'valued' }, { id: 11, name: 'heartbroken' }, { id: 12, name: 'connected' },
    { id: 13, name: 'vulnerable' }, { id: 14, name: 'hopeful' }, { id: 15, name: 'thankyou' },
  ]

  const participantQuotes = [
    { 
      quote: "I feel trapped.", 
      interpretation: "There is no way out. If I leave my patients I will feel guilty. If I leave my workers in this mess I will feel guilty. When someone leaves, people are jealous of them for getting out." 
    },
    { 
      quote: "What mental health?", 
      interpretation: "There are zero benefits for staff mental health. Hardly anyone uses the EAP. I would use a meditation app if it was provided." 
    },
    { 
      quote: "I've given up on trying to change things.", 
      interpretation: "Managers are essentially powerless over real change which needs funding and policy change. Why can't we find the budget for a relief nurse?" 
    },
    { 
      quote: "There is no time to grieve.", 
      interpretation: "Once someone passes there is no time to grieve the loss before another person comes in. We are trying to find ways to share but nothing is really working." 
    },
    { 
      quote: "I was not prepared for this.", 
      interpretation: "No one officially trained me on the emotional trauma that this job causes. I'm doing the work of a therapist and social worker, losing people daily." 
    },
    { 
      quote: "I can't turn it off.", 
      interpretation: "Even on my days off, I keep checking Teams to stay updated. I worry about my patients when I am at home. I am so exhausted." 
    }
  ]

  const validationQuotes = [
    "It's remarkable what 10 minutes can do...",
    "As soon as I stepped inside, I almost teared up. You're not always aware of how frazzled you are until you stop.",
    "You get to experience time differently in there. Be in a flow. Be with yourself. Just be here now. And that was a huge gift.",
    "I've worked in the trauma field, and I work with physicians...everyone needs one of these.",
    "You don't have to wait until the end of the day to refresh, but you can have micro-resets in-between."
  ]

  const nextCard = () => { setIsFlipped(false); setTimeout(() => setCurrentCard((prev) => (prev + 1) % cards.length), 150) }
  const prevCard = () => { setIsFlipped(false); setTimeout(() => setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length), 150) }
  const toggleFlip = () => setIsFlipped(!isFlipped)

  // SAFER IntersectionObserver for hero
  useEffect(() => {
    const currentHero = heroRef.current
    if (!currentHero) return
    
    const heroObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setShowTimeline(!entries[0].isIntersecting)
        }
      },
      { threshold: 0.1 }
    )
    
    heroObserver.observe(currentHero)
    
    return () => {
      heroObserver.disconnect()
    }
  }, [])

  // SAFER IntersectionObserver for sections
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry && entry.isIntersecting && entry.target) {
            const index = timelineSections.findIndex(s => s.id === entry.target.id)
            if (index !== -1) setActiveSection(index)
          }
        })
      },
      { threshold: 0.3 }
    )
    
    const observedElements = []
    timelineSections.forEach(section => {
      const el = document.getElementById(section.id)
      if (el) {
        sectionObserver.observe(el)
        observedElements.push(el)
      }
    })
    
    return () => {
      sectionObserver.disconnect()
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div style={projectColors}>
      
      {/* STICKY TIMELINE */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: 'rgba(85, 77, 101, 0.96)', backdropFilter: 'blur(8px)',
        transform: showTimeline ? 'translateY(0)' : 'translateY(-100%)',
        opacity: showTimeline ? 1 : 0, transition: 'transform 0.4s ease, opacity 0.4s ease',
        pointerEvents: showTimeline ? 'auto' : 'none'
      }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '40px', right: '40px', height: '2px', backgroundColor: 'rgba(248, 235, 229, 0.25)', transform: 'translateY(-50%)', zIndex: 0 }} />
          {activeSection > 0 && (
            <div style={{ position: 'absolute', top: '50%', left: '40px', width: `calc(${(activeSection / (timelineSections.length - 1)) * 100}% - 40px)`, height: '2px', backgroundColor: 'var(--project-accent-light)', transform: 'translateY(-50%)', transition: 'width 0.3s ease', zIndex: 1 }} />
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 2 }}>
            {timelineSections.map((section, index) => (
              <button key={section.id} onClick={() => scrollToSection(section.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: index <= activeSection ? 'var(--project-accent-light)' : 'transparent', border: '2px solid var(--project-accent-light)', transform: index === activeSection ? 'scale(1.3)' : 'scale(1)', transition: 'all 0.3s ease' }} />
                <span style={{ fontSize: '0.7rem', color: index === activeSection ? 'var(--project-accent-light)' : 'rgba(248, 235, 229, 0.7)', fontWeight: index === activeSection ? '600' : '400', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <header 
        ref={heroRef} 
        style={{ 
          minHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          position: 'relative',
          backgroundImage: 'url(/images/groundswell/gs-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: 'var(--space-xl) var(--space-md)'
        }}
      >
        {/* Purple gradient overlay - transparent top, solid bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(89,79,79,0.15) 0%, rgba(89,79,79,0.4) 40%, rgba(89,79,79,0.8) 100%)',
          pointerEvents: 'none'
        }} />
        
        {/* All content centered */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(3.5rem, 12vw, 6rem)', 
            fontWeight: 400,
            color: 'var(--project-accent-light)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            Groundswell
          </h1>
          
          {/* Subtitle */}
          <p style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
            fontStyle: 'italic',
            color: 'var(--project-accent-light)',
            marginBottom: '0.5rem'
          }}>
            Making Space to Restore, Together
          </p>
          
          {/* Descriptor */}
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', 
            color: 'var(--project-accent-light)',
            opacity: 0.85,
            marginBottom: '1.5rem'
          }}>
            A Design Ecology for Staff Well-Being
          </p>
          
          {/* Tags - high visibility on photo background */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Co-Production', 'Healthcare', 'Co-Design'].map(tag => (
              <span key={tag} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: '#554D65',
                backgroundColor: 'rgba(255,255,255,0.92)',
                padding: '0.6rem 1.25rem',
                borderRadius: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Project Details */}
      <div className={styles.sectionDark} style={{ padding: 'var(--space-md) var(--container-padding)' }}>
        <div className={styles.sectionContentWide}>
          <div className={styles.detailsBar}>
            {[
              { label: 'Client', value: 'UPMC Magee-Womens Hospital' },
              { label: 'Duration', value: '15 weeks + ongoing' },
              { label: 'Status', value: 'Pilot Study (12 months)' },
              { label: 'Funding', value: 'UPMC Grant + $30k donations' }
            ].map(item => (<div key={item.label}><p className={styles.detailLabel}>{item.label}</p><p className={styles.detailValue}>{item.value}</p></div>))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <section className={styles.sectionLight} style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video 
            src="/video/groundswell/gs-walkthrough.mp4" 
            autoPlay
            loop
            muted
            playsInline
            poster="/images/groundswell/gs-video-poster.jpg"
            style={{ 
              width: '100%', 
              maxWidth: '400px', 
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ==================== PHASE 1: CONTEXT ==================== */}
      <div id="context" className={styles.phaseDivider}>
        <h2 className={styles.phaseTitle}>Context</h2>
        <p className={styles.phaseIntro}>
          Gynecologic oncology staff face chronic compounded grief from repeated patient loss, yet have no structured support for processing these experiences. We partnered with UPMC Magee-Womens Hospital to understand this gap — the people navigating it, the systems perpetuating it, and the tensions that make sustainable care so difficult.
        </p>
      </div>

      {/* The Work */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>The Work</h2>
          <p className={styles.bodyText}>
            Groundswell is a grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital.
          </p>
        </div>
        <div className={styles.sectionContentWide} style={{ marginTop: 'var(--space-md)' }}>
          <img 
            src="/images/groundswell/gs-values-diagram.svg" 
            alt="Groundswell core values: Humanity, Compassion, Together, and Normalcy shown as four interconnected circles"
            style={{ width: '100%', marginBottom: 'var(--space-lg)', display: 'block' }}
          />
          <div className={styles.cardGrid2}>
            {[
              { title: 'Ceased to Breathe Email Redesign', desc: 'Updated patient death notification with compassionate visuals and language that acknowledges the impact of patient loss.', img: 'gs-ctb-email.jpg' },
              { title: 'Groundswell Restorative Pod', desc: 'Restorative space for emotional decompression through mindfulness activities like guided meditation.', img: 'gs-pod.jpg' },
              { title: 'Groundswell Reflection Cards', desc: 'Guided reflection cards that help staff build a self-care practice through emotional validation and introductory exercises.', img: 'gs-cards.jpg' },
              { title: 'Groundswell Garden Community Art Wall', desc: 'Community art wall that invites participation through anonymous shared emotional expression.', img: 'gs-artwall.jpg' }
            ].map((c, i) => (
              <div key={i} style={{ backgroundColor: 'var(--project-accent)', borderRadius: '8px', overflow: 'hidden' }}>
                <img 
                  src={`/images/groundswell/${c.img}`}
                  alt={c.title}
                  style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }}
                />
                <div style={{ padding: 'var(--space-sm)' }}>
                  <h3 className={styles.cardTitleLight}>{c.title}</h3>
                  <p className={styles.cardDescriptionLight}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== THE ECOSYSTEM ==================== */}
      <section className={styles.sectionDark}>
        <div className={styles.sectionContent} style={{ textAlign: 'center' }}>
          <h2 className={styles.sectionHeadingLight}>The Ecosystem</h2>
          <p className={styles.bodyTextLight}>
            Designing sustainable interventions within complex systems demands rigorous research, meaningful relationships, and genuine reciprocity. Through communication, creativity, and connection, Groundswell reframes burnout from an individual failure to an institutional flaw.
          </p>
        </div>
        <div className={styles.sectionContentWide} style={{ marginTop: 'var(--space-lg)' }}>
          <img 
            src="/images/groundswell/gs-ecosystem-diagram.svg" 
            alt="Groundswell ecosystem diagram showing how patient loss triggers the support flow: Ceased to Breathe email leads to Restorative Pod, Reflection Cards, and Community Art Wall"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </section>

      {/* Design Challenge */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Design Challenge</h2>
          <p className={styles.leadText} style={{ fontStyle: 'italic', marginBottom: 'var(--space-md)' }}>
            How might we create supportive environments tailored for the well-being of healthcare staff, enabling them to openly and safely discuss and express concerns such as burnout, compassion fatigue, the emotional toll of patient deaths, and the increasing frustration arising from administrative tasks overshadowing patient care?
          </p>
          <p className={styles.bodyText}>
            Named for water that rises naturally from deep within the earth, Groundswell emerges directly from the efforts and voices of healthcare workers themselves while introducing approachable resources that acknowledge the emotional complexities of oncology care. This comprehensive initiative recognizes that the most meaningful support emerges from within the care community itself, addressing the need for structured emotional processing interventions in high-mortality settings.
          </p>
        </div>
      </section>

      {/* The Tension */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>The Tension</h2>
          
          <blockquote style={{ 
            borderLeft: '4px solid var(--project-accent)', 
            paddingLeft: 'var(--space-md)',
            margin: 'var(--space-md) 0'
          }}>
            <p className={styles.pullQuote} style={{ marginBottom: 'var(--space-xs)' }}>
              "A special person can do this work forever, a good person can do it for a little while, most people couldn't do it for a day."
            </p>
            <cite className={styles.quoteAttribution}>— Oncology Staff</cite>
          </blockquote>
          
          <p className={styles.bodyText} style={{ fontStyle: 'italic', marginTop: 'var(--space-md)' }}>
            The system preys on our compassion. They know we care about our work more than we do our own well-being. They know we will stay until we simply cannot do it anymore. We can't leave our patients.
          </p>
        </div>
      </section>

      {/* The Void */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>The Void</h2>
          <p className={styles.bodyText}>
            While patient-centered care aims to improve health outcomes, it often neglects the well-being of healthcare workers. In a profit-driven, hierarchical system that treats staff as disposable, the intense focus on patients comes at the cost of worker support, leading to burnout, poor recognition, and a toxic workplace culture. This imbalance ultimately undermines the quality of care for both patients and providers, highlighting the urgent need for a model that values healthcare workers as essential to sustainable, high-quality care.
          </p>
        </div>
      </section>

      {/* ==================== PHASE 2: PROCESS ==================== */}
      <div id="process" className={styles.phaseDivider}>
        <h2 className={styles.phaseTitle}>Process</h2>
        <p className={styles.phaseIntro}>
          Over 15 weeks, we immersed ourselves in research — studying literature on healthcare worker well-being, shadowing staff at Magee, conducting interviews in person and remotely, and facilitating participatory workshops. Our methods were designed to surface the emotional truths that traditional research approaches often miss, creating space for healthcare workers to share experiences they rarely have the opportunity to process.
        </p>
      </div>

      {/* Research Methods */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Research Methods</h2>
          <p className={styles.bodyText}>
            Throughout our research we studied existing papers on the topic of healthcare worker well-being, shadowed and interviewed the staff at Magee both in person and on Zoom. We designed three participatory research activities that we presented to the staff and to doctors attending a Women in White Coats event.
          </p>
          <div className={styles.tagList} style={{ marginTop: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
            {['Literature Review', 'Fly-on-the-Wall Observation', 'Observational Interviews', 'Participatory Workshops', 'Tetrahedron Analysis', 'Affinity Mapping'].map(method => (
              <span key={method} className={styles.tag}>{method}</span>
            ))}
          </div>
          <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <iframe style={{ border: 'none', width: '100%', height: '500px' }} src="https://embed.figma.com/design/qmXOejgmdOtExNJVkXRvT8/Groundswell-Synthesis?node-id=0-1&embed-host=share" allowFullScreen title="Groundswell Synthesis Board" />
          </div>
          <p className={styles.bodyTextSmall} style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--color-text-light)', marginTop: 'var(--space-sm)' }}>
            Interactive synthesis board — scroll and zoom to explore
          </p>
        </div>
      </section>

      {/* Participatory Workshops */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Participatory Workshops</h2>
          <p className={styles.bodyText}>
            We designed multiple participatory workshops to better understand the needs of healthcare workers. We set our intentions as a team to create a solution that felt rooted in the research and would achieve lasting change without extra burden on staff. We integrated our nature-based motif into our generative workshops.
          </p>
          
          {/* Grief Workshop */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Grief Workshop at Magee</h3>
            <p className={styles.bodyText}>
              We facilitated a conversation on the emotional weight of grief in the oncology workplace, creating space for staff to reflect, share, and collaboratively explore ways to support one another. Through a grounding breathing exercise and scenario-based discussions, participants identified what they would need to hear and experience when coping with patient loss. The session culminated in a voting exercise to highlight the most impactful solutions.
            </p>
            
            <blockquote style={{ 
              borderLeft: '3px solid var(--project-accent)', 
              paddingLeft: 'var(--space-md)',
              margin: 'var(--space-md) 0',
              fontStyle: 'italic'
            }}>
              <p className={styles.bodyText} style={{ marginBottom: 'var(--space-xs)' }}>
                "If it feels safe and comfortable to you, we invite you to put your hand on your heart and close your eyes, drop into your body and take a deep breath... Let's take 3 minutes to breathe and be softly thinking about what you might need to hear, receive, or have taken off your plate to feel relief when the grief feels like too much to hold alone."
              </p>
              <cite className={styles.quoteAttribution}>— Facilitation script excerpt</cite>
            </blockquote>
            
            <p className={styles.bodyText}>
              We compiled a packet of journal prompts and somatic grounding exercises to continue the conversation and ensure participants felt supported after they left.
            </p>
            
            <p className={styles.bodyText}>
              Participants were engaged and open, with one stating, "We need more time with you guys!" — highlighting the need for dedicated space to process grief. What helped most was simple: acknowledgment of their pain and permission to feel.
            </p>
            
            {/* Grief Workshop Gallery - Arrows outside frame */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <button 
                onClick={() => document.getElementById('grief-gallery').scrollBy({ left: -300, behavior: 'smooth' })}
                style={arrowButtonStyle}
                aria-label="Scroll left"
              >&#8592;</button>
              
              <div 
                id="grief-gallery"
                style={{ 
                  display: 'flex', 
                  gap: 'var(--space-sm)', 
                  overflowX: 'auto', 
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  padding: 'var(--space-xs) 0',
                  flex: 1
                }}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <img 
                    key={n}
                    src={`/images/groundswell/gs-workshop-grief-0${n}.jpg`}
                    alt={`Grief workshop activity ${n}`}
                    onClick={() => setLightboxImage(`/images/groundswell/gs-workshop-grief-0${n}.jpg`)}
                    style={{ 
                      height: '360px', 
                      width: 'auto', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => document.getElementById('grief-gallery').scrollBy({ left: 300, behavior: 'smooth' })}
                style={arrowButtonStyle}
                aria-label="Scroll right"
              >&#8594;</button>
            </div>
          </div>
          
          {/* Nourishing the Flower */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Nourishing the Flower Workshop</h3>
            <p className={styles.bodyText}>
              Using a flower metaphor, participants identified key aspects of their experience — recognition, environment, and workplace culture — by mapping what helps them thrive and what causes strain. After creating individual flowers, we built a collective "garden" of insights, allowing participants to reflect on common themes and highlight what resonated most.
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: 'var(--space-sm)',
              margin: 'var(--space-md) 0',
              textAlign: 'center'
            }}>
              {[
                { part: 'Flower (top)', meaning: 'Recognition — how efforts are valued' },
                { part: 'Stem', meaning: 'Environment — conditions that support work' },
                { part: 'Roots', meaning: 'Culture — values, norms, and attitudes' }
              ].map(item => (
                <div key={item.part} style={{ 
                  padding: 'var(--space-sm)', 
                  backgroundColor: 'var(--project-accent)',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-body)', color: 'var(--project-accent-light)', marginBottom: 'var(--space-xs)' }}>{item.part}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body-small)', color: 'rgba(248, 235, 229, 0.85)', margin: 0 }}>{item.meaning}</p>
                </div>
              ))}
            </div>
            
            <p className={styles.bodyText}>
              We created both "healthy" and "wilting" versions to surface both supports and harms. A simple activity like coloring offers healthcare staff a brief escape and mini relaxation amid their stressful routines. Through this small act of self-care, hidden feelings can surface, providing quiet relief and reflection.
            </p>
            
            {/* Nourishing the Flower Gallery - Arrows outside frame */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <button 
                onClick={() => document.getElementById('flower-gallery').scrollBy({ left: -300, behavior: 'smooth' })}
                style={arrowButtonStyle}
                aria-label="Scroll left"
              >&#8592;</button>
              
              <div 
                id="flower-gallery"
                style={{ 
                  display: 'flex', 
                  gap: 'var(--space-sm)', 
                  overflowX: 'auto', 
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  padding: 'var(--space-xs) 0',
                  flex: 1
                }}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <img 
                    key={n}
                    src={`/images/groundswell/gs-workshop-flower-0${n}.jpg`}
                    alt={`Nourishing the Flower workshop activity ${n}`}
                    onClick={() => setLightboxImage(`/images/groundswell/gs-workshop-flower-0${n}.jpg`)}
                    style={{ 
                      height: '360px', 
                      width: 'auto', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => document.getElementById('flower-gallery').scrollBy({ left: 300, behavior: 'smooth' })}
                style={arrowButtonStyle}
                aria-label="Scroll right"
              >&#8594;</button>
            </div>
          </div>
          
          {/* Women in White Coats */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Women in White Coats Event</h3>
            <p className={styles.bodyText}>
              Leaders in Oncology added their thoughts to the leaves on the stem of our orchid poster, a symbolic flower in cancer care. Thank you postcards with QR codes to a follow-up survey were distributed. Guests took extras to pass to colleagues — evidence that the activity resonated beyond the room.
            </p>
            
            {/* Women in White Coats Gallery - Arrows outside frame */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <button 
                onClick={() => document.getElementById('coats-gallery').scrollBy({ left: -300, behavior: 'smooth' })}
                style={arrowButtonStyle}
                aria-label="Scroll left"
              >&#8592;</button>
              
              <div 
                id="coats-gallery"
                style={{ 
                  display: 'flex', 
                  gap: 'var(--space-sm)', 
                  overflowX: 'auto', 
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  padding: 'var(--space-xs) 0',
                  flex: 1
                }}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <img 
                    key={n}
                    src={`/images/groundswell/gs-workshop-coats-0${n}.jpg`}
                    alt={`Women in White Coats event ${n}`}
                    onClick={() => setLightboxImage(`/images/groundswell/gs-workshop-coats-0${n}.jpg`)}
                    style={{ 
                      height: '360px', 
                      width: 'auto', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
              
              <button 
                onClick={() => document.getElementById('coats-gallery').scrollBy({ left: 300, behavior: 'smooth' })}
                style={arrowButtonStyle}
                aria-label="Scroll right"
              >&#8594;</button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Heard (Quote Wall) - PURPLE */}
      <section className={styles.sectionDark}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeadingLight}>What We Heard</h2>
          <p className={styles.bodyTextLight} style={{ marginBottom: 'var(--space-md)' }}>
            We learned about the phenomenon of "chronic compounded grief" among oncology nurses — how repeated exposure to loss accumulates over time when not properly processed. We witnessed the impact of cramped, windowless environments, administrative overload, and a fractured culture of empathetic staff left unsupported by systems that leave them feeling helpless.
          </p>
        </div>
        <div className={styles.sectionContentWide}>
          <div className={styles.cardGrid3}>
            {participantQuotes.map((item, i) => (
              <div key={i} style={{ 
                borderLeft: '3px solid rgba(248, 235, 229, 0.4)', 
                paddingLeft: 'var(--space-sm)',
                paddingTop: 'var(--space-xs)',
                paddingBottom: 'var(--space-xs)'
              }}>
                <p className={styles.pullQuoteLight} style={{ fontSize: 'var(--text-body-large)', maxWidth: 'none', marginBottom: 'var(--space-xs)' }}>"{item.quote}"</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body-small)', color: 'rgba(248, 235, 229, 0.7)', margin: 0 }}>{item.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Findings - LIGHT (buffer between What We Heard and Synthesis) */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Research Findings</h2>
          <p className={styles.bodyText}>
            The biggest frustrations centered on lack of recognition despite hard work, inadequate resources including insufficient space for both work and decompression, and toxic workplace dynamics that create burnout and affect patient care.
          </p>
          <p className={styles.bodyText}>
            Simple, actionable solutions emerged from the research: more verbal affirmations, designated spaces for grieving or relaxation, improved communication around patient deaths, and more peer discussions on grief. All of these could significantly impact morale and well-being without requiring major budget increases.
          </p>
        </div>
      </section>

      {/* ==================== PHASE 3: SYNTHESIS ==================== */}
      <div id="synthesis" className={styles.phaseDivider}>
        <h2 className={styles.phaseTitle}>Synthesis</h2>
        <p className={styles.phaseIntro}>
          Our research revealed a critical insight: simple, actionable interventions could significantly impact staff morale without requiring major budget increases. We distilled hundreds of data points into three key conclusions that would shape our design direction, and four principles that would guide every decision we made.
        </p>
      </div>

      {/* Key Findings - AS CARDS (visual differentiation from Design Principles) */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Key Findings</h2>
          
          {/* Research Framework - 4 Column Grid */}
          <div className={styles.frameworkGrid}>
            {[
              { 
                title: 'Recognition', 
                intro: 'Staff feel unappreciated through small overlooked actions like:',
                items: [
                  'Long commute to expensive parking lot',
                  'Daily interruption of tasks by colleagues who don\'t understand the importance of their work',
                  'Inadequate benefits/funding',
                  'Feedback not resulting in real change'
                ]
              },
              { 
                title: 'Environment', 
                intro: 'Office space contributes to unhappiness due to:',
                items: [
                  'No windows',
                  'Harsh lighting',
                  'No plants',
                  'No excess space (small desks)',
                  'Nowhere to eat or gather',
                  'Distance from cafeteria',
                  'Physical disconnect between front office and managers'
                ]
              },
              { 
                title: 'Culture', 
                intro: 'Culture exacerbates workplace issues such as:',
                items: [
                  'Expectation that everyone overworks',
                  'No one takes breaks',
                  'Being patient-centered means neglecting yourself',
                  'Feeling selfish if you take a break',
                  'Grief is just part of the job'
                ]
              },
              { 
                title: 'Systemic', 
                intro: 'Broader issues within the system make change feel impossible:',
                items: [
                  'Underpaid',
                  'Lack of understanding/respect for what jobs entail',
                  'Caste system between staff hierarchy',
                  'Scheduling is hectic',
                  'Lack of budget for easy solutions',
                  'Difficulty convincing profit-minded execs to make change',
                  'Corporate culture'
                ]
              }
            ].map((col) => (
              <div key={col.title} className={styles.frameworkColumn}>
                <h4 className={styles.frameworkTitle}>{col.title}</h4>
                <p className={styles.frameworkIntro}>{col.intro}</p>
                <ul className={styles.frameworkList}>
                  {col.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.sectionContentWide}>
          <div className={styles.cardGrid3}>
            {[
              { num: '01', title: 'The Dual Burden of Care', desc: 'Healthcare workers face emotional exhaustion from both the inherently compassionate nature of their work (constant exposure to grief, loss, and trauma) and excessive administrative tasks that disconnect them from their original purpose of patient care.' },
              { num: '02', title: 'Stigma Prevents Help-Seeking', desc: '73% of emergency physicians report stigma around mental health treatment in their workplace, with 27% avoiding treatment entirely due to fear of professional consequences—highlighting the urgent need to normalize emotional support in healthcare settings.' },
              { num: '03', title: 'Support Requires Both Top-Down and Peer-to-Peer', desc: 'Effective mental health support combines organizational leadership initiatives with peer recognition programs, creating a comprehensive culture that prioritizes staff well-being alongside patient care.' }
            ].map((item) => (
              <div key={item.num} className={styles.numberedItemDark}>
                <span className={styles.numberLabelLight}>{item.num}</span>
                <h4 className={styles.numberedTitleLight}>{item.title}</h4>
                <p className={styles.cardDescriptionLight}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles - AS PROSE (visual differentiation from Key Findings) */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Design Principles</h2>
          <p className={styles.bodyText}>
            Four principles guided our design decisions:
          </p>
          
          <p className={styles.bodyText}>
            <strong style={{ color: 'var(--project-accent)' }}>Keeping Mental Well-Being at the Center.</strong> Any proposed intervention should prioritize emotional and psychological support for healthcare workers, addressing both systemic issues (workload, leadership support) and peer-to-peer connections (recognition, safe spaces).
          </p>
          
          <p className={styles.bodyText}>
            <strong style={{ color: 'var(--project-accent)' }}>Balancing Administrative and Caregiving Tasks.</strong> Focus on solutions that alleviate unnecessary clerical burdens, allowing staff to reconnect with patient care and their original motivations for entering the field.
          </p>
          
          <p className={styles.bodyText}>
            <strong style={{ color: 'var(--project-accent)' }}>Addressing Stigma and Accessibility.</strong> Mental health resources must be easily accessible and de-stigmatized, ensuring staff feel safe seeking help without fear of professional repercussions.
          </p>
          
          <p className={styles.bodyText}>
            <strong style={{ color: 'var(--project-accent)' }}>Using a Holistic, Research-Backed Approach.</strong> Our methodology incorporates firsthand insights (shadowing, interviews) and established best practices (leadership training, peer support systems) to create meaningful, evidence-based interventions.
          </p>
        </div>
      </section>

      {/* ==================== PHASE 4: IMPACT ==================== */}
      <div id="impact" className={styles.phaseDivider}>
        <h2 className={styles.phaseTitle}>Impact</h2>
        <p className={styles.phaseIntro}>
          Groundswell was awarded a UPMC grant for a 12-month quality improvement study measuring employee well-being, team cohesion, and intent to leave. The installation launched at Magee-Womens in October 2025, supported by over $30k in donations. At the six-month midpoint, we've documented 570 points of engagement — and learned that meaningful support doesn't require massive budgets, just intentional design.
        </p>
      </div>

      {/* The Components */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>The Components</h2>
          
          {/* CTB Email - Click-through gallery */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Ceased to Breathe Email Redesign</h3>
            <p className={styles.bodyText}>
              Updated patient death notification email template with compassionate visuals and language that acknowledges the impact of patient loss. This small yet significant intervention creates opportunities for connection and mutual support while establishing the compassionate tone that unifies all program components and addresses one of oncology's most challenging recurring realities.
            </p>
            
            {/* CTB Gallery with arrows outside */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <button 
                onClick={prevCtbImage}
                style={arrowButtonStyle}
                aria-label="Previous image"
              >&#8592;</button>
              
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={ctbImages[currentCtbImage].src}
                  alt={ctbImages[currentCtbImage].alt}
                  onClick={() => setLightboxImage(ctbImages[currentCtbImage].src)}
                  style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                />
                <p style={{ 
                  textAlign: 'center', 
                  color: 'var(--color-text-light)', 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '0.875rem',
                  marginTop: 'var(--space-sm)'
                }}>
                  {currentCtbImage + 1} of {ctbImages.length}
                </p>
              </div>
              
              <button 
                onClick={nextCtbImage}
                style={arrowButtonStyle}
                aria-label="Next image"
              >&#8594;</button>
            </div>
          </div>
          
          {/* Pod - Click-through gallery */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Groundswell Restorative Pod</h3>
            <p className={styles.bodyText}>
              Restorative pod space for emotional decompression through mindfulness activities like guided meditation. Research revealed the critical need for private spaces within clinical environments characterized by harsh fluorescent lighting and crowded desks. Open workplace designs facilitate collaboration but leave workers perpetually accessible without training on setting boundaries, making dedicated space for emotional processing essential.
            </p>
            
            {/* Pod Gallery with arrows outside */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <button 
                onClick={prevPodImage}
                style={arrowButtonStyle}
                aria-label="Previous image"
              >&#8592;</button>
              
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={podImages[currentPodImage].src}
                  alt={podImages[currentPodImage].alt}
                  onClick={() => setLightboxImage(podImages[currentPodImage].src)}
                  style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                />
                <p style={{ 
                  textAlign: 'center', 
                  color: 'var(--color-text-light)', 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '0.875rem',
                  marginTop: 'var(--space-sm)'
                }}>
                  {currentPodImage + 1} of {podImages.length}
                </p>
              </div>
              
              <button 
                onClick={nextPodImage}
                style={arrowButtonStyle}
                aria-label="Next image"
              >&#8594;</button>
            </div>
          </div>
          
          {/* Cards */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Groundswell Reflection Cards</h3>
            <p className={styles.bodyText}>
              Guided reflection cards that help staff build a self-care practice through emotional validation and introductory exercises for emotional regulation. These cards integrate mind-body approaches to processing the complex, contradictory emotions inherent in oncology work, helping staff cultivate the capacity that is essential for sustained compassionate care.
            </p>
            
            {/* Immersive Card Experience - No background, let artwork breathe */}
            <div style={{ 
              padding: 'var(--space-lg) var(--space-md)',
              marginTop: 'var(--space-md)',
              position: 'relative'
            }}>
              {/* Card counter */}
              <p style={{ 
                textAlign: 'center', 
                color: 'var(--project-accent)', 
                opacity: 0.6, 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.875rem',
                marginBottom: 'var(--space-sm)'
              }}>
                {currentCard + 1} of {cards.length}
              </p>
              
              {/* Card stack container */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                minHeight: '520px'
              }}>
                {/* Previous card arrow */}
                <button 
                  onClick={prevCard} 
                  aria-label="Previous card" 
                  style={{ 
                    ...arrowButtonStyle,
                    position: 'absolute',
                    left: 'clamp(0.5rem, 3vw, 2rem)',
                    zIndex: 10
                  }}
                >&#8592;</button>
                
                {/* Stacked cards visual - showing actual upcoming cards */}
                <div style={{ position: 'relative' }}>
                  {/* Preview card 2 (furthest back) - shows card after next */}
                  <div style={{ 
                    position: 'absolute', 
                    width: '320px', 
                    height: '480px', 
                    borderRadius: '16px',
                    transform: 'rotate(6deg) translateX(12px)',
                    top: '10px',
                    left: '0',
                    boxShadow: '0 4px 20px rgba(85, 77, 101, 0.1)',
                    overflow: 'hidden',
                    opacity: 0.6
                  }}>
                    <img 
                      src={`/images/groundswell/gs-card-${cards[(currentCard + 2) % cards.length].name}-front.jpg`}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* Preview card 1 (middle) - shows next card */}
                  <div style={{ 
                    position: 'absolute', 
                    width: '320px', 
                    height: '480px', 
                    borderRadius: '16px',
                    transform: 'rotate(3deg) translateX(6px)',
                    top: '5px',
                    left: '0',
                    boxShadow: '0 4px 20px rgba(85, 77, 101, 0.15)',
                    overflow: 'hidden',
                    opacity: 0.8
                  }}>
                    <img 
                      src={`/images/groundswell/gs-card-${cards[(currentCard + 1) % cards.length].name}-front.jpg`}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  
                  {/* Main flippable card */}
                  <div 
                    onClick={toggleFlip} 
                    role="button" 
                    tabIndex={0} 
                    onKeyDown={(e) => e.key === 'Enter' && toggleFlip()} 
                    aria-label={`${cards[currentCard].name} card - tap to flip`} 
                    style={{ 
                      width: '320px', 
                      height: '480px', 
                      perspective: '1000px', 
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 5
                    }}
                  >
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      position: 'relative', 
                      transformStyle: 'preserve-3d', 
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)', 
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 25px 50px rgba(85, 77, 101, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1)'
                    }}>
                      {/* Front of card */}
                      <div style={{ 
                        position: 'absolute', 
                        width: '100%', 
                        height: '100%', 
                        backfaceVisibility: 'hidden', 
                        borderRadius: '16px', 
                        overflow: 'hidden',
                        backgroundColor: 'var(--project-accent-light)'
                      }}>
                        <img 
                          src={`/images/groundswell/gs-card-${cards[currentCard].name}-front.jpg`}
                          alt={`${cards[currentCard].name} card front`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      {/* Back of card */}
                      <div style={{ 
                        position: 'absolute', 
                        width: '100%', 
                        height: '100%', 
                        backfaceVisibility: 'hidden', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        transform: 'rotateY(180deg)',
                        backgroundColor: 'var(--project-accent-light)'
                      }}>
                        <img 
                          src={`/images/groundswell/gs-card-${cards[currentCard].name}-back.jpg`}
                          alt={`${cards[currentCard].name} card back`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Next card arrow */}
                <button 
                  onClick={nextCard} 
                  aria-label="Next card" 
                  style={{ 
                    ...arrowButtonStyle,
                    position: 'absolute',
                    right: 'clamp(0.5rem, 3vw, 2rem)',
                    zIndex: 10
                  }}
                >&#8594;</button>
              </div>
              
              {/* Flip instruction */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                marginTop: 'var(--space-md)',
                color: 'var(--project-accent)',
                opacity: isFlipped ? 0.4 : 0.7,
                transition: 'opacity 0.3s ease'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>
                  {isFlipped ? 'Tap to see front' : 'Tap card to flip'}
                </span>
              </div>
              
              {/* Dot navigation */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: 'var(--space-md)' }}>
                {cards.map((card, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setIsFlipped(false); setCurrentCard(i); }} 
                    aria-label={`Go to ${card.name} card`} 
                    style={{ 
                      width: i === currentCard ? '28px' : '10px', 
                      height: '10px', 
                      borderRadius: '5px', 
                      backgroundColor: i === currentCard ? 'var(--project-accent)' : 'rgba(85, 77, 101, 0.2)', 
                      border: 'none', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease' 
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Art Wall - Click-through gallery */}
          <div>
            <h3 className={styles.subheading}>Groundswell Garden Community Art Wall</h3>
            <p className={styles.bodyText}>
              Community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences. By recognizing patient care as an interconnected ecosystem rather than isolated individual transactions, the wall acknowledges shared emotional labor among all team members—from clinical staff to administrative personnel to family caregivers.
            </p>
            
            {/* Art Wall Gallery with arrows outside */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <button 
                onClick={prevArtWallImage}
                style={arrowButtonStyle}
                aria-label="Previous image"
              >&#8592;</button>
              
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={artWallImages[currentArtWallImage].src}
                  alt={artWallImages[currentArtWallImage].alt}
                  onClick={() => setLightboxImage(artWallImages[currentArtWallImage].src)}
                  style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                />
                <p style={{ 
                  textAlign: 'center', 
                  color: 'var(--color-text-light)', 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '0.875rem',
                  marginTop: 'var(--space-sm)'
                }}>
                  {currentArtWallImage + 1} of {artWallImages.length}
                </p>
              </div>
              
              <button 
                onClick={nextArtWallImage}
                style={arrowButtonStyle}
                aria-label="Next image"
              >&#8594;</button>
            </div>
          </div>
          
          {/* Mindfulness Resources */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h3 className={styles.subheading}>Mindfulness Resources</h3>
            <p className={styles.bodyText}>
              Custom meditations and a poem were created for this project in collaboration with Catherine Liggett and Mark Staley. These resources are available to staff via QR code both inside and outside of the pod.
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 'var(--space-md)',
              marginTop: 'var(--space-md)'
            }}>
              {/* Poem */}
              <div style={{ 
                backgroundColor: 'var(--project-accent)', 
                borderRadius: '8px', 
                padding: 'var(--space-md)'
              }}>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-xs)', opacity: 0.7 }}>Poem</p>
                <p className={styles.cardTitleLight} style={{ marginBottom: 'var(--space-sm)' }}>"Remember Your Heart"</p>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-sm)', opacity: 0.8 }}>Read by Catherine Liggett</p>
                <audio 
                  src="/audio/groundswell/gs-poem-remember.mp3" 
                  controls 
                  style={{ width: '100%', height: '40px' }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              {/* Meditation 1 */}
              <div style={{ 
                backgroundColor: 'var(--project-accent)', 
                borderRadius: '8px', 
                padding: 'var(--space-md)'
              }}>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-xs)', opacity: 0.7 }}>Guided Meditation</p>
                <p className={styles.cardTitleLight} style={{ marginBottom: 'var(--space-sm)' }}>"Coming Home to Yourself"</p>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-sm)', opacity: 0.8 }}>By Catherine Liggett</p>
                <audio 
                  src="/audio/groundswell/gs-meditation-home.mp3" 
                  controls 
                  style={{ width: '100%', height: '40px' }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              {/* Meditation 2 */}
              <div style={{ 
                backgroundColor: 'var(--project-accent)', 
                borderRadius: '8px', 
                padding: 'var(--space-md)'
              }}>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-xs)', opacity: 0.7 }}>5-Minute Meditation</p>
                <p className={styles.cardTitleLight} style={{ marginBottom: 'var(--space-sm)' }}>"Emotional Reset"</p>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-sm)', opacity: 0.8 }}>By Catherine Liggett</p>
                <audio 
                  src="/audio/groundswell/gs-meditation-5min.mp3" 
                  controls 
                  style={{ width: '100%', height: '40px' }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              {/* Meditation 3 */}
              <div style={{ 
                backgroundColor: 'var(--project-accent)', 
                borderRadius: '8px', 
                padding: 'var(--space-md)'
              }}>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-xs)', opacity: 0.7 }}>10-Minute Meditation</p>
                <p className={styles.cardTitleLight} style={{ marginBottom: 'var(--space-sm)' }}>"Guided Physical & Emotional Reset"</p>
                <p className={styles.bodyTextSmallLight} style={{ marginBottom: 'var(--space-sm)', opacity: 0.8 }}>By Catherine Liggett</p>
                <audio 
                  src="/audio/groundswell/gs-meditation-10min.mp3" 
                  controls 
                  style={{ width: '100%', height: '40px' }}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Validation */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Validation</h2>
          <p className={styles.bodyText}>
            We invited 30 participants to test our pod experience at CMU before installing at the hospital. The overwhelming response was that people wanted a pod of their own.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 'var(--space-md)',
            marginTop: 'var(--space-lg)' 
          }}>
            {validationQuotes.map((quote, i) => (
              <blockquote key={i} style={{ 
                borderLeft: '3px solid var(--project-accent)', 
                paddingLeft: 'var(--space-md)',
                margin: 0
              }}>
                <p className={styles.pullQuote} style={{ fontSize: 'var(--text-body-large)', maxWidth: 'none', margin: 0 }}>"{quote}"</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Outcome</h2>
          <p className={styles.bodyText}>
            Groundswell was awarded a UPMC grant to pursue the installation of our proposed project for a 12-month quality improvement research study that will measure employee well-being, team cohesion, and intent to leave before, during, and after the installation.
          </p>
          <p className={styles.bodyText}>
            Groundswell is now officially installed at Magee-Womens and launched for the Cancer Services staff in October 2025.
          </p>
          <p className={styles.bodyText}>
            We received over $30k worth of donations for material and production skills to make this project a reality.
          </p>
          
          {/* Outcome Gallery */}
          {/* Outcome Gallery - Arrows outside frame */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
            <button 
              onClick={prevOutcomeImage}
              style={arrowButtonStyle}
              aria-label="Previous image"
            >&#8592;</button>
            
            <div style={{ flex: 1 }}>
              <img 
                src={outcomeImages[currentOutcomeImage].src}
                alt={outcomeImages[currentOutcomeImage].alt}
                onClick={() => setLightboxImage(outcomeImages[currentOutcomeImage].src)}
                style={{ width: '100%', borderRadius: '8px', cursor: 'pointer', display: 'block' }}
              />
              
              {/* Dot indicators */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: 'var(--space-sm)' }}>
                {outcomeImages.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentOutcomeImage(i)} 
                    aria-label={`Go to image ${i + 1}`}
                    style={{ 
                      width: i === currentOutcomeImage ? '24px' : '8px', 
                      height: '8px', 
                      borderRadius: '4px', 
                      backgroundColor: i === currentOutcomeImage ? 'var(--project-accent)' : 'var(--color-border)', 
                      border: 'none', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease' 
                    }} 
                  />
                ))}
              </div>
            </div>
            
            <button 
              onClick={nextOutcomeImage}
              style={arrowButtonStyle}
              aria-label="Next image"
            >&#8594;</button>
          </div>
        </div>
      </section>

      {/* Measuring Impact */}
      <section className={styles.sectionLight} style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Measuring Impact</h2>
          <p className={styles.bodyText}>
            I taught myself to vibe code and co-designed this site with Claude to create a "living" data storytelling tool that communicates the impact of Groundswell to stakeholders and community members. It has sparked new ideas about future digital iterations of the community garden art wall that would increase and aggregate participation.
          </p>
          <p className={styles.bodyText}>
            At the midpoint of the 12-month pilot, the Groundswell installation has documented 570 points of engagement — 207 emotion responses, 256 pod visits, and 107 meditation views. These represent minimum baselines; our sensors and methods are designed to undercount rather than overcount.
          </p>
          <p className={styles.bodyText}>
            For the backend to support my research assistant team, I designed an admin page to streamline data collection across three sources: physical emotion cards, pod sensor data, and meditation analytics.
          </p>
          <img 
            src="/images/groundswell/gs-dataviz.jpg"
            alt="Groundswell data visualization dashboard"
            style={{ width: '100%', marginTop: 'var(--space-lg)', borderRadius: '8px' }}
          />
        </div>
      </section>

      {/* Reflection - PURPLE */}
      <section className={styles.sectionDark} style={{ textAlign: 'center' }}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeadingLight}>Reflection</h2>
          <p className={styles.bodyTextLight} style={{ maxWidth: '700px', margin: '0 auto var(--space-lg)' }}>
            Rather than relying on exceptional individuals to shoulder impossible burdens, Groundswell creates systemic solutions that make compassionate care sustainable for all healthcare workers.
          </p>
          <blockquote style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p className={styles.pullQuoteLight}>
              Remember your heart.<br/>
              Remember how it has expanded beyond its borders,<br/>
              how it has learned to hold both joy and sorrow without breaking.
            </p>
            <p className={styles.pullQuoteLight} style={{ marginTop: 'var(--space-md)' }}>
              We come together like water through soil,<br/>
              a groundswell of quiet strength gathering force.<br/>
              For what you carry, we carry.
            </p>
            <cite className={styles.quoteAttributionLight} style={{ marginTop: 'var(--space-md)' }}>— From "Remember Your Heart," inspired by Joy Harjo's "Remember"</cite>
          </blockquote>
        </div>
      </section>

      {/* Recognition */}
      <section className={styles.sectionLight}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Recognition</h2>
          <p className={styles.bodyText}>
            This project was possible because of the trust building that took place in the year prior. Without Kristin Hughes' passion and relationships at UPMC, the dedication and enthusiasm of Dr. Sarah Taylor, Dr. Grace Campbell, and Dr. Heidi Donovan, and of course the generous time and vulnerable information shared by the staff members.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamSection}>
              <h3>Project Team</h3>
              <ul className={styles.teamList}>
                <li>Professor Kristin Hughes</li>
                <li>Lorin Anderberg</li>
                <li>Elijah Benzon</li>
                <li>Kelly McDowell</li>
                <li>Robertus Shuyo</li>
                <li>Greg Baltus (Fabrication)</li>
              </ul>
            </div>
            <div className={styles.teamSection}>
              <h3>Partners</h3>
              <ul className={styles.teamList}>
                <li>UPMC Magee-Womens Hospital</li>
                <li>Carnegie Mellon School of Design</li>
                <li>University of Pittsburgh Schools of Medicine and Nursing</li>
                <li>Carolyn Gavin Art</li>
                <li>NookPod</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className={styles.projectNav}>
        <Link href="/projects/birthstory" className={styles.projectNavLink}>&#8592; Previous Project</Link>
        <Link href="/projects/transition-design" className={styles.projectNavLink}>Next Project &#8594;</Link>
      </nav>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
            padding: 'var(--space-md)'
          }}
        >
          <button
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'absolute',
              top: 'var(--space-md)',
              right: 'var(--space-md)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close lightbox"
          >×</button>
          <img 
            src={lightboxImage} 
            alt="Enlarged view"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '90vw', 
              maxHeight: '90vh', 
              objectFit: 'contain',
              borderRadius: '8px',
              cursor: 'default'
            }}
          />
        </div>
      )}
    </div>
  )
}