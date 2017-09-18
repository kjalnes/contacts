import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI.js';

class App extends Component {
  state = {
    contacts: []
  }

  removeContact = (contact) => {
    this.setState( (prevState) => ({
        contacts: prevState.contacts.filter( c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  }

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      return this.setState({contacts})
    })
  }


  render() {
    return (
      <div>
        <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact} />
      </div>
    )
  }
}

export default App;
