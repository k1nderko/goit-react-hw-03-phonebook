import { Component } from 'react';

import { STORAGE_KEY } from '../constants/common';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(STORAGE_KEY);

    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = id => {
    this.setState(prev => ({
      ...prev,
      contacts: prev.contacts.filter(item => item.id !== id),
    }));
  };

  changeFilter = value => {
    this.setState(prev => ({
      ...prev,
      filter: value,
    }));
  };

  filterContacts = (filter, contacts) => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addNewContact = newContact => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return false;
    }
    this.setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, newContact],
    }));
    return true;
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.addNewContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          list={this.filterContacts(this.state.filter, this.state.contacts)}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
