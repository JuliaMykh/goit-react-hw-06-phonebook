import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Message } from './App.styled';
import { useSelector } from 'react-redux';

export function App() {
  const  contacts  = useSelector(state => state.contacts);

  return (

    <>
    
      <h1>Phonebook</h1>
        <ContactForm  />

      <h2>Contacts</h2>
        <Filter  />
      
        {contacts.length > 0 ? (
        <ContactList/>
        ) : (
            <Message>Contact list is empty</Message>
          )}
      
    </>
)
  
}; 

  