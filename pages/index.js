import { MongoClient } from 'mongodb';
import Head from 'next/head';
import React from 'react';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React-NestJS-Meetups</title>
        <meta name="description" content="React-NestJS-Meetups description" />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   //   console.log(req);
//   //   console.log(req.path, res);
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // const result = await fetch('/api/meetups');
  // // const meetupList = await result.json();
  // console.log(result);

  const clint = await MongoClient.connect(
    'mongodb+srv://mohelmy:UbAjOU2012bZD9HC@cluster0.s13ivsk.mongodb.net/meetup1?retryWrites=true&w=majority'
  );
  const db = clint.db();
  const meetupsCollection = db.collection('meetups');
  const meetupList = await meetupsCollection.find().toArray();
  clint.close();
  // console.log(meetupList);
  return {
    props: {
      // meetups: meetupList,
      meetups: meetupList.map((m) => ({
        title: m.title,
        image: m.image,
        address: m.address,
        description: m.description,
        id: m._id.toString(),
      })),
    },
    revalidate: 2,
  };
};

export default HomePage;
