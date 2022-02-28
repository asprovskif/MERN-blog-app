import express from 'express';
import bodyParser from "body-parser";
import {MongoClient} from "mongodb";

const app = express();

app.use(bodyParser.json());


const withDb = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('my-blog');

        await operations(db);

        await client.close();
    } catch (e) {
        res.status(500).json({message: 'Error connecting to db', error: e})
    }
}

app.get('/api/articles/:name', async (req, res) => {
    await withDb(async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({name: articleName});

        res.status(200).json(articleInfo);
    }, res)
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    await withDb(async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({name: articleName});
        await db.collection('articles').updateOne({name: articleName}, {
            '$set': {
                upvote: articleInfo.upvote + 1
            }
        })
        const updatedArticleInfo = await db.collection('articles').findOne({name: articleName});

        res.status(200).json(updatedArticleInfo);
    }, res)


})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    withDb(async (db) => {
        const articleInfo = await db.collection('articles').findOne({name: articleName});
        await db.collection('articles').updateOne({name: articleName}, {
            '$set': {
                comments: articleInfo.comments.concat({username, text})
            }
        })
        const updatedArticleInfo = await db.collection('articles').findOne({name: articleName});

        res.status(200).json(updatedArticleInfo);
    }, res)
})


app.listen(8000, () => {
    console.log('App is listening on port 8000')
})