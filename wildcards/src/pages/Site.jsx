import { Hero } from '../site/Hero.jsx';
import { RoutesMap } from '../site/RoutesMap.jsx';
import { About } from '../site/About.jsx';
import { Rights } from '../site/Rights.jsx';
import { Services } from '../site/Services.jsx';
import { Places } from '../site/Places.jsx';
import { Stories } from '../site/Stories.jsx';
import { Contact } from '../site/Contact.jsx';

export default function Site() {
  return (
    <main id="top">
      <Hero />
      <RoutesMap />
      <About />
      <Rights />
      <Services />
      <Places />
      <Stories />
      <Contact />
    </main>
  );
}
