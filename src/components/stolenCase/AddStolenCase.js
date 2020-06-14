import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addStolenCase } from '../../actions/stolenCase';

const AddStolenCase = ({ addStolenCase }) => {
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    registration: '',
    description: '',
    color: '',
  });

  const { name, ownerName, registration, description, color } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Register Stolen Case</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Register the case and assign to
        the police
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addStolenCase(formData);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Car Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Owner Name'
            name='ownerName'
            value={ownerName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Registration Number'
            name='registration'
            value={registration}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Color'
            name='color'
            value={color}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

AddStolenCase.propTypes = {
  addStolenCase: PropTypes.func.isRequired,
};

export default connect(null, { addStolenCase })(AddStolenCase);
