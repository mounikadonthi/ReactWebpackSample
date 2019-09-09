import * as React from 'react';
import AllContacts from './AllContacts';
import { Contact } from '../model/Contact';
import ContactForm from './ContactForm';
import Service from '../services/Service';
import DisplayContact from './DisplayContact';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';

interface IProps extends RouteComponentProps {
}

interface IState {
    contactsList: Contact[],
    selectedContact: Contact,
}

let service: any;

class PageContent extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        service = new Service();
        this.state = {
            contactsList: [],
            selectedContact: new Contact({}),
        }
        service.getAllContacts()
            .then((response: any) => { this.setState({ contactsList: response }) })
            .catch((error: any) => console.log(error));
    }



    addOrUpdate(contact: Contact, update: boolean) {
        if (update) {
            service.updateContact(contact)
                .then(() => {
                    alert("Contact is Updated.");
                    this.props.history.push('/');
                })
                .catch((error: any) => console.log(error));
        }
        else {
            service.addContact(contact)
                .then(() => {
                    alert("Contact is Added.");
                    this.props.history.push('/');
                })
                .catch((error: any) => console.log(error));
        }
    }
    

    editing(id: number) {
        this.props.history.push('/ContactFrom/' + id);
    }

    deleting(id: number) {
        service.deleteContact(id)
            .then(() => {
                alert("Contact is Deleted.");
                this.props.history.push('/');
            })
            .catch((error: any) => console.log(error));

    }

    hideForm() {
        this.props.history.push('/');
    }



    render() {

        return (
            <div className="page-content container-fluid">
                <div className="row">
                    <h3 className="title">Contacts</h3>
                </div>
                <div className="row">
                    <Route path="/" render={(props) => <AllContacts {...props} contacts={this.state.contactsList} ></AllContacts>}  ></Route>
                    <div className="offset-lg-1 col-lg-5">
                        <Switch>
                            <Route exact path="/ContactForm/:id" render={(props) => <ContactForm {...props} toAddOrUpdate={(contact: Contact, update: boolean) => this.addOrUpdate(contact, update)}   hideForm={() => this.hideForm()}></ContactForm>}></Route>
                            <Route exact path="/DisplayContact/:id" render={(props) => <DisplayContact {...props} toDelete={(id: number) => this.deleting(id)} toEdit={(id: number) => this.editing(id)} ></DisplayContact>}></Route>
                        </Switch >
                    </div>
                </div>
            </div>

        );

    }
}

export default PageContent;