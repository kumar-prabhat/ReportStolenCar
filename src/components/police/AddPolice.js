import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPolice } from '../../actions/police';

const AddPolice = ({ addPolice }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
  });

  const { name, designation, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add police</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add police who will solve the
        case
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addPolice(formData);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Designation'
            name='designation'
            value={designation}
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

AddPolice.propTypes = {
  addPolice: PropTypes.func.isRequired,
};

export default connect(null, { addPolice })(AddPolice);
