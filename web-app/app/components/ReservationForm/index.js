import React, { PureComponent } from 'react';

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

type Props = {
  +loading: boolean,
  +submitReservation: ({ name: string, phoneNumber: string }) => void,
  +errors: {
    +name: Array<string>,
    +phoneNumber: Array<string>,
  },
};

class ReservationForm extends PureComponent<Props> {
  onSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    const { submitReservation } = this.props;
    const formData = new window.FormData(e.currentTarget);

    const name = formData.get('name');
    const phoneNumber = formData.get('phoneNumber');

    submitReservation({ name, phoneNumber });
  };

  render() {
    const { loading = false, errors } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" name="name" />
          </label>
          {errors.name.length > 0 && <div>{inputError(errors.name).join(', ')}</div>}
        </div>
        <div>
          <label htmlFor="phoneNumber">
            Mobile Number:
            <input type="text" id="phoneNumber" name="phoneNumber" />
          </label>
          {errors.phoneNumber.length > 0 && <div>{inputError(errors.phoneNumber).join(', ')}</div>}
        </div>
        <div>
          <button type="submit">
            Submit
            {loading ? 'ting...' : ''}
          </button>
        </div>
      </form>
    );
  }
}

export default ReservationForm;
