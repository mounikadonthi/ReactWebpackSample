import * as React from 'react';
import { Contact } from '../model/Contact';
import Service from '../services/Service';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
   contact: Contact;
   contactId: number;
}

interface IProps extends RouteComponentProps {
   toEdit: (id: number) => void;
   toDelete: (id: number) => void;

}

let service: any;
export default class DisplayContact extends React.Component<IProps, IState> {
   constructor(props: any) {
      super(props);
      service = new Service();
      this.state = {
         contact: new Contact({}),
         contactId: 0,
      }
      let info: any = this.props.match;
      service.findSelectedContact(Number(info.params.id))
         .then((response: any) => { this.setState({ contact: response }) })
         .catch((error: any) => console.log(error));
   }

   componentWillReceiveProps(newProps: any) {
      let info: any = newProps.match;
      if (this.state.contactId !== Number(info.params.id) || this.state.contactId === Number(info.params.id)) {
         service.findSelectedContact(Number(info.params.id))
            .then((response: any) => { this.setState({ contact: response }) })
            .catch((error: any) => console.log(error));
      }

   }

   componentWillMount() {
      const info: any = this.props.match;
      this.setState({ contactId: Number(info.params.id) });

   }


   edit(id: number) {
      this.props.toEdit(id);
      this.props.history.push('/ContactForm/' + id);
   }

   delete(e: any, id: number) {
      this.props.toDelete(id);
   }

   render() {
      return (
         this.state.contact != null ?
            <div className="contact-details">
               <div className="col-lg-8 float-left">
                  <h3 className="contact-name pb-2">{this.state.contact.name}</h3>
                  <p>Email:<span className="contact-data">{this.state.contact.email}</span></p>
                  <div className="py-3">
                     <p>Mobile:<span className="contact-data">{this.state.contact.mobile}</span></p>
                     <p>LandLine:<span className="contact-data">{this.state.contact.landLine}</span></p>
                  </div>
                  <p>Website:<span className="contact-data">{this.state.contact.webSite}</span></p>
                  <p>Address:<span className="contact-data">{this.state.contact.address}</span></p>
               </div>
               <div className="col-lg-4 float-left">
                  <div id="btnEdit" className="float-left">
                     <span><i className="fa fa-pencil" aria-hidden="true"></i></span><input type="button"
                        value="Edit" data-itemID={this.state.contact.id} onClick={() => { this.edit(this.state.contact.id) }} />
                  </div>
                  <div id="btnDelete" className="float-left">
                     <span><i className="fa fa-trash" aria-hidden="true"></i></span><input type="button"
                        value="Delete" data-itemID={this.state.contact.id} onClick={(e) => { this.delete(e, this.state.contact.id) }} />
                  </div>
               </div>
            </div>
            :
            <div>
               <p>No Contact.</p>
            </div>
      );
   }
}