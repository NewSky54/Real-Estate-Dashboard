import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from './../containers/Header';
import CardContainer from './../containers/CardContainer';
import MapContainer from './../containers/MapsContainer';

const Layout = styled.div`
	height: 100%;
	width: 100%;
	*::selection {
		background: #96d2c5;
	}
`;

const ColumnContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const RowContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
`;

class Home extends Component {
	state = {
		data: null,
		defaultCall:
			'https://properly-api-production.herokuapp.com/api/wolfnet/properties?',
		// 'https://properly-api-production.herokuapp.com/api/wolfnet/properties?include=photos',
		minPrice: '',
		maxPrice: '',
		zipCode: '&filter[zip_code]=30315',
		listingStatus: '&filter[properly_listing_status]=Active',
		listingPrice: '',
		address: ''
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			defaultCall,
			minPrice,
			maxPrice,
			zipCode,
			listingStatus,
			listingPrice,
			address
		} = this.state;

		// concate string together
		const url = `${defaultCall}${minPrice}${maxPrice}${zipCode}${listingStatus}${listingPrice}${address}`;

		// Geocoding example: Need server-side rendering (Min-Price=$500,000, Active Listings in Atlanta)
		// const url = `https://properly-api-production.herokuapp.com/api/wolfnet/properties?&filter[min-listing-price]=500000&filter[zip_code]=30315&filter[properly_listing_status]=Active`;

		// fetch data
		axios
			.get(url, {
				headers: {
					'Content-Type': 'application/vnd.api+json',
					Accept: 'application/vnd.api+json'
				}
			})
			.then(data => {
				this.setState(data);
			})
			.catch(err => console.log('Error in Home.js', err));
	};

	// move this function to Home.js
	handleKeyUp = (minPrice, maxPrice) => {
		if (minPrice && maxPrice) {
			this.setState(
				{
					minPrice: `&filter[min-listing-price]=${minPrice}`,
					maxPrice: `&filter[max-listing-price]=${maxPrice}`
				},
				() => this.getData()
			);
		} else if (!minPrice) {
			this.setState(
				{ maxPrice: `&filter[max-listing-price]=${maxPrice}` },
				() => this.getData()
			);
		} else if (!maxPrice) {
			this.setState(
				{ minPrice: `&filter[min-listing-price]=${minPrice}` },
				() => this.getData()
			);
		} else {
			return;
		}
	};

	handleSort = value => {
		if (value === 'price-low') {
			this.setState(
				{
					listingPrice: `&sort=listing-price`
				},
				() => this.getData()
			);
		} else if (value === 'price-high') {
			this.setState(
				{
					listingPrice: `&sort=-listing-price`
				},
				() => this.getData()
			);
		} else {
			return;
		}
	};

	handleAddress = value => {
		if (value === 'ascending') {
			this.setState(
				{
					listingPrice: `&sort=display-address`
				},
				() => this.getData()
			);
		} else if (value === 'descending') {
			this.setState(
				{
					listingPrice: `&sort=-display-address`
				},
				() => this.getData()
			);
		} else {
			return;
		}
	};

	render() {
		const { data } = this.state;
		return (
			<Layout>
				{this.state.data && (
					<Layout>
						<ColumnContainer>
							<Header
								keyup={this.handleKeyUp}
								handleSort={this.handleSort}
								handleAddress={this.handleAddress}
							/>
							<RowContainer>
								<CardContainer listings={data.data} />
								<MapContainer listings={data.data} />
							</RowContainer>
						</ColumnContainer>
					</Layout>
				)}
			</Layout>
		);
	}
}

export default Home;
