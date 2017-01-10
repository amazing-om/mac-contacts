import React from 'react';
import Category from './Category';
import ContactsList from '../ContactList/ContactsList';
import actionEmitter from '../actionEmitter';
//import categories from '../Data/ContactDatabase';
//import contactList from '../Data/ContactDatabase';

// categories Data
let categories = [{
	id: 0,
	name: 'All Contacts'
},{
	id: 'abc',
	name: 'Myntra Contacts'
},{
	id: 'def',
	name: 'Personal Contacts'
}];

// Contact List

let contactList = [{
	id: 1,
	name: 'Apple Inc',
	belongsTo: [0]
},{
	id: 2,
	name: 'OM',
	belongsTo: [0,'def']
},{
	id: 3,
	name: 'Ved',
	belongsTo: [0,'abc']
}];

class Categories extends React.Component{

	constructor(props) {
		super(props);
		 this.state ={
		 	contacts:contactList,
		 	categories:categories,
		 	add_category:false,
		 	allCategory:0
		 }

		 this.onItemClick = this.onItemClick.bind(this);
		 this.addCategory = this.addCategory.bind(this);
		 this.addContactToList = this.addContactToList.bind(this);
		 this.moveCategory = this.moveCategory.bind(this);

	}

	onItemClick(category){
		let filteredContacts = this.getFilteredContact( contactList, category.id);
		this.setState({
			contacts:filteredContacts, 
			allCategory:category.id
		});
		
		actionEmitter.emit("LOAD_DEFAULT", {'contact_card':filteredContacts[0]})
	}
	addCategory(data){
		this.setState({
			add_category:data.add_category
		});
	}

	randomId(){
		var x ="";
		var pos = "qwertyuiopasdfghjklzxcvbnm";
		for(let i=0; i<3; i++)
			x += pos.charAt(Math.floor(Math.random()* pos.length));
		return x;
	}

	addGroupInList(event){
		if(event.key == "Enter"){
			this.setState({
				add_category:false
			});

			let id = this.randomId();
			let name= this.refs.category_name.value ? this.refs.category_name.value : name = "Untitled Group";
			categories.push({id, name});
			
			this.setState({
				categories:categories
			});
		}
	}

	addContactToList(data){
		let id = parseInt(contactList[contactList.length - 1].id) + 1;
		let name = data.name ? data.name : "No Name";
		let belongsTo =[];

		belongsTo.push(this.state.allCategory);
		 if(this.state.allCategory != 0){
		 	belongsTo.push(0);
		 }
		 contactList.push({id, name, belongsTo});
		 let filteredContacts = this.getFilteredContact (contactList, this.state.allCategory);
		 
		 this.setState({
		 	contacts:filteredContacts
		 });
		 
		 let new_contact = { name:name, id:id};

		 actionEmitter.emit("HIDE_ADD_CONTACT", {"addContact": false, new_contact: new_contact}); 

	}

	getFilteredContact(contactList, allCategory){
		let filtered_contacts = contactList.filter((contact) => {
				return contact.belongsTo.indexOf(allCategory) !== -1;
			}
		);
		return filtered_contacts;

	}

	moveCategory(data){
		debugger;
		contactList.map((contact) => {
			return contact.id === data.contact ? contact.belongsTo.push(data.category) : null
		});
	}

	componentDidMount() {
		actionEmitter.on("ADD_CATEGORY", this.addCategory);
		actionEmitter.on("ADD_CONTACT_LIST", this.addContactToList);
		actionEmitter.on("MOVE_CONTACT_CATEGORY", this.moveCategory);
	}

	render(){
		return(
		<div className="main-wrapper">
			<section id="categories">
					<header id="header">
						On My Mac
					</header>
					<ul>
						{this.state.categories.map((category, i) => {
							return <Category active = { category.id === this.state.allCategory } itemClicked={this.onItemClick} category={category} key={category.id} />
						})
						}
					</ul>
					{this.state.add_category ? 
					<input className="addCategory" ref="category_name" type="text" placeholder="Untitled Group" onKeyPress={this.addGroupInList.bind(this)}/> 
					: null}
				</section>
				<ContactsList contacts={this.state.contacts} categories ={this.state.categories} allCategory={this.state.allCategory}/>
			</div>
		)
	}
}

export default Categories;



