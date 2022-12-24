import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout/Layout';
import MeetupDetails from '../../components/meetups/MeetupDetails';
import MeetupItem from '../../components/meetups/MeetupItem';

const MeetupPage = ({ meetup }) => {
  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetails
        title={meetup?.title}
        image={meetup?.image}
        address={meetup?.address}
        description={meetup?.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const clint = await MongoClient.connect(
    'mongodb+srv://mohelmy:UbAjOU2012bZD9HC@cluster0.s13ivsk.mongodb.net/meetup1?retryWrites=true&w=majority'
  );
  const db = clint.db();
  const meetupsCollection = db.collection('meetups');
  const meetupList = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // console.log(meetupList);

  clint.close();
  // console.log(meetupList);
  return {
    paths: meetupList.map((m) => ({ params: { meetupId: m._id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  const clint = await MongoClient.connect(
    'mongodb+srv://mohelmy:UbAjOU2012bZD9HC@cluster0.s13ivsk.mongodb.net/meetup1?retryWrites=true&w=majority'
  );
  const db = clint.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  // console.log({ ...meetup, id: meetup._id.toString() });
  clint.close();

  return {
    props: {
      meetup: {
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      },
    },
  };
};

export default MeetupPage;
