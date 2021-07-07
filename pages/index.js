import Head from 'next/head'

import Header from '../components/header'
import Intro from '../components/intro'
import Orbits from '../components/orbits'
import Projects from '../components/projects'
import Spotify from '../components/spotify'
import Footer from '../components/footer'


import { useScreenWidth, mapNum } from '../lib/utils'

import { useEffect } from 'react'
import { useScrollPercentage } from 'react-scroll-percentage'
import Fade from 'react-reveal/Fade';


export default function Index() {

  const [scrollRef, scrollPercent] = useScrollPercentage();

  let width = useScreenWidth();
  let isMobile = width <= 768;

  return (
    <div ref={scrollRef} className="relative bg-black text-white w-full">
      <Header isMobile={isMobile} />

      <Fade bottom collapse>
        <Intro isMobile={isMobile} />
      </Fade>

      {!isMobile && 
        <Orbits isMobile={isMobile} width={width} percentage={scrollPercent} />
      }

      <Projects isMobile={isMobile} />

      <Spotify isMobile={isMobile} />

      <Footer />
    </div>
  )
}
