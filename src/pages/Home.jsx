import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Services from '../components/sections/Services';
import Skills from '../components/sections/Skills';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Certifications from '../components/sections/Certifications';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Services />
      <Skills />
      <About />
      <Testimonials />
      <Education />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
