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

			<div className="product-section mt-150 mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="section-title">
								<h3>
									<span className="green-text">Our</span> Products
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
								
							</div>
						</div>
						<div className="col-lg-6 col-md-12">
							<div className="abt-text">
								<p className="top-sub">Since Year 2019</p>
								<h2>
									We are <span className="orange-text">Green Corner</span>
								</h2>
								<p>
								Introducing our range of premium salads and healthy dishes that will satisfy even the most discerning palates. At Green Corner, we believe that healthy food should never compromise on quality or taste. Try our signature Chicken Breast Salad.
								</p>
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
