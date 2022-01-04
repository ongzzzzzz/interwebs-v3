import { firebaseAdmin, db } from '../../../lib/firebaseAdmin';

// ongzz.ml/api/views/post-title

export default async (req, res) => {
    try {
        let { post } = req.query;
        post = decodeURIComponent(post)
        let doc = await db.collection('blogs').doc(post).get();

        if (!doc.exists) {
            db.collection('blogs').doc(post).set({
                views: 0, likes: 0
            })
            res.status(200).json({ views: 0, likes: 0 })
            return;
        } 

        let postData = doc.data();
        if (process.env.NODE_ENV === 'development') {
            res.status(200).json({ views: postData.views, likes: postData.likes })
            return;
        }
        else {
            db.collection('blogs').doc(post).set({
                views: firebaseAdmin.firestore.FieldValue.increment(1)
            }, {merge: true}).then(() => {
                res.status(200).json({ views: postData.views+1, likes: postData.likes })
            })
        }
        return;
    } catch (e) {
        console.error(e)
        res.status(400).json({ e });
        return;
    }
}
