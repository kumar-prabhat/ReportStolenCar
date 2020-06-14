import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPolice } from '../../actions/police';
import Policeitem from './PoliceItem';

const PoliceList = ({ getAllPolice }) => {
  useEffect(() => {
    getAllPolice();
  }, [getAllPolice]);

  return (
    <Fragment>
      <h1 className='large text-primary'>All Police</h1>
      <Policeitem />
    </Fragment>
  );
};

PoliceList.propTypes = {
  getAllPolice: PropTypes.func.isRequired,
};

export default connect(null, { getAllPolice })(PoliceList);
