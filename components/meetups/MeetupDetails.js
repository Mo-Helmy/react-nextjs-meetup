import React from 'react';

import classes from './MeetupDetails.module.css';

const MeetupDetails = ({ title, image, address, description }) => {
  return (
    <section className={classes.section}>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetails;
