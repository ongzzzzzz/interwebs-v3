import Link from 'next/link'

import Fade from 'react-reveal/Fade';


export default function Projects({ isMobile }) {

    let divStyle = "flex justify-center items-center h-20 w-full rounded-xl bg-gray-400 my-2 md:h-80 md:w-1/3 md:rounded-3xl md:bg-gray-400 md:m-2";

    return (
        <Fade bottom opposite cascade>
            <div className="flex flex-col w-4/5 md:w-2/3 h-100 relative md:absolute md:bottom-20 md:right-2 mt-4 mx-auto md:m-0">
                <Link href="/wip"><a className="underline text-md md:text-6xl md:p-5 md:text-right">Projects</a></Link>
                {!isMobile && <br />}
                <div className={`flex h-fit flex-col justify-center md:flex-row md:justify-between`}>
                    <div className={divStyle}>coming soon</div>
                    <div className={divStyle}>coming soon</div>
                    <div className={divStyle}>coming soon</div>
                </div>
            </div>
        </Fade>
    )
}
