import Link from 'next/link'

import styles from './header.module.css'

export default function Header({ children }) {

    return (
        <div className={styles.headerContainer}>
            <div className={styles.linksContainer}>
                <Link href="/">
                    Home
                </Link>
                <Link href="/blog">
                    Blog
                </Link>
                <Link href="/projects">
                    Projects
                </Link>
            </div>
        </div>
    )
}