/* 
double slit
interwebs v3
grav sandbox
(trendsetter)
mole
AUA
lens
clocky
timelapper
foodrescue
buses
*/

import Header from '../components/header'
import Footer from '../components/footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faCalendar, faUserCircle, faEye } from '@fortawesome/free-regular-svg-icons'

import { NextSeo } from 'next-seo';
import { addBasePath } from 'next/dist/shared/lib/router/router'

export default function Projects({ projects }) {

    return (
        <div>
            <NextSeo 
                title="ongzz's blog"
                description="a list of writings: some stuff from ongzz's mind"
                openGraph={{
                    title: "ongzz's blog",
                    description: "a list of writings: some stuff from ongzz's mind",
                    type: 'website',
                    url: 'https://ongzz.ml/blog', site_name: 'ongzz',
                    images: [{ url: 'https://ongzz.ml/index.png' }]
                }}
                twitter={{ handle: '@ongzzzzzz', site: '@ongzzzzzz', cardType: 'summary_large_image' }}
            />
            <Header />
            <div className="relative bg-black text-white w-full min-h-screen overflow-x-hidden px-5 md:px-72">

            </div>
            <Footer />
        </div>
    )
}

export async function getStaticProps(ctx) {
    let projects = [{}]

    return {
        props: {
            projects
        },
        revalidate: 1,
    }
}