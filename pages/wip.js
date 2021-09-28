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


export default function WIP() {

    const [scrollRef, scrollPercent] = useScrollPercentage();

    let width = useScreenWidth();
    let isMobile = width <= 768;

    return (
        <div ref={scrollRef} className="relative bg-black text-white w-full">
            <Header isMobile={isMobile} />

            <div className="w-full min-h-screen py-32 flex flex-col justify-center items-center">
                <h1 className="text-3xl">work in progress... 🚦</h1>
                <Spotify isMobile={isMobile} />
            </div>

            <Footer />
        </div>
    )
}
