import React from 'react';
import AddData from '../Data/AddData';
import actionEmitter from '../actionEmitter';

class ContactCard extends React.Component{

	constructor() {
		super();
		this.state = {
			isAddClicked:false,
			add_contact: false,
			readOnly :true
		}

		this.addData = this.addData.bind(this);
		this.addContact = this.addContact.bind(this);
		this.hideAddClick = this.hideAddClick.bind(this);
		this.addPhoneNumber = this.addPhoneNumber.bind(this);
		this.addEmail = this.addEmail.bind(this);
		this.addBirthday = this.addBirthday.bind(this);
		this.updateContactDetail = this.updateContactDetail.bind(this);
		this.updatedContactDetail = this.updatedContactDetail.bind(this);
		
	}

	addData(){
		this.setState({
			isAddClicked: !this.state.isAddClicked
		});
	}
	hideAddClick(data){
		this.setState({
			isAddClicked: data.hide_add_data
		});
	}
	addPhoneNumber(data){
		this.setState({
			readOnly: false
		});
		this.refs.phone.focus();
	}
	addEmail(data){
		this.setState({
			readOnly:false
		});
		this.refs.email.focus();
	}
	addBirthday(data){
		this.setState({
			readOnly:false
		});
		this.refs.birthday.focus();
	}
	editContactDetail(){
		this.setState({
			readOnly:false
		});
		this.refs.phone.focus();
	}
	updateContactDetail(){
		let id = this.props.contactInfo.id;
		let name = this.refs.add_contact_name.value;
		let phone =this.refs.phone.value;
		let email =this.refs.email.value;
		let birthday =this.refs.birthday.value;
		let updated_detail = {id:id, name:name, phone:phone, email:email, birthday:birthday};
		
		actionEmitter.emit('UPDATE_CONTACT', {'updated_detail':updated_detail});
	}
	updatedContactDetail(){
		this.setState({
			readOnly:true
		});
	}
	addContact(data){
		this.refs.add_contact_name.value='';
		this.refs.phone.value = '';
		this.refs.email.value = '';
		this.refs.birthday.value= '';
		if(data.add_contact){
			this.setState({
				readOnly:false,
				add_contact: data.add_contact
			});
			this.refs.add_contact_name.focus();
		}
	}
	addGroupToList(event){

		if(event.key=== "Enter"){
			let name = this.refs.add_contact_name.value;

			this.setState({
				readOnly:false
			});
			actionEmitter.emit("ADD_CONTACT_LIST", {'name':name});

		}
	}
	componentDidMount() {
		actionEmitter.on('ADD_CONTACT_LIST', this.addContact);
		actionEmitter.on('ADD_CONTACT', this.addContact);
		actionEmitter.on('HIDE_ADD_DATA', this.hideAddClick);
		actionEmitter.on('ADD_PHONE', this.addPhoneNumber);
		actionEmitter.on('ADD_EMAIL', this.addEmail);
		actionEmitter.on('ADD_BIRTHDAY', this.addBirthday);
		actionEmitter.on('UPDATED_CONTACT', this.updatedContactDetail);
	}

	render(){
		return(

			<section id ="contact_card">
				<div id ="contact_details">
					<div id="contact_header">
						<img className="image-cropper" src="./img/default.png"/>
						<div>
						
								{this.state.readOnly ? <input className="add_category" type="text" readOnly={this.state.readOnly } placeholder="No Name" ref="add_contact_name" defaultValue={this.props.contactInfo.name}/> : <input className="add_category" defaultValue={this.props.contactInfo.name} ref="add_contact_name" type="text" placeholder="No Name" onKeyPress={this.addGroupToList.bind(this)} /> }
							<h2 id="company">{this.props.contactInfo.company}</h2>
						</div>
					</div>
					<div id="contact_details">
						<div id="phone" className="contact-line">
							<label>Mobile:</label>
							<input type="text" readOnly={this.state.readOnly === false ? this.state.readOnly : this.props.readOnly} placeholder="Phone" ref="phone" defaultValue={this.props.contactInfo.phone}/>
						</div>
						<div id="email" className="contact-line"> 
							<label>Email</label>
							<input type="text" readOnly={ this.state.readOnly === false ? this.state.readOnly : this.props.readOnly} placeholder="abc@gmail.com" ref="email" defaultValue={this.props.contactInfo.email}/> 
						</div>
						<div id="ringtone" className="contact-line">
							<label>Ringtone</label>
							<select>
								<option>Concord</option>
								<option>Chimes</option>
								<option>Bells</option>
							</select>
						</div>
						<div id="address" className="contact-line">
							<label>Address</label>
							<div>
								<textarea className="address"></textarea>
							</div>
						</div>
						<div id="birthday" className="contact-line">
							<label>Birthday</label> 
							<input type="date" readOnly={ this.state.readOnly === false ? this.state.readOnly : this.props.readOnly} placeholder="yyyy-MM-dd" ref="birthday" defaultValue={this.props.contactInfo.birthday}/> 
						</div>
						<div id="note" className="contact-line">
							<label>Note</label>
							<textarea className="note"></textarea>
						</div>
					</div>
				</div>
				{ this.state.isAddClicked ? <AddData /> : null }
				<footer id="footer">
					<div id="add">
						<button onClick={this.addData}>+</button>
					</div>
					<div id="othrs">
					{ ( this.props.readOnly && this.state.readOnly ) ? 
						
						<button id="done" onClick={this.editContactDetail.bind(this)}>Edit</button> 
						: <button id="done" onClick={this.updateContactDetail.bind(this)}>Done</button> }
					<button id="export">Export</button>
					</div>
				</footer>
			</section>
		)
	}
}

export default ContactCard;


