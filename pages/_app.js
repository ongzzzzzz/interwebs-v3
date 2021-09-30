import '../styles/globals.css'

import { MDXProvider } from "@mdx-js/react";


const components = {
  h1: (({ children }) => <h1 className="font-bold text-2xl">{children}</h1>),
  h2: (({ children }) => <h1 className="font-bold text-xl">{children}</h1>),
  h3: (({ children }) => <h1 className="font-bold text-lg">{children}</h1>),
  h4: (({ children }) => <h1 className="font-bold text-base">{children}</h1>),
  h5: (({ children }) => <h1 className="font-bold text-sm">{children}</h1>),
  h6: (({ children }) => <h1 className="font-bold text-xs">{children}</h1>),
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  )
}


