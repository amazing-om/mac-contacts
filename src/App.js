import React from 'react';
import ReactDOM from 'react-dom';

import Categories from './Categories/Categories';





class App extends React.Component{
	render() {
		return (
			<Categories />
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));