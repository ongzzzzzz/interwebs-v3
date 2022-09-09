import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faTwitter, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

export default function Footer({}) {

    return (
        <div style={{ height: "50px", backgroundColor: "#272727" }}
            className="relative bottom-0 w-full flex flex-row justify-center items-center text-base md:text-2xl text-white">
            <h1 className="text-xs md:text-lg text-right m-2">© {new Date().getFullYear()} Ong Zhi Zheng</h1>
            <div className="text-xl flex flex-row justify-evenly items-center">
                <Link href="https://github.com/ongzzzzzz/" target="_blank"><a>
                    <FontAwesomeIcon icon={faGithub} className="m-1 transition hover:text-black" />
                </a></Link>
                <Link href="https://www.instagram.com/ong.zhi.zheng/" target="_blank"><a>
                    <FontAwesomeIcon icon={faInstagram} className="m-1 transition hover:text-pink-500" />
                </a></Link>
                <Link href="https://twitter.com/ongzzzzzz" target="_blank"><a>
                    <FontAwesomeIcon icon={faTwitter} className="m-1 transition hover:text-blue-500" />
                </a></Link>
                <Link href="https://www.linkedin.com/in/ongzz/" target="_blank"><a>
                    <FontAwesomeIcon icon={faLinkedin} className="m-1 transition hover:text-blue-800" />
                </a></Link>
                <Link href="https://discordapp.com/users/486858222762983425" target="_blank"><a>
                    <FontAwesomeIcon icon={faDiscord} className="m-1 transition hover:text-indigo-600" />
                </a></Link>
                <Link href="mailto:ongzhizheng@gmail.com"><a>
                    <FontAwesomeIcon icon={faEnvelope} className="m-1 transition hover:text-red-600" />
                </a></Link>
            </div>
        </div>
    )
}
