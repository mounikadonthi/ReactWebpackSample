import { Contact } from '../model/Contact';

export default interface IService {
    getAllContacts(): Promise<Contact[]>;
    addContact(newContact: Contact): Promise<void>;
    updateContact(updateContact: Contact): Promise<void>;
    findSelectedContact(contactId: number): Promise<Contact>;
    deleteContact(id: number): Promise<void>;
}