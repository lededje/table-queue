import React, { PureComponent } from 'react';
import noop from 'lodash/noop';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';
import propTypes from 'prop-types';
import fetch from 'universal-fetch';

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

const BookingForm = ({ loading, onSubmit, errors }) => (
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

BookingForm.propTypes = {
  loading: propTypes.bool,
  onSubmit: propTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  errors: propTypes.object,
};

BookingForm.defaultProps = {
  loading: false,
  onSubmit: noop,
  errors: {},
};

class BookATable extends PureComponent {
  state = {
    loading: false,
    bookingCompleted: false,
    name: '',
    phoneNumber: '',
    errors: {},
  };

  static async getInitialProps({ req, query }) {
    let host = '';

    const isServer = !!req;

    if (isServer) {
      const protocol = req.connection.encrypted ? 'https://' : 'http://';
      host = `${protocol}${req.headers.host}`;
    }

    const { restaurantIndicator } = query;

    const id = parseInt(restaurantIndicator, 10);

    const restaurantApiPath = !isNaN(id)
      ? `${host}/api/restaurants/${id}`
      : `${host}/api/restaurants?slug=${restaurantIndicator}`;

    const restaurant = await fetch(restaurantApiPath).then((response) => {
      if (
        response.headers.get('content-type')
        && response.headers.get('content-type').search('application/json') >= 0
      ) {
        return response.json().then((data) => {
          if (response.status !== 201) {
            return { errors: data };
          }
          return data;
        });
      }
      return {};
    });

    return restaurant;
  }

  submitBooking = async ({ restaurantId, name, phoneNumber }) => {
    this.setState({
      loading: true,
      name,
      phoneNumber,
    });
    const reservation = await fetch('/api/reservations', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        restaurantId,
        name,
        phoneNumber,
      }),
    }).then((response) => {
      if (
        response.headers.get('content-type')
        && response.headers.get('content-type').search('application/json') >= 0
      ) {
        return response.json().then((data) => {
          if (response.status !== 201) {
            return { errors: data };
          }
          return data;
        });
      }
      return {};
    });

    this.setState({
      loading: false,
      bookingCompleted: isEmpty(reservation.errors),
      name: reservation.name,
      phoneNumber: reservation.phoneNumber,
      errors: get(reservation, 'errors', {}),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.querySelector('[name="name"]').value;
    const phoneNumber = e.target.querySelector('[name="phoneNumber"]').value;

    this.submitBooking({
      restaurantId: 1,
      name,
      phoneNumber,
    });
  };

  render() {
    const {
      loading, bookingCompleted, name, phoneNumber, errors,
    } = this.state;
    return (
      <>
        <h1>Reservations</h1>
        {!bookingCompleted ? (
          <BookingForm loading={loading} onSubmit={this.onSubmit} errors={errors} />
        ) : (
          <div>
            Booking submitted for
            {' '}
            {name}
            {' '}
(
            {phoneNumber}
            )
          </div>
        )}
      </>
    );
  }
}

export default BookATable;
