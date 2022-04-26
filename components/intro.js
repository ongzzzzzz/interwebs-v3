import Image from 'next/image'

import { RainbowText } from '../lib/utils'
// import profilePic from '../public/picrew.png'
import profilePic from '../public/pfp.png'

export default function Intro({}) {

    return (
        <div className="flex justify-center flex-col text-3xl md:text-5xl text-center relative md:absolute my-8 mx-auto md:ml-24 md:mt-20 w-4/5 md:w-1/3">
            <div className="max-w-sm mx-auto h-auto px-10 md:px-20">
                <Image className="rounded-full" src={profilePic} alt="whatsup"/>
            </div>
            <h1 className="">Hi! I'm <b>Zhi Zheng</b>.</h1>
            <h1 className="">
                <b>Student · <RainbowText>Explorer</RainbowText></b>
            </h1>
        </div>
    )
}
