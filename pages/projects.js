import Header from '../components/header'
import Footer from '../components/footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import { NextSeo } from 'next-seo';

export default function Projects({ projects }) {

    return (
        <div>
            <NextSeo
                title="ongzz's projects"
                description="some fun stuff"
                openGraph={{
                    title: "ongzz's projects",
                    description: "some fun stuff",
                    type: 'website',
                    url: 'https://ongzz.ml/projects', site_name: 'ongzz',
                    images: [{ url: 'https://ongzz.ml/index.png' }]
                }}
                twitter={{ handle: '@ongzzzzzz', site: '@ongzzzzzz', cardType: 'summary_large_image' }}
            />
            <Header />

            <div className="relative bg-black text-white h-auto w-full min-h-screen overflow-x-hidden px-5">
                <h1 className="text-lg md:text-3xl mt-5">🌈 some fun stuff i've worked on:</h1>

                <div className="flex flex-wrap justify-center w-full">
                    {projects.map((project, i) => (
                        <div key={i} className="rounded-lg m-5 w-full md:w-1/5 bg-blue-400"
                            style={{ boxShadow: '3px 8px 5px 5px rgba(169, 169, 169, 0.25)' }}
                        >
                            <div className="w-full md:h-[200px] rounded-t-lg">
                                <img src={project.img} className="w-full md:h-[200px] object-cover rounded-t-lg" />
                            </div>
                            <div className="p-2">
                                <h1>
                                    <a href={project.link} target="_blank" className="text-xl font-black">
                                        <span className="text-xl underline font-black">{project.name}{" "}</span>
                                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    </a>
                                </h1>
                                <p>{project.desc}</p>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}


import axios from "axios";
export async function getStaticProps(ctx) {
    try {
        // get featured projects
        let res = await axios.post("https://firestore.googleapis.com/v1/projects/fogeinator/databases/(default)/documents:runQuery", {
            structuredQuery: {
                from: [{ collectionId: "projects" }],
                select: {
                    fields: [{ fieldPath: "name" }, { fieldPath: "desc" }, { fieldPath: "img" }, { fieldPath: "link" }, { fieldPath: "date" }],
                },
            },
        });

        let projects = res.data.map(doc => {
            Object.keys(doc.document.fields).forEach(key => {
                if (key == "date") doc.document.fields[key] = doc.document.fields[key].timestampValue;
                else doc.document.fields[key] = doc.document.fields[key].stringValue;
            })
            return doc.document.fields;
        }).sort((a, b) => new Date(b.date) - new Date(a.date))

        return {
            props: { projects },
            revalidate: 30 * 60, // every 30 minutes
        }
    } catch (err) {
        console.error(err);
        return {
            props: { projects: [] },
        }
    }
}