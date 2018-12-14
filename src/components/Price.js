import React, { Component } from 'react';
import styled from 'styled-components';
import downArrow from './../../dist/assets/scroll-arrow-to-down.png';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	outline: none;
	img {
		position: relative;
		top: 1px;
		width: 15px;
	}
	:active {
		color: rgb(100, 105, 113);
	}
`;

const Text = styled.div`
	padding-right: 10px;
	font-size: 18px;
	font-family: AvenirNext-Regular;
`;

const Dropdown = styled.div`
	position: absolute;
	padding: 20px 12px;
	background-color: #fff;
	font-family: AvenisrNext-Regular;
	top: 70px;
	display: flex;
	z-index: 1;
	display: flex;
	align-items: center;
`;

const Input = styled.input`
	height: 30px;
	font-size: 16px;
	padding: 0 10px;
	margin: 0 10px;
	outline: none;
	font-family: Avenir-Book;
	border: 1px solid #dadada;
	:hover,
	:focus {
		transition: all 0.2s ease-in;
		border: 1px solid #27a68b;
	}
`;

class Price extends Component {
	state = {
		showDropDown: false,
		minPrice: '',
		maxPrice: ''
	};

	toggleDropDown = () => {
		this.setState({ showDropDown: !this.state.showDropDown });
	};

	handleMinChange = e => {
		this.setState({ minPrice: e.target.value });
	};

	handleMaxChange = e => {
		this.setState({ maxPrice: e.target.value });
	};

	clearValues = e => {
		if (e.keyCode === 13) {
			// clear values
			this.setState({ minPrice: '', maxPrice: '' });
			// send values up
			this.props.keyup(this.state.minPrice, this.state.maxPrice);
		}
	};

	render() {
		const { minPrice, maxPrice } = this.state;

		return (
			<div>
				<Wrapper onClick={this.toggleDropDown}>
					<Text>Price</Text>
					<img src={downArrow} />
				</Wrapper>
				{this.state.showDropDown && (
					<Dropdown onKeyDown={this.clearValues}>
						<Input
							onChange={this.handleMinChange}
							value={minPrice}
							type="number"
							name="inputBox"
							placeholder="Min"
						/>
						TO
						<Input
							onChange={this.handleMaxChange}
							value={maxPrice}
							type="number"
							name="inputBox"
							placeholder="Max"
						/>
					</Dropdown>
				)}
			</div>
		);
	}
}

export default Price;
