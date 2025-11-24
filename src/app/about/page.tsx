import { Footer, Navbar } from '@/components'
import AboutHero from '@/components/About/AboutHero'
import AboutSteps from '@/components/About/AboutSteps'
import React from 'react'
import type { Metadata } from 'next'
import AboutServices from '@/components/About/AboutServices'
import AboutMission from '@/components/About/AboutMission'

export const metadata: Metadata = {
  title: 'About us | AirSpeak - Aviation Communication Training',
  description:
    'Learn more about FlightSounds and how we bring immersive aviation audio experiences to life.',
}

export default function about() {
  return (
    <div>
      <Navbar />
      <AboutSteps />
      <AboutServices />
      <AboutHero />
      <AboutMission />
      <Footer />
    </div>
  )
}
