import { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState(INITIAL_STATE);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name === '' || this.state.number === '') {
      alert('Some fields are empty');
      return;
    }

    const check = this.props.onSubmit({ ...this.state, id: nanoid() });
    if (!check) return;

    this.resetForm();
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="number">Number</label>
          <input
            type="tel"
            name="number"
            id="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
