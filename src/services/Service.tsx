import IService from '../services/IService';
import { ContactsList } from '../components/ContactsList';
import { Contact } from '../model/Contact';

let contact: Contact;

export default class Service implements IService {

    getAllContacts = (): Promise<Contact[]> => {
        let promise: any = new Promise(function (resolve, reject) {
            try {
                resolve(
                    ContactsList
                )
            }
            catch (e) {
                reject(e)
            }
        });
        return promise;
    }

    addContact = (newContact: Contact): Promise<void> => {
        let numb: any = new Promise(function (resolve, reject) {
            try {
                ContactsList.push(newContact);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
        return numb;
    }

    updateContact = (updateContact: Contact): Promise<void> => {
        return new Promise(function (resolve, reject) {
            try {
                ContactsList.map((scontact: Contact) => {
                    if (scontact.id === updateContact.id) {
                        scontact.name = updateContact.name;
                        scontact.email = updateContact.email;
                        scontact.mobile = updateContact.mobile;
                        scontact.landLine = updateContact.landLine;
                        scontact.webSite = updateContact.webSite;
                        scontact.address = updateContact.address;
                    }
                });
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }

    findSelectedContact = (contactId: number): Promise<Contact> => {
        return new Promise(function (resolve, reject) {
            try {
                ContactsList.map((key: any) => {
                    if (key.id === contactId) {
                        contact = key;
                    }

                });
                resolve(contact);
            }
            catch (error) {
                reject(error);
            }
        });

    }

    deleteContact = (id: number): Promise<void> => {
        return new Promise(function (resolve, reject) {
            try {
                let index: number = ContactsList.findIndex((contact) => contact.id === id);
                if (index > -1) {
                    ContactsList.splice(index, 1);
                };
                resolve();

            }
            catch (error) {
                reject(error);
            }
        });
    }
}
