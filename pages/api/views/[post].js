import { firebaseAdmin, db } from '../../../lib/firebaseAdmin';

// ongzz.ml/api/views/post-title

export default async (req, res) => {
    try {
        let { post } = req.query;
        post = decodeURIComponent(post)
        let postData = (await db.collection('blogs').doc(post).get()).data();

        db.collection('blogs').doc(post).update({
            views: firebaseAdmin.firestore.FieldValue.increment(1)
        }).then(() => {
            res.status(200).json({ views: postData.views+1, likes: postData.likes })
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({ e });
    }
}
