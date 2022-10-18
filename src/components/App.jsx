import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { changeFilter } from '../redux/filterSlice';
import { Message } from './App.styled';


export function App() {

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  // console.log(contacts);
  // console.log(filter);

  // додавання контакту
  const addContacts = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    // console.log(newContact.name);

    contacts.find(contact => newContact.name.toLowerCase() === contact.name.toLowerCase())
      ? alert(
        `${newContact.name} is already in the contact list`
      )
      : dispatch(addContact(newContact));;
      };
  
  // функція зміни стану фільтру
  const changeFilterField = e => dispatch(changeFilter(e.currentTarget.value));

  // фільтрує і повертає результат
  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  // видалення контакту
  const deleteSelectedContact = contactId => dispatch(deleteContact(contactId));
  // console.log(contacts.length);
  
  return (
      
  <div>
      <h1>Phonebook</h1>
        <ContactForm  onSubmit={addContacts}/>

      <h2>Contacts</h2>
        <Filter filter={filter} changeFilter={changeFilterField} />
      
        {contacts.length > 0 ? (
        <ContactList
          contacts={filtredContacts()}
          onDeleteContact={() => deleteSelectedContact()}
          />
        ) : (
            <Message>Contact list is empty</Message>
        )}
        
    </div>
)
  
}; 

  