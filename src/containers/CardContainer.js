import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './../components/Card';
import axios from 'axios';

const Container = styled.div`
	position: relative;
	width: 50%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-around;
	overflow: scroll;
	border-right: 1px solid #00a68c;
`;

class CardContainer extends Component {
	state = {
		photos: [],
		hardCodedPhotos: [
			'http://flagstaffrealestatepartner.com/images/Sold-Listings/2016_12_05_4769nFossilCreek.jpg',
			'http://c21costaricainfo.com/realestate/listings/images/83_8.jpg',
			'http://cdn.resize.sparkplatform.com/paz/1024x768/true/20160627203739309676000000-o.jpg',
			'https://adorable-home.com/wp-content/uploads/2016/02/Forest-Weekend-House-3.jpg',
			'https://tinyrealestate.com.au/wp-content/uploads/2017/10/IMG_20170326_194306_947.jpg',
			'https://www.toledoblade.com/image/2016/08/13/n1tinyhouse-4.jpg',
			'https://dwtd9qkskt5ds.cloudfront.net/blog/wp-content/uploads/2016/10/tiny-house-for-sale-in-twin-peaks-ca-102516.jpg',
			'https://www.utahmlsrealestate.com/wp-content/uploads/2014/10/Screen-Shot-2014-10-24-at-5.45.46-AM-1030x864.png',
			'https://www.utahmlsrealestate.com/wp-content/uploads/2014/12/Screen-Shot-2014-12-03-at-6.39.27-AM.png',
			'http://rdcnewscdn.realtor.com/wp-content/uploads/2017/01/tiny-house-nation-exterior-832x468.jpg'
		]
	};

	render() {
		const { listings } = this.props;
		const { hardCodedPhotos } = this.state;

		return (
			<Container>
				{listings.map((val, idx) => (
					<Card
						key={val.id}
						city={val.attributes.city}
						address={val.attributes['display-address']}
						price={val.attributes['listing-price']}
						status={val.attributes['listing-status']}
						type={val.attributes['property-type']}
						bedrooms={val.attributes['total-bedrooms']}
						bathrooms={val.attributes['total-bathrooms']}
						thumbnail={{
							hardCodedPhotos: hardCodedPhotos[idx]
						}}
						listing={val}
					/>
				))}
			</Container>
		);
	}
}

export default CardContainer;
