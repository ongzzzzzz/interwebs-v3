import Link from 'next/link'
import Fade from 'react-reveal/Fade';

import humanizeDuration from 'humanize-duration'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faClock, faCalendar, faUserCircle, faEye } from '@fortawesome/free-regular-svg-icons'

export default function Blog({ posts }) {

    return (
        <Fade bottom opposite cascade>
            <div className="-z-20 flex flex-col w-4/5 md:w-3/5 h-100 relative md:absolute md:top-1/3 md:left-2 mt-4 mx-auto md:m-0">
                <Link href="/blog"><a className="underline text-md md:text-6xl md:p-5 md:text-left hover:text-blue-500 transition">
                    Blog <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a></Link>
                <div className="flex flex-col h-fit">
                    {posts.map(post => (
                        <Link href={`/blog/${post.path}`} key={post.title}>
                            <div className="flex flex-col md:flex-row bg-gray-800 hover:bg-gray-600 bg-opacity-50 transition my-2 md:mx-2 cursor-pointer rounded-lg">

                                <div className="w-full md:w-1/2 flex flex-col justify-around">
                                    <div className="text-center text-xl md:text-3xl underline p-2">
                                        <a href={`/blog/${post.path}`}>{post.title}</a>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between p-2">
                                        <p className="text-xs md:text-base">
                                            <FontAwesomeIcon icon={faClock} /> {humanizeDuration(post.length)} read
                                        </p>
                                        <p className="text-xs md:text-base">
                                            <FontAwesomeIcon icon={faEye} /> {post.views} views
                                        </p>
                                        <p className="text-xs md:text-base">
                                            <FontAwesomeIcon icon={faCalendar} /> {post.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 p-2 text-sm md:text-base flex items-center">
                                    {post.blurb}
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Fade>
    )
}
