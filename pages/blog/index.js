import Head from 'next/head'

import Header from '../../components/header'
import Footer from '../../components/footer'


import { useScreenWidth } from '../../lib/utils'

import { useEffect } from 'react'
import Fade from 'react-reveal/Fade';


export default function Blog({ posts }) {
    

    let width = useScreenWidth();
    let isMobile = width <= 768;

    return (
        <div className="relative bg-black text-white w-full min-h-screen">
            <Header isMobile={isMobile} />
                <h1>hi</h1>
            <Footer />
        </div>
    )
}

// export async function getStaticProps() {
// }