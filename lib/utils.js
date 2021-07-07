import { useState, useEffect } from 'react';

import styles from './utils.module.css'

// Hook
export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}



export const RainbowText = ({ children }) => {
    return (
        <span className={styles.rainbowText}>{children}</span>
    )
}


export const mapNum = (value, x1, x2, y1, y2) => {
    return ((value - x1) * (y2 - y1) / (x2 - x1)) + y1
}


export let useScreenWidth = () => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        window.addEventListener('resize', setWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', setWidth(window.innerWidth));
        }
    }, []);

    return width;
}