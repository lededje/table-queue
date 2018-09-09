import React from 'react';
import propTypes from 'prop-types';
import noop from 'lodash/noop';

const inputError = errors => errors.map((error) => {
  switch (error) {
    case 'NOT_EMPTY':
      return 'This field is required and cannot be empty';
    case 'IS_NAME':
      return 'This field can only contain alphabetical characters, single quotes, spaces or dashes';
    case 'IS_NUMERIC':
      return 'This field can only contain numeric characters';
    default:
      return "There is an issue with this field; that's all we know";
  }
});

const ReservationForm = ({ loading, onSubmit, errors }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="name">
        Name:
        <input type="text" id="name" name="name" />
      </label>
      {errors.name && <div>{inputError(errors.name).join(', ')}</div>}
    </div>
    <div>
      <label htmlFor="phoneNumber">
        Mobile Number:
        <input type="text" id="phoneNumber" name="phoneNumber" />
      </label>
      {errors.phoneNumber && <div>{inputError(errors.phoneNumber).join(', ')}</div>}
    </div>
    <div>
      <button type="submit">
        Submit
        {loading ? 'ting...' : ''}
      </button>
    </div>
  </form>
);

ReservationForm.propTypes = {
  loading: propTypes.bool,
  onSubmit: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: propTypes.object,
};

ReservationForm.defaultProps = {
  loading: false,
  onSubmit: noop,
  errors: {},
};

export default ReservationForm;
