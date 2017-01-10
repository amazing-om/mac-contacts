import React from 'react';
import Contact from './Contact';
import ContactCard from '../ContactCard/ContactCard';
import actionEmitter from '../actionEmitter';
//import contactInfos from '../Data/ContactDatabase';

let contactInfos = [{
	id: 0,
	phone: 'phone',
	email: 'email',
	name: 'name',
	belongsTo: '0',
	birthday: 'yyyy-MM-dd'
},{
	id: 1,
	name: 'Apple Inc',
	phone: '3637456384568',
	email: 'apple@abc.com',
	belongsTo: '1',
	birthday: 'yyyy-MM-dd'
},{
	id: 2,
	phone: '12323556',
	email: 'om@abc.com',
	belongsTo: '2',
	birthday: 'yyyy-MM-dd'
},{
	id: 3,
	phone: '000001232',
	email: 'Ved@abc.com',
	belongsTo: '3',
	birthday: 'yyyy-MM-dd'
}];

class ContactsList extends React.Component{

	constructor() {
		super();
		this.state = {
			search: '',
			contactInfo: contactInfos[1],
			add_contact: false,
			current_contact: contactInfos[1].id,
			move_disabled : true,
			current_moveIn_category:''

		}
		this.onContactClick = this.onContactClick.bind(this);
		this.addContact = this.addContact.bind(this);
		this.hideAddContact = this.hideAddContact.bind(this);
		this.updateContact = this.updateContact.bind(this);
		this.moveContact = this.moveContact.bind(this);
		this.selectedCategory = this.selectedCategory.bind(this);
		this.loadDefault = this.loadDefault.bind(this);

		
	}

	search(event){
		this.setState({
			search:this.refs.searchValue.value
		});
	}
	loadDefault(data){
		let filteredContactInfo = contactInfos.filter((contactInfo) => {
			return contactInfo.belongsTo.indexOf(data.contact_details.id) !== -1;
		});
		filteredContactInfo[0]['name'] = data.contact_details.name;
		this.setState({
			contactInfo:filteredContactInfo[0], 
			current_contact:data.contactInfo.id
		});
	}

	addContact(data){
		if(data.add_contact){
			this.setState({
				add_contact:data.add_contact
			});
		}
	}

	addGroupToList(event){
		if(event.key=== "Enter"){
			let name = this.refs.add_contact_name.value;
			
			actionEmitter.emit("ADD_CONTACT_LIST", {'name':name});
		}
	}

	onContactClick(contact){
		let filteredContactInfo = contactInfos.filter((contactInfo)=>{
			return contactInfo.belongsTo.indexOf(contact.id) !== -1;
		});

		if(filteredContactInfo.length > 0){
			filteredContactInfo[0]['name'] = contact.name;
			this.setState({
				contactInfo:filteredContactInfo[0], 
				current_contact:contact.id
			});
		}
		else{
			this.setState({
				contactInfo:contactInfos[0], 
				current_contact:0
			});
		}
	}

	updateContact(data){
		let contact_details = data.updated_detail;
		
		contactInfos.map((contactInfo) =>{
			if(contactInfo.id === contact_details.id){
				contactInfo.email = contact_details.email;
				contactInfo.phone = contact_details.phone;
				contactInfo.birthday = contact_details.birthday;
			}
			return contactInfo;
		});

		actionEmitter.emit("UPDATED_CONTACT", { update : true});
	}

	hideAddContact(data){
		this.setState({
			add_contact:data.add_contact
		});
		let id = parseInt(contactInfos[contactInfos.length - 1].id) + 1;
		contactInfos.push({id:id, name:data.new_contact.name, belongsTo:'' + data.new_contact.id});
	}

	moveContact(){
		let contact = this.state.current_contact;
		let category = this.state.current_moveIn_category;
		
		actionEmitter.emit("MOVE_CONTACT_CATEGORY", {'category':category, 'contact':contact});
	}

	selectedCategory(e){
		if(parseInt(e.target.value) !== -1){
			this.setState({
				move_disabled:false, 
				current_moveIn_category:e.target.value});
			let selected_category = e.target.value;
		}
		else{
			this.setState({
				move_disabled:true
			});
		}

	}
	componentDidMount() {

		actionEmitter.on('ADD_CONTACT', this.addContact);
		actionEmitter.on('HIDE_ADD_CONTACT', this.hideAddContact);
		actionEmitter.on('UPDATE_CONTACT', this.updateContact);
		actionEmitter.on('LOAD_DEFAULT', this.loadDefault);
	}

	render(){
			let filteredcontacts = this.props.contacts.filter((contact) =>{
				return contact.name.toLowerCase().indexOf(this.state.search) !== -1;
			});
		return(
			<div className="wrapper">
				<section id="contact_list">
					<div id="search">
						<input type="text" id="search_field" placeholder="🔍 Search" value={this.state.search}  ref = "searchValue" onChange = {this.search.bind(this)}/>
					</div>
					<select onChange ={this.selectedCategory}>
						<option value =''>Select Category</option>
						{
							this.props.categories.map((category) => {
								return category.id !== this.props.current_category ? 
								<option value={category.id} key={category.id}>{category.name}</option> 
								:null
							})
						}
					</select>
					<button disabled ={this.state.move_disabled} onClick = {this.moveContact}>Move</button>

					<ul>
						{filteredcontacts.map((contact) => {
							return <Contact active = { contact.id === this.state.current_contact } contactClick={this.onContactClick} contact={contact} key={contact.id} />
						})}
					</ul>
					
				</section>
				<ContactCard contactInfo = {this.state.contactInfo} readOnly={true}/> 
			</div>

		)
	}

}


export default ContactsList;


