import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPendingCases } from '../../actions/stolenCase';
import CaseList from './CaseList';

const PendingCase = ({ getPendingCases }) => {
  useEffect(() => {
    getPendingCases();
  }, [getPendingCases]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Pending Cases</h1>
      <CaseList pending={true} />
    </Fragment>
  );
};

PendingCase.propTypes = {
  getPendingCases: PropTypes.func.isRequired,
};

export default connect(null, { getPendingCases })(PendingCase);
