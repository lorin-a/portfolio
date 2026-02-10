import styles from './page.module.css'

export const metadata = {
  title: 'About | Lorin Anderberg',
  description: 'Design researcher and social impact strategist with an intentionally nonlinear path shaped by years of traveling, listening, caregiving, and creativity.',
}

export default function About() {
  return (
    <article className={styles.about}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.photoPlaceholder}>
            [about-photo.jpg]
          </div>
          <h1 className={styles.title}>My Journey</h1>
        </header>
        
        <div className={styles.content}>
          <p className={styles.intro}>
            I am a design researcher and social impact strategist with an intentionally 
            nonlinear path shaped by years of traveling, listening, caregiving, and creativity.
          </p>
          
          <p>
            Before earning my MA in Design, I documented human stories through journalism 
            in Oregon and Cuba, created EdTech content in Cape Town, bicycled across America, 
            supported small businesses and nonprofits with heartfelt marketing, helped open 
            a restaurant in upstate NY, backpacked around the globe, cared for families 
            navigating illness, and trained in somatic work.
          </p>
          
          <p>
            These experiences taught me to honor both the emotional and systemic layers of 
            human life, and they now shape how I approach research, co-design, and systems 
            transformation.
          </p>
          
          <p>
            Most recently, I co-created and implemented an employee well-being program in 
            a cancer center, weaving together qualitative research, co-design, environmental 
            design, and storytelling to support oncology staff. I bring this constellation 
            of lived experience, rigorous inquiry, and embodied compassion to projects in 
            healthcare, education, mental health, and community well-being.
          </p>
          
          <div className="squiggle" aria-hidden="true"></div>
          
          <h2>Design Philosophy</h2>
          
          <p>
            I believe that design is fundamentally about relationships between people, 
            (eco)systems, and possibilities that emerge when care is centered. My practice 
            is grounded in narrative storytelling and honors the complexity of human 
            experience while making systems more accessible, equitable, and humane.
          </p>
          
          <p>
            I use relational practices and generative co-design to cultivate trauma-responsive 
            spaces for resonant design solutions to emerge.
          </p>
          
          <div className="squiggle" aria-hidden="true"></div>
          
          <h2>Vision & Goals</h2>
          
          <p>
            Like the seeds in my Design Mind Zine, I turn to leaders in the space of design 
            justice for guidance. I am committed to continuous learning, embracing uncertainty, 
            unlearning embedded systems of oppression, and co-creating better futures.
          </p>
          
          <p>
            I am interested in working with the "taboo" within slow-moving complex systems 
            like healthcare, education, and mental health—spaces where thoughtful design has 
            the greatest potential to transform lives and systems from the inside out.
          </p>
          
          <div className="squiggle" aria-hidden="true"></div>
          
          <h2>Skills & Experience</h2>
          
          <div className={styles.skills}>
            <p>
              UX Research · Design Research · Copywriting · Brand Design · 
              Marketing · Storytelling
            </p>
          </div>
          
          <ul className={styles.credentials}>
            <li><strong>MA in Design</strong>, Carnegie Mellon University, 2025</li>
            <li><strong>BA in Journalism & Advertising</strong>, University of Oregon, 2016</li>
            <li><strong>9+ years</strong> in communications, marketing, customer service, sales, events, and creative</li>
            <li><strong>LUMA Human Centered Design Practitioner</strong> Certificate, 2024</li>
            <li><strong>IDEO Design Thinking Certificate</strong>, 2024</li>
          </ul>
          
          <div className="squiggle" aria-hidden="true"></div>
          
          <h2>Learned Wisdom</h2>
          
          <blockquote className={styles.quote}>
            "Transformation doesn't happen in a linear way, at least not one we can always 
            track. It happens in cycles, convergences, explosions. If we release the framework 
            of failure, we can realize that we are in iterative cycles, and we can keep asking 
            ourselves—how do I learn from this?"
            <cite>— adrienne maree brown, Emergent Strategy</cite>
          </blockquote>
          
          <blockquote className={styles.quote}>
            "The beauty of the partnership is that each plant does what it does in order to 
            increase its own growth. But as it happens, when the individuals flourish, so 
            does the whole…The most important thing each of us can know is our unique gift 
            and how to use it in the world. In reciprocity, we fill our spirits as well as 
            our bellies."
            <cite>— Robin Wall Kimmerer, Braiding Sweetgrass</cite>
          </blockquote>
        </div>
      </div>
    </article>
  )
}