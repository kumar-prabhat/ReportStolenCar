import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resolveStolenCase, checkCase } from '../../actions/stolenCase';

const CaseList = ({ stolencases, pending, resolveStolenCase, checkCase }) => {
  const handleCase = (e) => {
    resolveStolenCase(e.target.value);
    checkCase();
  };

  const cases = stolencases.map((car) => (
    <tr key={car._id}>
      <td>{car.name}</td>
      <td className='hide-sm'>{car.ownerName}</td>
      <td>{car.registration}</td>
      <td className='hide-sm'>{car.color}</td>
      <td className='hide-sm'>{car.description}</td>
      {pending && (
        <td>
          <button
            className='btn btn-primary'
            style={{ width: '8rem' }}
            value={car._id}
            onClick={handleCase}
          >
            Resolve{' '}
            {!car.assignee && (
              <i
                className='fa fa-exclamation-circle'
                title='This case is not assigned yet,wait until the police will be free to take this case.'
              ></i>
            )}
          </button>
        </td>
      )}
    </tr>
  ));
  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='hide-sm'>Owner Name</th>
            <th>Registration Number</th>
            <th className='hide-sm'>Color</th>
            <th className='hide-sm'>Description</th>
            {pending && <th>Action</th>}
          </tr>
        </thead>
        <tbody>{cases}</tbody>
      </table>
    </Fragment>
  );
};

CaseList.propTypes = {
  stolencases: PropTypes.array.isRequired,
  resolveStolenCase: PropTypes.func.isRequired,
  checkCase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stolencases: state.stolencase.stolencases,
});

export default connect(mapStateToProps, { resolveStolenCase, checkCase })(
  CaseList
);
