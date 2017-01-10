import React from 'react';

const Category = ({category, itemClicked, active}) => (
	<li className = {active? 'active ' : 'non-active' } onClick={() => {
		itemClicked(category);}}>
		<a href="#">{category.name}</a>
	</li>
);
	
export default Category;