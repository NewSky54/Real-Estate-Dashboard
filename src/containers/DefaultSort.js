import React, { Component } from 'react';
import Select from 'react-select';

const filterOptions = [
	{ value: 'active', label: 'Active Listings' },
	{ value: 'price-low', label: 'Price - Low to High' },
	{ value: 'price-high', label: 'Price - High to Low' },
	{ value: 'ascending', label: 'Address - A to Z' },
	{ value: 'descending', label: 'Address - Z to A' }
];

const customStyles = {
	option: (provided, state) => ({
		...provided,
		fontFamily: 'AvenirNext-Regular'
	}),
	control: styles => ({
		...styles,
		width: 400
	})
};

class DefaultSort extends Component {
	state = {
		selectedOption: null
	};

	handleChange = selectedOption => {
		this.setState({ selectedOption });
		// execute function passed from Home.js
		if (selectedOption.value === 'price-low' || 'price-high') {
			this.props.handleSort(selectedOption.value);
		}
		if (selectedOption.value === 'ascending' || 'descending') {
			this.props.handleAddress(selectedOption.value);
		}
	};

	render() {
		const { selectedOption } = this.state;

		return (
			<Select
				placeholder="Default Sort..."
				styles={customStyles}
				value={selectedOption}
				onChange={this.handleChange}
				options={filterOptions}
				theme={theme => ({
					...theme,
					borderRadius: 0,
					colors: {
						...theme.colors,
						primary25: '#27a68b',
						primary: 'black'
					}
				})}
			/>
		);
	}
}

export default DefaultSort;
