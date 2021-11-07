// 29-09-2021 ==> 09-29-2021
export const swapMonthDate = (d) => new Date([d.split("-")[1], d.split("-")[0], ...d.split("-").splice(2)].join("-")).getTime()

export const getLatestPosts = async (limit = 0) => {
    const path = require('path')
    const fs = require('fs')
    const { db } = require('./firebaseAdmin')

    let blogPath = path.join(process.cwd(), "pages/blog")

    let _postDatas = fs.readdirSync(blogPath).map(blog => {
        return { path: blog.split('.')[0], ...require(`../pages/blog/${blog}`).meta }
    })

    let postDatas = [];
    for (const post of _postDatas) {
        let doc = await db.collection('blogs').doc(post.path).get()
        if (doc.exists) {
            let data = doc.data()
            postDatas.push({ ...post, views: data.views, likes: data.likes })
        }
        else {
            db.collection('blogs').doc(post.path).set({
                views: 0,
                likes: 0
            })
            postDatas.push({ ...post, views: 0, likes: 0 })
        }
    }

    postDatas.sort((a, b) => {
        let d_a = swapMonthDate(a.date);
        let d_b = swapMonthDate(b.date);
        return (d_a < d_b ? 1 : (d_a > d_b ? -1 : 0))
    })

    if (limit > 0) { postDatas = postDatas.slice(0, limit) }
    return postDatas;
}