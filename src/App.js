import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI.js';

class App extends Component {
  state = {
    screen: 'list',
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
      { this.state.screen === 'list' && (
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          onNavigate={ () =>{
            this.setState({ screen: 'create' })}
          }
        />
      )}
      { this.state.screen === 'create' && (
        <CreateContact />
      )}
      </div>
    )
  }
}

export default App;
