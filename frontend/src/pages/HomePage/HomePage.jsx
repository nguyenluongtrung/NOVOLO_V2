import React, { useEffect, useState } from 'react';
import './HomePage.css';
import './../../assets/css/main.css';
import './../../assets/css/meanmenu.min.css';
import './../../assets/css/owl.carousel.css';
import './../../assets/css/animate.css';
import './../../assets/css/responsive.css';
import { FaPhoneVolume, FaSync, FaShippingFast } from 'react-icons/fa';
import ImageSlider from './components/ImageSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPromotions } from '../../features/promotion/promotionsSlice';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import { formatDateInput } from '../../utils/format';
import { Link } from 'react-router-dom';
import CommentSlider from './components/CommentSlider';

export const HomePage = () => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const dispatch = useDispatch();


	const { promotions } = useSelector((state) => state.promotions);
	useEffect(() => {
		dispatch(getAllPromotions());
	}, [dispatch]);

	useEffect(() => {
		const countdownDate = new Date(promotions[0]?.endDate).getTime();

		const countdown = setInterval(() => {
			const now = new Date().getTime();

			const distance = countdownDate - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setDays(days);
			setHours(hours);
			setMinutes(minutes);
			setSeconds(seconds);

			if (distance < 0) {
				clearInterval(countdown);
			}
		}, 1000);

		return () => clearInterval(countdown);
	}, [promotions]);

	return (
		<div>
			<div className="homepage-slider">
				<ImageSlider />
			</div>

			<div className="list-section pt-80 pb-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
							<div className="list-box d-flex align-items-center">
								<div className="list-icon">
									<FaShippingFast />
								</div>
								<div className="content">
									<h3>Free Shipping</h3>
									<p>When order over $75</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
							<div className="list-box d-flex align-items-center">
								<div className="list-icon">
									<FaPhoneVolume />
								</div>
								<div className="content">
									<h3>24/7 Support</h3>
									<p>Get support all day</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="list-box d-flex justify-content-start align-items-center">
								<div className="list-icon">
									<FaSync />
								</div>
								<div className="content">
									<h3>Refund</h3>
									<p>Get refund within 3 days!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{promotions?.length > 0 && (
				<div className="Slide-container">
					<Fade
						autoplay={promotions?.length == 1 ? false : true}
						duration={2000}
					>
						{promotions.map((promotion, index) => {
							return (
								<div className="testimonial-sliders">
									<div className="single-testimonial-slider">
										<section className="shop-banner">
											<div className="container">
												<div key={index} className="promotion-banner">
													<h3>
														<span className="text-warning"></span>{' '}
														<span className="text-uppercase">
															{promotion.promotionName}
														</span>{' '}
														sale is on! <br /> with big{' '}
														<span className="orange-text">Discount...</span>
													</h3>
													<div className="sale-percent">
														<span>
															Sale! <br /> Upto
														</span>
														{promotion.promotionValue * 100}%<span>off</span>
													</div>
													<div className="mb-3">
														<span>
															Promotion code:{' '}
															<span className="text-danger font-weight-bold">
																{promotion.promotionCode}
															</span>
														</span>
													</div>
													<div className="time-counter">
														<div
															className="time-countdown clearfix"
															data-countdown="29-02-2024"
														>
															<div className="counter-column">
																<div className="inner">
																	<span className="count">
																		{days.toString().padStart(2, '0')}
																	</span>
																	Days
																</div>
															</div>
															<div className="counter-column">
																<div className="inner">
																	<span className="count">
																		{hours.toString().padStart(2, '0')}
																	</span>
																	Hours
																</div>
															</div>
															<div className="counter-column">
																<div className="inner">
																	<span className="count">
																		{minutes.toString().padStart(2, '0')}
																	</span>
																	Mins
																</div>
															</div>
															<div className="counter-column">
																<div className="inner">
																	<span className="count">
																		{seconds.toString().padStart(2, '0')}
																	</span>
																	Secs
																</div>
															</div>
														</div>
													</div>
													<Link className="boxed-btn" to={'/shop'}>Shop Now</Link>
												</div>
											</div>
										</section>
									</div>
								</div>
							);
						})}
					</Fade>
				</div>
			)}

			<div className="testimonail-section mt-150">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12 p-0"></div>
					</div>
				</div>
			</div>

			{/* <c:if test="${okela != null}">
				<section
					className="surprise-banner"
					style="background-image: url('https://pbsapos.com.au/wp-content/uploads/2019/12/fastfood.jpg'); 
                     position: relative;
                     background-color: #f5f5f5;
                     background-size: cover;
                     padding: 110px 0px 115px;
                     height: 95vh"
				>
					<div className="container-fluid ml-5 pl-5">
						<h1
							className="text-white"
							style="font-size: 320%; margin-bottom: 30px"
						>
							Surprise meal is on!
						</h1>
						<div className="mb-5">
							<span className="text-white">
								To satisfy your taste buds and cravings for the homely cooked
								food, prepared by the <br />
								women expert in their own areas, by offering an opportunity to
								the household women in Bangalore & Aligarh.
							</span>
						</div>
						<br />
						<div className="time-counter mb-5">
							<div
								className="time-countdown clearfix"
								data-countdown="${surpriseProduct.p_endDate}"
							>
								<div className="counter-column">
									<div className="inner">
										<span className="count">00</span>
										<p>Days</p>
									</div>
								</div>{' '}
								<div className="counter-column">
									<div className="inner">
										<span className="count">00</span>Hours
									</div>
								</div>{' '}
								<div className="counter-column">
									<div className="inner">
										<span className="count">00</span>Mins
									</div>
								</div>{' '}
								<div className="counter-column">
									<div className="inner">
										<span className="count">00</span>Secs
									</div>
								</div>
							</div>
						</div>

						<a
							href="single-product?id=${surpriseProduct.productID}"
							className="cart-btn btn-lg"
						>
							Shop Now
						</a>
					</div>
				</section>
			</c:if> */}
			<div className="product-section mt-150 mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="section-title">
								<h3>
									<span className="orange-text">Our</span> Products
								</h3>
								<p>
									Indulge your senses in the exquisite flavors of our
									handcrafted gourmet treats. Made with only the finest
									ingredients sourced from local farmers and artisans, each bite
									is a journey through taste paradise.
								</p>
							</div>
						</div>
					</div>

					{/* <div className="row">
							<c:forEach items="${someProducts}" var="c">
								<div className="col-lg-4 col-md-6 text-center">
									<div className="single-product-item">
										<div className="product-image">
											<a href="single-product?id=${c.productID}">
												<img
													src="${c.image}"
													style="width:100%;height:250px"
													alt=""
												/>
											</a>
										</div>
										<h3>${c.name}</h3>
										<p className="product-price"> ${c.price}$ </p>
										<c:if test="${c.status == false}">
											<a href="sorry.jsp" className="btn btn-danger px-5 py-3">
												Sold out
											</a>
										</c:if>
										<c:if test="${c.status == true}">
											<a
												href="add-to-cart?productID=${c.productID}"
												className="cart-btn"
											>
												<i className="fas fa-shopping-cart"></i> Add to Cart
											</a>
										</c:if>
										<c:if test="${sessionScope.acc.role != null}">
											<a href="add-to-wishlist?productID=${c.productID}">
												<button className="btn btn-danger px-5 py-3">
													<i className="fas fa-heart"></i>
												</button>
											</a>
										</c:if>
									</div>
								</div>
							</c:forEach>
						</div> */}
				</div>
			</div>

			<div className="testimonail-section mt-150 mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 offset-lg-1 text-center">
							<div className="testimonial-sliders">
								<CommentSlider />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="abt-section mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12">
							<div className="abt-bg">
								<a
									href="https://www.youtube.com/watch?v=dA0VGEbbw4g"
									className="video-play-btn popup-youtube"
								>
									<i className="fas fa-play"></i>
								</a>
							</div>
						</div>
						<div className="col-lg-6 col-md-12">
							<div className="abt-text">
								<p className="top-sub">Since Year 2019</p>
								<h2>
									We are <span className="orange-text">Fruitkha</span>
								</h2>
								<p>
									Introducing our sensational range of gourmet burgers, crispy
									fries, and irresistible sides that will satisfy even the most
									discerning of taste buds. At NOVOLO, we believe that fast food
									should never compromise on quality or flavor. Sink your teeth
									into our signature NOVOLO Burger – a juicy, flame-grilled
									patty topped with melted cheese, crispy lettuce, ripe
									tomatoes, and our secret sauce, all sandwiched between a
									toasted brioche bun. It's a flavor explosion in every bite!
								</p>
								{/* <p>
                  Pair your burger with our golden, crispy fries, perfectly
                  seasoned to perfection, and complete your meal with one of our
                  refreshing beverages or decadent desserts.
                </p> */}
								<a href="#" className="boxed-btn mt-4">
									Show more
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
