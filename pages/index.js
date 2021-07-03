import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/header'
import Orbits from '../components/orbits'

import { useScrollPercentage } from 'react-scroll-percentage'


export default function Home() {

  const [scrollRef, scrollPercent] = useScrollPercentage();

  return (
    <div ref={scrollRef} className="bg-black text-white w-full">
      <Header />

      <Orbits mobile={"solar"} percentage={scrollPercent} />
    </div>
  )
}
