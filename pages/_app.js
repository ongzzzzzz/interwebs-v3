import '../styles/globals.css'
import Image from 'next/image'

import firebase from '../lib/firebase'

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

import { MDXProvider } from "@mdx-js/react";
const components = {
  p: (({ children }) => <p className="my-2">{children}</p>),
  a: (({ href, children }) => <a href={href} target="_blank" className="underline hover:text-blue-400">{children}</a>),
  img: (({ src, children }) => <img src={src} className="mx-auto my-2"/>),
  h1: (({ children }) => <h1 className="font-bold mt-8 underline text-3xl">{children}</h1>),
  h2: (({ children }) => <h2 className="font-bold my-2 underline text-xl">{children}</h2>),
  h3: (({ children }) => <h3 className="font-bold my-2 text-lg">{children}</h3>),
  h4: (({ children }) => <h4 className="font-bold my-2 text-base">{children}</h4>),
  h5: (({ children }) => <h5 className="font-bold my-2 text-sm">{children}</h5>),
  h6: (({ children }) => <h6 className="font-bold my-2 text-xs">{children}</h6>),
  ul: (({ children }) => <ul className="list-disc my-2">{children}</ul>),
  ol: (({ children }) => <ol className="list-decimal my-2">{children}</ol>),
  blockquote: (({ children }) => <blockquote className="border-8 border-black border-l-blue-500 pl-5 my-2">{children}</blockquote>),
};

import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config'

export default function App({ Component, pageProps }) {
  return (
    <>
      <MDXProvider components={components}>
        <DefaultSeo {...SEO}/>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  )
}


