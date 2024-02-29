import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
const slideImage = [
	{
		url: 'https://r4.wallpaperflare.com/wallpaper/374/404/846/brown-bird-perching-during-daytime-wren-wren-wallpaper-69580721080624d50a29d9ba7e5022f4.jpg',
	},
	{
		url: 'https://r4.wallpaperflare.com/wallpaper/794/306/483/sausage-fast-food-buns-fast-food-wallpaper-08d8abd425ed5206b15a8d8c83b78450.jpg',
	},
	{
		url: 'https://r4.wallpaperflare.com/wallpaper/850/627/639/fried-chicken-french-fries-ketchup-food-wallpaper-5886bdf880100c08708c41cea842e48a.jpg',
	},
];

const divStyle = {
	marginTop: '-50px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '600px',
	backgroundSize: 'cover',
};

const spanStyle = {
	fontSize: '20px',
	background: '#efefef',
	color: '#000000',
};
function ImageSlider() {
	return (
		<div className="Slide-container">
			<Fade autoplay={true} duration={3000}>
				{slideImage.map((image, index) => (
					<div key={index}>
						<div style={{ ...divStyle, backgroundImage: `url(${image.url})` }}>
							<span style={{ spanStyle }}>{image.caption}</span>
						</div>
					</div>
				))}
			</Fade>
		</div>
	);
}

export default ImageSlider;
