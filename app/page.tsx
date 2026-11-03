import { BookingProvider } from '@/components/site/booking-provider'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'
import { Founders } from '@/components/site/founders'
import { Hero } from '@/components/site/hero'
import { Navbar } from '@/components/site/navbar'
import { Projects } from '@/components/site/projects'
import { Services } from '@/components/site/services'
import { Stats } from '@/components/site/stats'

export default function Home() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Stats />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </BookingProvider>
  )
}
