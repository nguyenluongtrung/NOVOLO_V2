import 'react-slideshow-image/dist/styles.css'
import {Fade} from 'react-slideshow-image'
import { Link } from 'react-router-dom';

const slideImage =[
    {
    url:'https://cdn.aarp.net/content/dam/aarp/health/caregiving/2018/03/1140-nutrients-food-loved-ones-caregiving.jpg',
    title:"Mega Sale Going On!",
    ads:"Get December Discount",
},
{
    url:'https://439623b66ef2e32ac2ca-878d8b04b2333a4ce60ced655a975a22.ssl.cf3.rackcdn.com/Plate_Split.jpg',
    title:"Are you hungry",
    ads:"Let Us Help You",
},
{
    url:'https://cleverads.vn/blog/wp-content/uploads/2023/10/thi-truong-healthy-food-3.jpg',
    title:"Click And Eat",
    ads:"Discover the Flavorful World",
}
];

const divStyle ={
    zindex: "1",
    height:"100vh",
}

function ImageSlider() {
  return (
    <div className ='Slide-container'>
        <Fade autoplay={true} duration={3000}>
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
										<Link className="boxed-btn" to={'/shop'}>Visit Shop</Link>
										<Link className="bordered-btn" to={'/contact'}>Contact Us</Link>
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

export default ImageSlider;
