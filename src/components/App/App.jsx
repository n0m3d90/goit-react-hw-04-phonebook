import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { RiContactsBookFill } from "react-icons/ri";
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { ContactFilter } from '../Filter/Filter';
import { Container, Title, Span, SubTitle, Text } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  ]);
  const [filter, setFilter] = useState('');

  const addContacts = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    if (contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      alert(`${newContact.name} вже існує`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const findContacts = e => {
    setFilter(e.target.value);
  };

  const deleteContacts = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const viewContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const visibleContacts = viewContacts();

  return (
    <Container>
      <RiContactsBookFill style={{ width: '100px', height: '100px', color: '#3373e2' }} />
      <Title>Phone<Span>book</Span></Title>
      <ContactForm setContacts={addContacts} />
      <SubTitle>Contacts List</SubTitle>
      <ContactFilter value={filter} findContacts={findContacts} />

      {visibleContacts.length === 0 ? (
        <Text>Sorry, you don't have any contacts.</Text>
      ) : (
        <ContactList data={visibleContacts} deleteContacts={deleteContacts} />
      )}
    </Container>
  );
};
