import * as React from 'react';
import { Contact } from '../model/Contact';
import { RouteComponentProps } from 'react-router-dom';
import Service from '../services/Service';

interface IProps extends RouteComponentProps {
    toAddOrUpdate: (contact: Contact, update: boolean) => void;
    hideForm: () => void;
}

interface IState {
    person: Contact;
    update: boolean,
    contactId?: number,
    buttonName: string
}

let service: any;
export default class ContactForm extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        service = new Service();
        this.state = {
            person: new Contact({}),
            update: false,
            buttonName: 'Add',
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.closeForm = this.closeForm.bind(this);
        
        let routeinfo: any = this.props.match;
        if (Number(routeinfo.params.id) === 0) {
            this.setState({ person: new Contact({ id: 0, name: "", email: "", mobile: "", landLine: "", webSite: "", address: "" }), buttonName: 'Add' })
        }
        else {
            service.findSelectedContact(Number(routeinfo.params.id))
                .then((response: any) => { this.setState({ person: response, buttonName: 'Update' }) })
                .catch((error: any) => console.log(error));
        }

    }

    componentWillReceiveProps(newProps: any) {
        let routeinfo: any = newProps.match;
        if (this.state.contactId !== Number(routeinfo.params.id)) {
            service.findSelectedContact(Number(routeinfo.params.id))
                .then((response: any) => { this.setState({ person: response }) })
                .catch((error: any) => console.log(error));
        }
        else{
            this.setState({ person: new Contact({ id: 0, name: "", email: "", mobile: "", landLine: "", webSite: "", address: "" }), buttonName: 'Add' })
        }
    }
    componentWillMount() {
        let info: any = this.props.match;
        this.setState({ contactId: info.params.id });
    }

    formSubmit(e: any) {
        let info: any = this.props.match;
        if (Number(info.params.id) !== 0) {
            this.props.toAddOrUpdate(this.state.person, true);
        }
        else {
            let min = 6;
            let max = 100;
            let randomID = Math.floor(Math.random() * (+max - +min) + +min);

            let contactObj = { ...this.state.person };
            contactObj.id = randomID;
            this.props.toAddOrUpdate(contactObj, false);
        }
    }

    closeForm() {
        this.props.hideForm();
        this.setState({ person: this.state.person });
    }


    render() {
        return (
            this.state.person != null ?
                <div className="row">
                    <form id="contactForm" className="col-lg-12">
                        <div className="col-lg-10">
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" className="form-control" id="txtName" placeholder="Enter name"
                                    name="name" value={this.state.person.name} onChange={(event) => { this.setState({ person: { ...this.state.person, name: event.target.value } }) }} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" id="txtEmail" placeholder="Enter email"
                                    name="email" value={this.state.person.email}
                                    onChange={(event) => { this.setState({ person: { ...this.state.person, email: event.target.value } }) }} />
                                <label id="emailError" className="lbl-error"></label>
                            </div>
                            <div className="form-group">
                                <div className="form-group col-md-6 p-0 pr-4 float-left">
                                    <label>Mobile:</label>
                                    <input type="text" className="form-control" id="txtMobile"
                                        placeholder="Enter mobile number" name="mobile" value={this.state.person.mobile}
                                        onChange={(event) => { this.setState({ person: { ...this.state.person, mobile: event.target.value } }) }} />
                                    <label id="mobileError" className="lbl-error"></label>
                                </div>
                                <div className="form-group col-md-6 p-0 float-left">
                                    <label>LandLine:</label>
                                    <input type="text" className="form-control" id="txtLand"
                                        placeholder="Enter landline number" name="land" value={this.state.person.landLine}
                                        onChange={(event) => { this.setState({ person: { ...this.state.person, landLine: event.target.value } }) }} />
                                </div>
                            </div>
                            <div className="form-group site-field">
                                <label>Website:</label>
                                <input type="text" className="form-control" id="txtSite" placeholder="Enter website"
                                    name="site" value={this.state.person.webSite}
                                    onChange={(event) => { this.setState({ person: { ...this.state.person, webSite: event.target.value } }) }} />
                                <label id="siteError" className="lbl-error"></label>
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <textarea className="form-control" id="txtAddress" placeholder="Enter Address"
                                    name="address" value={this.state.person.address}
                                    onChange={(event) => { this.setState({ person: { ...this.state.person, address: event.target.value } }) }}></textarea>
                            </div>

                        </div>
                        <div className="form-group float-right">
                            <input type="button" className="btn-add" value={this.state.buttonName} onClick={this.formSubmit} />
                        </div>
                        <input type="button" className="close" value="X" onClick={this.closeForm} />
                    </form>
                </div>
                :
                <div>
                    <p>No Contact.</p>
                </div>
        );
    }
}