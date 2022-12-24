import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  //   if (req.method === 'GET') {
  const clint = await MongoClient.connect(
    'mongodb+srv://mohelmy:UbAjOU2012bZD9HC@cluster0.s13ivsk.mongodb.net/meetup1?retryWrites=true&w=majority'
  );
  const db = clint.db();
  const meetupsCollection = db.collection('meetups');
  const meetupList = await meetupsCollection.find().toArray();
  const meetups = meetupList.map((m) => ({
    title: m.title,
    image: m.image,
    address: m.address,
    description: m.description,
    id: m._id.toString(),
  }));
  clint.close();

  console.log(meetups);

  res.status(200).json(meetups);
  //   }
};

export default handler;
