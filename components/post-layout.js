import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import humanizeDuration from 'humanize-duration'

import Header from './header'
import Footer from './footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'


export default function PostLayout({ children, meta }) {
    const router = useRouter();

    let [views, setViews] = useState(0);

    useEffect(() => {
        let blogName = router.pathname.replace('/blog/', '')
        fetch(`/api/views/${encodeURIComponent(blogName)}`).then(async res => {
            let data = await res.json()
            setViews(data.views)
        })
    }, [])

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
                    integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/prism-theme-one-dark@1.0.0/prism-onedark.css"
                    integrity="sha256-765lGALlgp6pnbF8EYLKUCDhYD6ksW6RZ+EV4fI9OH0="
                    crossOrigin="anonymous"
                />
            </Head>
            <Header />
            <div className="relative bg-black text-white w-full min-h-screen overflow-x-hidden px-5 pb-10 md:px-72">
                <p onClick={() => router.push('/blog')}
                    className="rounded-full w-20 text-center px-2 py-1 m-3 bg-red-400 cursor-pointer bg-gradient-to-r from-red-500 to-red-700"
                >← back</p>
                <div className="relative flex flex-col items-center mb-5">
                    <div style={{ width: "100vw", minHeight: "25vh", maxHeight: "50vh" }} className="relative my-5">
                        <Image alt={meta.title} src={meta.img} layout="fill" objectFit="contain" />
                    </div>
                    <div style={{ width: "100%" }}>
                        <h1 className="text-4xl text-center font-bold">{meta.title}</h1>

                        <div className="flex flex-row justify-center items-center text-sm md:text-base">
                            <span><FontAwesomeIcon icon={faUserCircle} className="h-5 mx-1" /></span>
                            <span>by {meta.author}</span>
                            <span className="text-gray-400 mx-2">
                                <i>({humanizeDuration(meta.length).replace("minutes", "minute")} read · {views} views)
                                </i>
                            </span>
                        </div>

                    </div>
                </div>
                {children}
            </div>
            <Footer />
        </div>
    )
}