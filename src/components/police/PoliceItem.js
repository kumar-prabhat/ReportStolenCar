import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PoliceItem = ({ allPolice }) => {
  const police = allPolice.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.designation}</td>
      <td>{item.status}</td>
    </tr>
  ));
  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{police}</tbody>
      </table>
    </Fragment>
  );
};

PoliceItem.propTypes = {
  allPolice: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allPolice: state.police.police,
});

export default connect(mapStateToProps)(PoliceItem);
