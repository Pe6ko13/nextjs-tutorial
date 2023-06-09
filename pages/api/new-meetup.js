import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            `mongodb+srv://${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}@pe6ko13.vdbvpbl.mongodb.net/meetups?retryWrites=true&w=majority`
        );
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: 'Meetups inserted!' });
    }
}

export default handler;
