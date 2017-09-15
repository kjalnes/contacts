import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegex from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim() });
    }

    resetQuery = () => {
        this.setState({query: ''})
    }

    render() {
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        let showingContacts;

        if(query) {
            const match = new RegExp(escapeRegex(query), 'i');
            showingContacts = contacts.filter( contact => match.test(contact.name));
        } else {
            showingContacts = contacts;
        }

        return (
            <div className='list-contacts'>
            { showingContacts.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now showing {showingContacts.length} out of {contacts.length} total.</span><button onClick={ this.resetQuery }>Show all</button>
                </div>
            )}

                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                <ol>
                    {showingContacts.map( contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}} />
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={ () => onDeleteContact(contact) } className='contact-remove'></button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

ListContacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts;
