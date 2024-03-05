import React, { useEffect } from 'react';
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

export const HomePage = () => {
	const dispatch = useDispatch();

	const { promotions } = useSelector((state) => state.promotions);

	useEffect(() => {
		dispatch(getAllPromotions());
	}, [dispatch]);

	return (
		<div>
			<div className="search-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<span className="close-btn">
								<i className="fas fa-window-close"></i>
							</span>
							<div className="search-bar">
								<div className="search-bar-tablecell">
									<h3>Search For:</h3>
									<form>
										<input type="text" placeholder="Search by name..." />
										<button type="submit">
											Search <i className="fas fa-search"></i>
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style={{ marginTop: '-160px' }}>
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

			<div className="Slide-container">
				<Fade autoplay={true} duration={2000}>
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
													{promotion.promotionValue} %<span>off</span>
												</div>
												<div className="mb-3">
													<span>
														Promotion code:{' '}
														<span className="text-danger font-weight-bold">
															{promotion.promotionCode}
														</span>
													</span>
												</div>
												<div className="mb-3">
													<p
														className="text-secondary"
														style={{ fontStyle: 'italic', fontSize: '80%' }}
													>
														(*) This promotion event only applies for:
													</p>
												</div>
												<div className="time-counter">
													<div
														className="time-countdown clearfix"
														data-countdown='29-02-2024'
													>
														<div className="counter-column">
															<div className="inner">
																<span className="count">00</span>Days
															</div>
														</div>
														<div className="counter-column">
															<div className="inner">
																<span className="count">00</span>Hours
															</div>
														</div>
														<div className="counter-column">
															<div className="inner">
																<span className="count">00</span>Mins
															</div>
														</div>
														<div className="counter-column">
															<div className="inner">
																<span className="count">00</span>Secs
															</div>
														</div>
													</div>
												</div>

												<a href="shopping" className="cart-btn btn-lg">
													Shop Now
												</a>
											</div>
										</div>
									</section>
								</div>
							</div>
						);
					})}
				</Fade>
			</div>

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
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Aliquid, fuga quas itaque eveniet beatae optio.
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
								<div className="single-testimonial-slider">
									<div className="client-avater">
										<img src="assets/img/avaters/avatar1.png" alt="" />
									</div>
									<div className="client-meta">
										<h3>
											Saira Hakim <span>Local shop owner</span>
										</h3>
										<p className="testimonial-body">
											" Sed ut perspiciatis unde omnis iste natus error
											veritatis et quasi architecto beatae vitae dict eaque ipsa
											quae ab illo inventore Sed ut perspiciatis unde omnis iste
											natus error sit voluptatem accusantium "
										</p>
										<div className="last-icon">
											<i className="fas fa-quote-right"></i>
										</div>
									</div>
								</div>
								<div className="single-testimonial-slider">
									<div className="client-avater">
										<img src="assets/img/avaters/avatar2.png" alt="" />
									</div>
									<div className="client-meta">
										<h3>
											David Niph <span>Local shop owner</span>
										</h3>
										<p className="testimonial-body">
											" Sed ut perspiciatis unde omnis iste natus error
											veritatis et quasi architecto beatae vitae dict eaque ipsa
											quae ab illo inventore Sed ut perspiciatis unde omnis iste
											natus error sit voluptatem accusantium "
										</p>
										<div className="last-icon">
											<i className="fas fa-quote-right"></i>
										</div>
									</div>
								</div>
								<div className="single-testimonial-slider">
									<div className="client-avater">
										<img src="assets/img/avaters/avatar3.png" alt="" />
									</div>
									<div className="client-meta">
										<h3>
											Jacob Sikim <span>Local shop owner</span>
										</h3>
										<p className="testimonial-body">
											" Sed ut perspiciatis unde omnis iste natus error
											veritatis et quasi architecto beatae vitae dict eaque ipsa
											quae ab illo inventore Sed ut perspiciatis unde omnis iste
											natus error sit voluptatem accusantium "
										</p>
										<div className="last-icon">
											<i className="fas fa-quote-right"></i>
										</div>
									</div>
								</div>
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
								<p className="top-sub">Since Year 1999</p>
								<h2>
									We are <span className="orange-text">Fruitkha</span>
								</h2>
								<p>
									Etiam vulputate ut augue vel sodales. In sollicitudin neque et
									massa porttitor vestibulum ac vel nisi. Vestibulum placerat
									eget dolor sit amet posuere. In ut dolor aliquet, aliquet
									sapien sed, interdum velit. Nam eu molestie lorem.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Sapiente facilis illo repellat veritatis minus, et labore
									minima mollitia qui ducimus.
								</p>
								<a href="about.html" className="boxed-btn mt-4">
									know more
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
