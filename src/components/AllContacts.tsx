import * as React from 'react';
import { Contact } from '../model/Contact';
import { RouteComponentProps } from 'react-router-dom';



interface IProps extends RouteComponentProps {
    contacts: Contact[],
}

interface IState {
    addClass: boolean;
}

class AllContacts extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            addClass: false,
        }
    }

    componentWillMount() {
        this.setState({ addClass: true });
    }

    toGetContact(id: number) {       
        this.props.history.push('/DisplayContact/' + id);
    }

    render() {

        const allContactsList = this.props.contacts.map((contact: Contact) => {
            return <div className="contact" data-itemId={contact.id} onClick={() => { this.toGetContact(contact.id) }}>
                <h3 className="name" >{contact.name}</h3>
                <p className="email">{contact.email}</p>
                <p className="mobile">{contact.mobile}</p>
            </div>
        });
        return (
            <div className="col-lg-3" id="allContacts">
                {
                    allContactsList
                }
            </div>
        );
    }
}
export default AllContacts;