import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import {Fade,Zoom,Slide} from 'react-slideshow-image'

const slideImage =[
    {
    url:'https://r4.wallpaperflare.com/wallpaper/374/404/846/brown-bird-perching-during-daytime-wren-wren-wallpaper-69580721080624d50a29d9ba7e5022f4.jpg',
    title:"Mega Sale Going On!",
    ads:"Get December Discount",
},
{
    url:'https://r4.wallpaperflare.com/wallpaper/794/306/483/sausage-fast-food-buns-fast-food-wallpaper-08d8abd425ed5206b15a8d8c83b78450.jpg',
    title:"Are you hungry",
    ads:"Let Us Help You",
},
{
    url:'https://r4.wallpaperflare.com/wallpaper/850/627/639/fried-chicken-french-fries-ketchup-food-wallpaper-5886bdf880100c08708c41cea842e48a.jpg',
    title:"Click And Eat",
    ads:"Discover the Flavorful World",
}
];

const divStyle ={
    zindex: "1",
    // marginTop:"-50px",
    // display:'flex',
    // alignItems:"center",
    // justifyContent: "center",
    height:"550px",
    // backgroundSize:'cover'
}

function ImageSlider() {
  return (
    <div className ='Slide-container'>
        <Fade autoplay={true} duration={3000} className="react-slideshow-arrow">
            {slideImage.map((image,index) =>(
                <div key={index} className="single-homepage-slider homepage-bg-3" style={{...divStyle,backgroundImage:`url(${image.url})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 text-right">
                            <div className="hero-text">
                                <div className="hero-text-tablecell">
                                    <p className="subtitle">{image.title}</p>
                                    <h1>{image.ads}</h1>
                                    <div className="hero-btns">
                                        <a href="shop.html" className="boxed-btn">Visit Shop</a>
                                        <a href="contact.html" className="bordered-btn">Contact Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </Fade>
    </div>
  )
}

export default ImageSlider