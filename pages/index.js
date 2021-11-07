import Head from 'next/head'

import Header from '../components/header'
import Intro from '../components/intro'
import Blog from '../components/blog'
import Orbits from '../components/orbits'
import Projects from '../components/projects'
import Spotify from '../components/spotify'
import Footer from '../components/footer'


import { useScreenWidth, mapNum } from '../lib/utils'

import { useEffect } from 'react'
import { useScrollPercentage } from 'react-scroll-percentage'
import Fade from 'react-reveal/Fade';


export default function Index({ featured, posts }) {

  const [scrollRef, scrollPercent] = useScrollPercentage();

  let width = useScreenWidth();
  let isMobile = width <= 768;

  return (
    <div ref={scrollRef} className="relative bg-black text-white w-full min-h-screen">
      <Header />

      <Fade bottom collapse>
        <Intro />
      </Fade>

      {!isMobile &&
        <Orbits isMobile={isMobile} width={width} percentage={scrollPercent} />
      }

      <Blog posts={posts}/>

      <Projects featured={featured} />

      <Spotify />

      <Footer />
    </div>
  )
}


import axios from "axios";

export async function getStaticProps() {

  try {

    // get featured projects
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

    // get recent blog posts
    const { getLatestPosts } = require('../lib/serverUtils');
    let posts = await getLatestPosts(3);

    return {
      props: { featured, posts },
    }
  }
  catch (e) {
    console.error(e);
    return {
      props: { featured: [], posts: [] },
    }
  }


}