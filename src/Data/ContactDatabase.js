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
	email: 'anjali@abc.com',
	belongsTo: '2',
	birthday: 'yyyy-MM-dd'
},{
	id: 3,
	phone: '000001232',
	email: 'naveen@abc.com',
	belongsTo: '3',
	birthday: 'yyyy-MM-dd'
}];

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