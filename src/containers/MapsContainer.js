import React, { Component } from 'react';
const chalk = require('chalk');
import styled from 'styled-components';
import key from './../../keys';
import {
	Map,
	Marker,
	Circle,
	GoogleApiWrapper,
	InfoWindow
} from 'google-maps-react';
import {
	PopupBottomContainer,
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

const MapContainerStyles = styled.div`
	position: relative;
	background-color: #fff;
	width: 50vw;
	height: 100%;
	box-sizing: border-box;
`;

class MapContainer extends Component {
	state = {
		showingInfoWindow: false, // Hides or the shows the infoWindow
		activeMarker: {}, // Shows the active marker upon click
		selectedPlace: {}, // Shows the infoWindow to the selected place upon a marker,
		fullListings: []
	};

	componentDidMount() {
		// get initial coords to render markers
		this.getCoords();
	}

	getCoords() {
		// create 'geocoder' instance
		const geocoder = new google.maps.Geocoder();

		// iterate through array containing properties
		const latLngArr = this.props.listings.forEach(property => {
			// on each iteration pass each correctly formatted address in place to Google Geocode API
			let formattedAddress = `${property.attributes['display-address']} ${
				property.attributes['city']
			}`;
			geocoder.geocode({ address: formattedAddress }, (results, status) => {
				// if successful: add latitude and longitude to original property array
				if (status == 'OK') {
					let coords = {
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng()
					};
					property.attributes.coords = coords;
					// setState to iternate over and render data to DOM down below
					this.setState({
						fullListings: [...this.state.fullListings, property]
					});
				} else {
					alert('Geocode was not successfull because ' + status);
				}
			});
		});
	}

	// Used to show the InfoWindow
	onMarkerClick = (props, marker, e) => {
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	};

	// Used to close the InfoWindow
	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	render() {
		const { listings } = this.props;
		const {
			selectedPlace: {
				address,
				city,
				price,
				status,
				type,
				bedrooms,
				bathrooms
			},
			fullListings
		} = this.state;

		// Atlanta Coordinates
		const mainCoord = {
			lat: 33.707326,
			lng: -84.383196
		};

		const formatCurrency = new Intl.NumberFormat({
			style: 'currency'
		}).format(price);

		return (
			<React.Fragment>
				<MapContainerStyles>
					<Map
						style={{
							height: '100%',
							width: '100%',
							position: 'relative'
						}}
						google={this.props.google}
						zoom={10}
						initialCenter={mainCoord}
					>
						{
							// Displays Markers for Each Location
						}
						{fullListings.length === 10
							? fullListings.map((val, idx, arr) => {
									return (
										<Marker
											key={`key--${idx}`}
											onClick={this.onMarkerClick}
											address={val.attributes['display-address']}
											city={val.attributes.city}
											price={val.attributes['listing-price']}
											status={val.attributes['listing-status']}
											type={val.attributes['property-type']}
											bedrooms={val.attributes['total-bedrooms']}
											bathrooms={val.attributes['total-bathrooms']}
											position={{
												lat: val.attributes.coords.lat,
												lng: val.attributes.coords.lng
											}} // 'position' can be either a raw object or a google.maps.LatLng() instance.
										/>
									);
							  })
							: null}

						{
							// InfoWindow for the Active Marker
						}
						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showingInfoWindow}
							onClose={this.onClose}
						>
							<>
								<PopupBottomContainer>
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
								</PopupBottomContainer>
							</>
						</InfoWindow>
					</Map>
				</MapContainerStyles>
			</React.Fragment>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: key.googleAPIKey
})(MapContainer);
