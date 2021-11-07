import Link from 'next/link'

import Fade from 'react-reveal/Fade';

import styles from './projects.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'


export default function Projects({ featured }) {

    return (
        <Fade bottom opposite cascade>
            <div className="flex flex-col w-4/5 md:w-2/3 h-100 relative md:absolute md:bottom-20 md:right-2 mt-4 mx-auto md:m-0">
                <Link href="/wip"><a className="underline text-md md:text-6xl md:p-5 md:text-right hover:text-blue-500 transition">
                    Projects <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a></Link>
                <div className={`flex h-fit flex-col justify-center md:flex-row md:justify-between`}>
                    {
                        featured.slice(0, 3).map(proj => (
                            <div key={featured.indexOf(proj)} 
                                onClick={() => window.open(proj.link, '_blank')}
                                className="cursor-pointer flex justify-center items-center h-20 w-full rounded-xl bg-gray-400 my-2 md:h-80 md:w-1/3 md:rounded-3xl md:bg-gray-400 md:m-2 text-white hover:text-blue-500"
                                style={{ backgroundColor: 'transparent', backgroundImage: `url(${proj.img})`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                            >
                                <div className={styles.projDiv}>
                                    <div className="hidden transition text-base md:text-6xl">
                                        <a href={proj.link} target="_blank">
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                        </a>
                                    </div>
                                    <h2 className="block transition text-3xl font-black">{proj.name}</h2>
                                    <p className="hidden transition md:block">{proj.desc}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fade>
    )
}
