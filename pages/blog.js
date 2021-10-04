import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import humanizeDuration from 'humanize-duration'

import Header from '../components/header'
import Footer from '../components/footer'
import { RainbowText } from '../lib/utils'
import profilePic from '../public/picrew.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendar, faUserCircle, faEye } from '@fortawesome/free-regular-svg-icons'

import { NextSeo } from 'next-seo';

export default function Blog({ posts }) {

    const router = useRouter();
    let currTag = router.query.tag || "";

    let tags = ["misc", "math", "science", "devlog"]

    return (
        <div>
            <NextSeo
                title="ongzz's blog"
                description="a list of writings: some stuff from ongzz's mind"
                openGraph={{
                    title: "ongzz's blog", site_name: 'ongzz', locale: 'en_IE',
                    type: 'website', url: 'https://ongzz.ml/',
                    images: [{ url: 'https://ongzz.ml/index.png' }]
                }}
                twitter={{
                    handle: '@ongzzzzzz', site: '@ongzzzzzz', cardType: 'summary_large_image',
                }}
            />
            <Header />
            <div className="relative bg-black text-white w-full min-h-screen overflow-x-hidden px-5 md:px-72">
                <div className="flex flex-col items-center my-5">
                    <div className="max-w-xs mx-auto h-auto px-10 md:px-20">
                        <Image className="rounded-full" src={profilePic} alt="It's me!" />
                    </div>
                    <h1 className="text-xl font-bold">Hi! I'm <b>Zhi Zheng</b>.</h1>
                    <h1 className="text-xl font-bold">Student · <RainbowText>Explorer</RainbowText></h1>
                </div>
                <p className="text-2xl">a list of writings: some stuff from ongzz's mind</p>
                {currTag &&
                    <p onClick={() => router.push('blog')}
                        className="rounded-full w-20 text-center px-2 py-1 m-3 bg-red-400 cursor-pointer bg-gradient-to-r from-red-500 to-red-700"
                    >← back</p>}
                <div className="w-full flex flex-row flex-wrap">
                    {tags.map(tag => (
                        <div onClick={() => router.push(`?tag=${tag}`)} key={tag}
                            className={currTag == tag
                                ? `rounded-full px-2 py-1 mx-3 my-1 cursor-pointer flex-auto text-center bg-gradient-to-r from-green-500 to-green-700`
                                : `rounded-full px-2 py-1 mx-3 my-1 cursor-pointer flex-auto text-center bg-gradient-to-r from-blue-500 to-blue-700`
                            }
                        >
                            #{tag}
                        </div>
                    ))}
                </div>
                {posts.map(post => (
                    currTag && !post.tags.includes(currTag)
                        ? <div key={post.title}></div>
                        :
                        <div key={post.title} className="relative flex justify-between min-h-48 rounded-lg my-10 bg-gray-400 bg-opacity-25 cursor-pointer"
                            style={{ background: "linear-gradient(135deg, rgba(181,189,200,0.25) 0%,rgba(130,140,149,0.25) 25%,rgba(40,52,59,0.25) 100%)" }}
                            onClick={() => router.push(`blog/${post.path}`)}
                        >
                            <div className="w-2/3 p-5">
                                <h1 className="text-lg md:text-4xl font-bold hover:underline">{post.title}</h1>
                                <p className="text-base md:text-xl">{post.blurb}</p>
                                <p className="text-xs md:text-base">
                                    <FontAwesomeIcon icon={faClock} /> {humanizeDuration(post.length)} read
                                </p>
                                <p className="text-xs md:text-base">
                                    <FontAwesomeIcon icon={faEye} /> {post.views} views
                                </p>
                                <p className="text-xs md:text-base">
                                    <FontAwesomeIcon icon={faCalendar} /> {post.date}
                                </p>
                                <p className="text-xs md:text-base">
                                    <FontAwesomeIcon icon={faUserCircle} /> {post.author}
                                </p>
                            </div>
                            <div className="w-1/3 rounded-r-lg bg-gray-400"
                                style={{ background: `#fff url('${post.img}') no-repeat center`, backgroundSize: "cover" }}
                            >
                            </div>
                        </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export async function getStaticProps(ctx) {
    const path = require('path')
    const fs = require('fs')
    const { db } = require('../lib/firebaseAdmin')


    let blogPath = path.join(process.cwd(), "pages/blog")

    let _postDatas = fs.readdirSync(blogPath).map(blog => {
        return { path: blog.split('.')[0], ...require(`./blog/${blog}`).meta }
    })

    let postDatas = [];
    for (const post of _postDatas) {
        let doc = await db.collection('blogs').doc(post.path).get()
        if (doc.exists) {
            let data = doc.data()
            postDatas.push({ ...post, views: data.views, likes: data.likes })
        }
        else {
            db.collection('blogs').doc(post.path).set({
                views: 0,
                likes: 0
            })
            postDatas.push({ ...post, views: 0, likes: 0 })
        }
    }

    return {
        props: {
            posts: postDatas
        },
        revalidate: 1,
    }
}