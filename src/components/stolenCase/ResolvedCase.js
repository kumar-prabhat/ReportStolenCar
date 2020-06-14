import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getResolvedCases } from '../../actions/stolenCase';
import CaseList from './CaseList';

const ResolvedCase = ({ getResolvedCases }) => {
  useEffect(() => {
    getResolvedCases();
  }, [getResolvedCases]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Resolved Cases</h1>
      <CaseList />
    </Fragment>
  );
};

ResolvedCase.propTypes = {
  getResolvedCases: PropTypes.func.isRequired,
};

export default connect(null, { getResolvedCases })(ResolvedCase);
