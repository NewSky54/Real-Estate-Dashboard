import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
	BottomContainer,
	Address,
	City,
	Price,
	RowContainer,
	LeftWidth,
	RightWidth,
	Beds,
	Pipe,
	Baths,
	Type,
	Status
} from './../Styles/styles';

const Container = styled.div`
	max-width: 420px;
	min-height: 500px;
	background: #fdfeff;
	border-radius: 5px;
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
	margin: 20px 0px;
	flex-grow: 1;
	border: 1px solid #d2c6c6;
	:hover {
		border: 1px solid #acacac;
		box-shadow: 0 8px 40px 5px rgba(0, 0, 0, 0.5);
		transition: all 0.3s ease-in-out;
	}
`;

// Top portion of Card
const Img = styled.img`
	min-width: 320px;
	height: 400px;
	width: 100%;
	overflow: hidden;
	border-radius: 5px 5px 0 0;
`;

const Card = ({
	city,
	address,
	price,
	status,
	type,
	bedrooms,
	bathrooms,
	thumbnail
}) => {
	const formatCurrency = new Intl.NumberFormat({
		style: 'currency'
	}).format(price);

	return (
		<Container>
			<Img src={thumbnail.hardCodedPhotos} />
			<BottomContainer>
				<Address>{address}</Address>
				<City>{city}</City>
				<Price>${formatCurrency}</Price>
				<RowContainer>
					<LeftWidth>
						<Beds>{null === bedrooms ? 1 : bedrooms} BD</Beds>
						<Pipe>|</Pipe>
						<Baths>{null === bathrooms ? 1 : bathrooms} BA</Baths>
					</LeftWidth>
					<RightWidth>
						<Type>{type}</Type>
						<Pipe>|</Pipe>
						<Status>{status}</Status>
					</RightWidth>
				</RowContainer>
			</BottomContainer>
		</Container>
	);
};

export default Card;
