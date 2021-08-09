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


export default function Index({ featured }) {

  const [scrollRef, scrollPercent] = useScrollPercentage();

  let width = useScreenWidth();
  let isMobile = width <= 768;

  return (
    <div ref={scrollRef} className="relative bg-black text-white w-full">
      <Header isMobile={isMobile} />

      <Fade bottom collapse>
        <Intro />
      </Fade>

      {!isMobile &&
        <Orbits isMobile={isMobile} width={width} percentage={scrollPercent} />
      }

      <Projects isMobile={isMobile} featured={featured} />

      <Spotify />

      <Footer />
    </div>
  )
}


import axios from "axios";

export async function getStaticProps() {
  
  try {
    let res = await axios.post("https://firestore.googleapis.com/v1/projects/fogeinator/databases/(default)/documents:runQuery", {
      structuredQuery: {
        from: [{ collectionId: "projects" }],
        select: {
          fields: [
            { fieldPath: "name" },
            { fieldPath: "desc" },
            { fieldPath: "img" },
            { fieldPath: "link" }
          ],
        },
        where: {
          fieldFilter: {
            field: { fieldPath: "featured" },
            op: "EQUAL",
            value: { booleanValue: true },
          },
        },
      },
    });
    
    let featured = res.data.map(doc => {
      Object.keys(doc.document.fields).forEach(key => {
        doc.document.fields[key] = doc.document.fields[key].stringValue;
      })
      return doc.document.fields;
    })

    return {
      props: { featured },
    }
  }
  catch (e) {
    console.log(e);
    return {
      props: { featured: {} },
    }
  }


}