import React, { Component } from 'react';
import styled from 'styled-components';
import Price from './../components/Price';
import Beds from './../components/Beds';
import Baths from './../components/Baths';
import DefaultSort from './DefaultSort';

const Wrapper = styled.div`
	display: flex;
	position: relative;
	background-color: #fff;
	height: 70px;
	width: 100%;
	border-bottom: 1px solid #00a68c;
`;

const ImgContainer = styled.div`
	width: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		height: 26px;
	}
`;

const FilterContainer = styled.div`
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

class Header extends Component {
	render() {
		return (
			<Wrapper>
				<ImgContainer>
					<img src="https://res-2.cloudinary.com/virgent-realty/image/asset/c_scale,dpr_auto,f_auto,h_24,q_auto:best/properly-logo-green-c9fadbcec9d941f1f936b97d3c8cf1bb.png" />
				</ImgContainer>
				<FilterContainer>
					<Price keyup={this.props.keyup} />
					<Beds />
					<Baths />
					<DefaultSort
						handleSort={this.props.handleSort}
						handleAddress={this.props.handleAddress}
					/>
				</FilterContainer>
			</Wrapper>
		);
	}
}

export default Header;
