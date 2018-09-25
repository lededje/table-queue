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
  +submitReservation: ({ name: string, phoneNumber: string }) => void,
};

type State = {
  +loading: boolean,
  +errors: {
    name: Array<string>,
    phoneNumber: Array<string>,
  },
};

class ReservationForm extends PureComponent<Props, State> {
  state = {
    loading: false,
    errors: {
      name: [],
      phoneNumber: [],
    },
  };

  onSubmit = async (e: SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { submitReservation } = this.props;
    const formData = new window.FormData(e.currentTarget);

    const name = formData.get('name');
    const phoneNumber = formData.get('phoneNumber');

    this.setState({
      loading: true,
    });

    await submitReservation({ name, phoneNumber }).finally(() => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading = false, errors } = this.state;
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
