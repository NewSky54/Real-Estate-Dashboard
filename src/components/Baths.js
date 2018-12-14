import React from 'react';
import styled from 'styled-components';
import downArrow from './../../dist/assets/scroll-arrow-to-down.png';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		position: relative;
		top: 1px;
		width: 15px;
	}
`;

const Text = styled.div`
	padding-right: 10px;
	font-size: 18px;
	font-family: AvenirNext-Regular;
	:active {
		color: rgb(100, 105, 113);
	}
`;

const Baths = ({}) => {
	return (
		<Wrapper>
			<Text>Baths</Text>
			<img src={downArrow} />
		</Wrapper>
	);
};

export default Baths;
