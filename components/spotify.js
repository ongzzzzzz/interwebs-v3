import Link from 'next/image'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'

import useSWR from 'swr'
const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};

export default function Spotify({ isMobile }) {

    const { data } = useSWR(`/api/spotify`, fetcher, { refreshInterval: 1000 });

    if (data) {

        return (
            <div className={`relative mx-auto mb-4 md:m-0 md:absolute md:w-1/3 md:left-0 md:bottom-20 w-4/5 flex flex-row justify-center md:justify-evenly items-center`}>

                <img className="rounded-full w-16 md:w-1/4 h-auto mr-2 md:mr-0"
                    alt="Spotify Album Cover"
                    src={data.playing ? data.image : "/static/spotify.png"}
                />

                <div className={`w-max max-w-3/5 md:w-3/5 ${data.playing ? "flex flex-col" : ""}`}>
                    <a target="_blank" href={data.playing ? data.link : "https://open.spotify.com/user/ongzhizheng"}>
                        <h1 className="text-md md:text-3xl">
                            {data.playing ? data.song : "I'm not listening to Spotify right now."}
                        </h1>
                    </a>
                    {data.playing && <h2 className="text-xs md:text-base">
                        <FontAwesomeIcon icon={faSpotify} className="text-green-500" />{" "}{data.artists}
                    </h2>}
                </div>

            </div>
        )

    } else { return <div></div> }
}
