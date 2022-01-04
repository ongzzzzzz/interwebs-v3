const withPlugins = require('next-compose-plugins')

const remarkMath = require('remark-math')
const remarkPrism = require('remark-prism')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkMath, remarkPrism],
        rehypePlugins: [rehypeKatex, rehypePrism]
    }
})

module.exports = withPlugins([
    [withMDX({ pageExtensions: ['js', 'jsx', 'md', 'mdx'] })],
])