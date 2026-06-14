import { useEffect, useRef } from 'react'
import { ArrowRight, Globe, Instagram, Twitter } from 'lucide-react'
import AboutSection from '../components/AboutSection'
import FeaturedVideoSection from '../components/FeaturedVideoSection'
import PhilosophySection from '../components/PhilosophySection'
import ServicesSection from '../components/ServicesSection'

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

function animateOpacity(
  el: HTMLElement,
  from: number,
  to: number,
  duration: number,
) {
  const start = performance.now()

  const step = (now: number) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    el.style.opacity = String(from + (to - from) * progress)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'

    const handleCanPlay = () => {
      void video.play()
      animateOpacity(video, 0, 1, 500)
    }

    const handleTimeUpdate = () => {
      if (!video.duration) return
      const remaining = video.duration - video.currentTime

      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        const current = parseFloat(video.style.opacity || '1')
        animateOpacity(video, current, 0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'

      setTimeout(() => {
        video.currentTime = 0
        void video.play()
        animateOpacity(video, 0, 1, 500)
        fadingOutRef.current = false
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="bg-black">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          style={{ opacity: 0 }}
          muted
          autoPlay
          playsInline
          preload="auto"
          src={HERO_VIDEO_URL}
        />

        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-white" />
              <span className="ml-2 text-lg font-semibold text-white">Asme</span>

              <div className="ml-8 hidden items-center gap-8 md:flex">
                <a href="#features" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  Features
                </a>
                <a href="#pricing" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  Pricing
                </a>
                <a href="#about" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  About
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-white">Sign Up</button>
              <button className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white">
                Login
              </button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
          <h1
            className="whitespace-nowrap text-7xl tracking-tight text-white md:text-8xl lg:text-9xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Know it then <em className="italic">all</em>.
          </h1>

          <form className="mt-10 w-full max-w-xl" onSubmit={(e) => e.preventDefault()}>
            <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="rounded-full bg-white p-3 text-black"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          <p className="mt-6 max-w-xl px-4 text-sm leading-relaxed text-white">
            Stay updated with the latest news and insights. Subscribe to our newsletter
            today and never miss out on exciting updates.
          </p>

          <button className="liquid-glass mt-8 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
            Manifesto
          </button>
        </div>

        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <a
            href="#"
            aria-label="Instagram"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Website"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </div>

      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  )
}

export default Index
