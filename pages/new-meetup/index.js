import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetup) => {
    const result = await fetch('/api/new-meetup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredMeetup),
    });

    const data = await result.json();

    console.log(data);

    router.push('/');
  };
  return (
    <>
      <Head>
        <title>React-NestJS-Add new meetup</title>
        <meta
          name="description"
          content="React-NestJS-Add new meetup description"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetup;
