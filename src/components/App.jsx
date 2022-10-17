import { useState, useEffect } from 'react';
import { nanoid } from "nanoid";

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Message } from './App.styled';


export function App() {
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');
  
// локал сторидж
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
  // додавання контакту
  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    
    contacts.find(contact => newContact.name.toLowerCase() === contact.name.toLowerCase())
      ? alert(
        `${newContact.name} is already in the contact list`
      )
      : setContacts(prevContacts => [newContact, ...prevContacts]);
      };
  
  // функція зміни стану фільтру
  const changeFilter = e => setFilter(e.currentTarget.value);

  // фільтрує і повертає результат
  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  // видалення контакту
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId));
  };

    return (
  <div>
      <h1>Phonebook</h1>
       <ContactForm  onSubmit={addContact}/>

      <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilter} />
      {/*рендер або сповіщення в разі порожнього списку контактів  */}
        {contacts.length > 0 ? (
        <ContactList
          contacts={filtredContacts()}
          onDeleteContact={deleteContact}
          />
        ) : (
            <Message>Contact list is empty</Message>
        )}
        
    </div>
)
  
}; 

  