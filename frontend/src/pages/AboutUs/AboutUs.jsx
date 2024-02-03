import "./AboutUs.css";
import {
  FaBox,
  FaFacebook,
  FaInstagram,
  FaMoneyBillWave,
  FaShoppingCart,
  FaTwitter,
} from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";

const featuresData = [
  {
    icon: <FaShoppingCart />,
    title: "Home Delivery",
    description:
      "Unbeatable deals on top-quality products. Affordable shopping without compromising on quality.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Best Price",
    description:
      "Unbeatable deals on top-quality products. Affordable shopping without compromising on quality.",
  },
  {
    icon: <FaBox />,
    title: "Custom Box",
    description:
      "Create a personalized shopping experience. Tailor your box with the items you love.",
  },
  {
    icon: <RiRefund2Line />,
    title: "Quick Refund",
    description:
      "Your satisfaction is our priority. Experience hassle-free and swift refunds if needed.",
  },
];

const ourTeamsData = [
  {
    name: "Hung Dinh",
    role: "Coder",
    linkFacebook: "",
    linkInstagram: "",
    linkTwitter: "",
    image: "",
    description: ""
  },
  {
    name: "Luong Trung",
    role: "CEO",
    linkFacebook: "",
    linkInstagram: "",
    linkTwitter: "",
    image: "",
    description: ""
  },
  {
    name: "Quang Duy",
    role: "Coder",
    linkFacebook: "",
    linkInstagram: "",
    linkTwitter: "",
    image: "",
    description: ""
  },
];

const moreTeamsData = [
  {
    name: "Gia Phat",
    role: "Coder",
    linkFacebook: "",
    linkInstagram: "",
    linkTwitter: "",
    image: "",
    description: "I Love Eating Dog"
  },
  {
    name: "Van Toan",
    role: "Coder",
    linkFacebook: "",
    linkInstagram: "",
    linkTwitter: "",
    image: "",
    description: "Love FreeFire"
  },
];
export const AboutUs = () => {
  return (
    <div>
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>We sale fresh fruits</p>
                <h1>About Us</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="featured-text">
                <h2 className="pb-3">
                  Why <span className="orange-text">Novolo</span>
                </h2>
                <div className="row">
                  {featuresData.map((feature, index) => (
                    <div key={index} className="col-lg-6 col-md-6 mb-4 mb-md-5">
                      <div className="list-box d-flex">
                        <div className="list-icon">
                          <i>{feature.icon}</i>
                        </div>
                        <div className="content">
                          <h3>{feature.title}</h3>
                          <p>{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="shop-banner">
        <div className="container">
          <h3>
            December sale is on! <br /> with big{" "}
            <span className="orange-text">Discount...</span>
          </h3>
          <div className="sale-percent">
            <span>
              Sale! <br /> Upto
            </span>
            50% <span>off</span>
          </div>
          <a href="shop.html" className="cart-btn btn-lg">
            Shop Now
          </a>
        </div>
      </section>

      <div className="mt-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3>
                  Our <span className="orange-text">Team</span>
                </h3>
                <p>
                  {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid, fuga quas itaque eveniet beatae optio. */}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {ourTeamsData.map((infor, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="single-team-item">
                  <div className="team-bg team-bg-1">{infor.image}</div>
                  <h4>
                    {infor.name} <span>{infor.role}</span>
                  </h4>
                  <ul className="social-link-team">
                    <li>
                      <a href={infor.linkFacebook} target="_blank">
                        <i>
                          <FaFacebook />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a href={infor.linkTwitter} target="_blank">
                        <i>
                          <FaTwitter />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a href={infor.linkInstagram} target="_blank">
                        <i>
                          <FaInstagram />
                        </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="testimonail-section mt-80 mb-150">
        <div className="container">
          <div className="row">
            {moreTeamsData.map((infor, index) => (
              <div key={index} className="col-lg-10 offset-lg-1 text-center">
                <div className="testimonial-sliders">
                  <div className="single-testimonial-slider">
                    <div className="client-avater">
                      <img src="assets/img/avaters/avatar1.png" alt="" />
                    </div>
                    <div className="client-meta">
                      <h3>
                        {infor.name}<span>{infor.role}</span>
                      </h3>
                      <p className="testimonial-body">{infor.description}</p>
                      <div className="last-icon">
                        <a href={infor.linkFacebook} target="_blank">
                          <i>
                            <FaFacebook />
                          </i>
                        </a>
                        <a href={infor.linkTwitter} target="_blank">
                          <i>
                            <FaTwitter />
                          </i>
                        </a>
                        <a href={infor.linkInstagram} target="_blank">
                          <i>
                            <FaInstagram />
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
