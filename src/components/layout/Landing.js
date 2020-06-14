import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Report for Stolen Car</h1>
          <p className='lead'>
            If your car has been stolen then you are at right place, You can
            register a case and we will find it soon!!
          </p>
          <div className='buttons'>
            <Link to='/addcase' className='btn btn-primary'>
              Register Stolen Case
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
