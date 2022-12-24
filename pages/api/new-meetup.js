import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const clint = await MongoClient.connect(
      'mongodb+srv://mohelmy:UbAjOU2012bZD9HC@cluster0.s13ivsk.mongodb.net/meetup1?retryWrites=true&w=majority'
    );
    const db = clint.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    clint.close();

    res.status(201).json({ message: 'meetup created successfully' });
  }
};

export default handler;
