import Link from 'next/link'

import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default function Header({ isMobile }) {

    let [isOpen, toggleHeader] = useState(false);

    return (
        <div style={{ height: isMobile ? "fit-content" : "50px", backgroundColor: "#272727" }}
            className="w-full text-2xl text-white flex flex-col md:flex-row-reverse"
        >

            <div className={
                isMobile
                    ? `w-full flex flex-col text-center overflow-hidden transition-all ${isOpen ? "max-h-24" : "max-h-0"}`
                    : `w-1/2 flex flex-row justify-around items-center`
            }>
                <Link href="/"><a>
                    Home
                </a></Link>
                <Link href="/wip"><a>
                    Blog
                </a></Link>
                <Link href="/wip"><a>
                    Projects
                </a></Link>
            </div>

            {isMobile &&
                <FontAwesomeIcon icon={faBars} className="m-5"
                    onClick={() => toggleHeader(!isOpen)}
                />
            }
        </div>
    )


}