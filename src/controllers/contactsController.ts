import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Contact } from '../models/Contact';
import fs from 'fs';
import path from 'path';

const contactsPath = path.join(__dirname, '..', '..', 'data', 'contacts.json');
const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf-8'));

export const getContacts = (req: Request, res: Response) => {
  res.statusCode = 200;
  res.send(contacts);
};

export const getContactById = (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = contacts.find((contact: Contact) => contact.id === id);

  if (!contact) {
    res.status(404);
    res.send({ message: 'Contact not found' });
    return;
  }

  res.statusCode = 200;
  res.send({ contact });
};

export const addContact = (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  const newContact: Contact = {
    id: nanoid(16),
    name,
    email,
    phone,
  };

  if (!name || !phone) {
    res.status(400);
    res.send({ message: 'Contact name and phone must be inserted' });
    return;
  }

  contacts.push(newContact);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts));

  res.statusCode = 201;
  res.send({ message: 'Contact added successfully', contactId: newContact.id });
};

export const editContact = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const contactIndex = contacts.findIndex(
    (contact: Contact) => contact.id === id
  );

  if (contactIndex === -1) {
    res.status(404);
    res.send({ message: 'Contact not found' });
    return;
  }

  if (!name || !phone) {
    res.status(400);
    res.send({ message: 'Contact name and phone must be inserted' });
    return;
  }

  contacts[contactIndex] = {
    ...contacts[contactIndex],
    name,
    email,
    phone,
  };

  fs.writeFileSync(contactsPath, JSON.stringify(contacts));

  res.statusCode = 200;
  res.send({ message: 'Contact updated successfully' });
};

export const deleteContact = (req: Request, res: Response) => {
  const { id } = req.params;

  const contactIndex = contacts.findIndex(
    (contact: Contact) => contact.id === id
  );

  if (contactIndex === -1) {
    res.status(404);
    res.send({ message: 'Contact not found' });
    return;
  }

  contacts.splice(contactIndex, 1);
  fs.writeFileSync(contactsPath, JSON.stringify(contacts));

  res.statusCode = 200;
  res.send({ message: 'Contact deleted successfully' });
};

export const deleteAllContacts = (req: Request, res: Response) => {
  contacts.splice(0, contacts.length);

  res.statusCode = 200;
  res.send({ message: 'All contacts deleted successfully' });
};
