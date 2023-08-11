import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.NEXT_PUBLIC_DATABASE_USER}:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@${process.env.NEXT_PUBLIC_DATABASE}/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const coll = client.db('banwords').collection('lgbtqplus');
    const cursor = coll.find();
    const result = await cursor.toArray();
    await client.close();
    let newres = [];
    for(let i =0; i <result.length;i++){
 newres.push(result[i].text)
    }
    res.status(200).json(newres)
}
