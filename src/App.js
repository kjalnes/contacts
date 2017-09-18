import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
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

    createContact(contact) {
        ContactsAPI.create(contact)
            .then( contact => {
                this.setState( state => ({
                    contacts: state.contacts.concat([contact])
            }))
        })
    }

    render() {
        return (
            <div className='app'>
                <Route exact path='/' render={ () => (
                    <ListContacts
                        contacts={this.state.contacts}
                        onDeleteContact={this.removeContact}
                    />
                )}/>
                <Route path='/create' render={ ( {history} ) =>
                    <CreateContact
                        onCreateContact={ (contact) => {
                            this.createContact(contact)
                            history.push('/');
                        }}
                    />
                }/>
            </div>
        )
    }
}

export default App;
