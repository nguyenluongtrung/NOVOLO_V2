import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
	getUserInformation,
	logout,
	reset,
} from '../../features/auth/authSlice';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './../../assets/css/main.css';
import './../../assets/css/responsive.css';
import './../../assets/css/scss/common/_header.scss';
import avt from '../../assets/img/products/avt.png';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

export const Header = () => {
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isHomeActive = location.pathname === '/home';
	const isShopActive = location.pathname === '/shop';
	const isContactActive = location.pathname === '/contact';
	const isAboutActive = location.pathname === '/about-us';
	const isCartActive = location.pathname === '/cart';
	const isWishListActive = location.pathname === '/wishList';
	const isAboutMeActive = location.pathname === '/about-me';
	const isAdminPageActive = location.pathname === '/admin-product';
	const isLoginPageActive = location.pathname === '/login';
	const isRegisterPageActive = location.pathname === '/register';
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/home');
	};

	useEffect(() => {
		dispatch(getUserInformation());
	}, [dispatch]);

	return (
		<div className="top-header-area" id="sticker">
			<div
				className="container-fluid justify-content-center align-items-center"
				style={{
					backgroundColor: 'rgba(0,0,0,0.5)',
					padding: '0 100px',
					marginTop: '-25px',
				}}
			>
				<div className="row">
					<div className="col-lg-12 col-sm-12 text-center">
						<div className="main-menu-wrap">
							<div className="site-logo">
								<a href="">
									<img
										src={avt}
										style={{
											padding: 0,
											marginTop: '-20px',
											marginLeft: '-80px',
											paddingTop: '20px',
											width: '70%',
										}}
									/>
								</a>
							</div>

							<nav className="main-menu" style={{ paddingTop: '20px' }}>
								<ul>
									<li className={isHomeActive ? 'current-list-item' : ''}>
										<Link to={'/home'}>Home</Link>
									</li>
									<li className={isAboutActive ? 'current-list-item' : ''}>
										<Link to={'/about-us'}>About</Link>
									</li>
									<li className={isContactActive ? 'current-list-item' : ''}>
										<Link to={'/contact'}>Contact</Link>
									</li>
									<li className={isShopActive ? 'current-list-item' : ''}>
										<Link to={'/shop'}>Menu</Link>
									</li>
									{user?.role === 'admin' && (
										<li
											className={isAdminPageActive ? 'current-list-item' : ''}
										>
											<Link to={'/admin-product'}>Admin Page</Link>
										</li>
									)}

									{user?.role === 'staff' && (
										<li>
											<a className="" href="staff-page">
												Staff Page
											</a>
										</li>
									)}
									<li>
										{/* <div className="header-icons">
                                    <a className="mobile-hide search-bar-icon" href="#"><i className="fas fa-search"></i></a>
                                    <c:if test="${sessionScope.count != null && sessionScope.count != 0}">
                                        <a className="shopping-cart" href="add-to-cart"><i className="fas fa-shopping-cart"></i>
                                            <span className='badge badge-warning rounded-circle' id='lblCartCount'> ${sessionScope.count} </span>
                                        </a>
                                    </c:if>
                                    <c:if test="${sessionScope.count == null || sessionScope.count == 0}">
                                        <a className="shopping-cart" href="add-to-cart"><i className="fas fa-shopping-cart"></i></a>
                                    </c:if>

                                </div> */}

										{user ? (
											<>
												<li>
													<Link
														className={isCartActive ? 'current-list-item' : ''}
														to={'/cart'}
													>
														<FaShoppingCart />
													</Link>
												</li>
												<li>
													<Link
														className={
															isWishListActive ? 'current-list-item' : ''
														}
														to={'/wishList'}
													>
														<FaHeart />
													</Link>
												</li>
												<li>
													<Link
														className={
															isAboutMeActive ? 'current-list-item' : ''
														}
														to={'/about-me'}
													>
														My Account
													</Link>
												</li>
												<li>
													<Link onClick={onLogout}>Log out</Link>
												</li>
											</>
										) : (
											<>
												<li>
													<Link
														style={{
															color: isLoginPageActive ? '#F28123' : '',
														}}
														to={'/login'}
													>
														Login
													</Link>
												</li>
												<li>
													<Link
														style={{
															color: isRegisterPageActive ? '#F28123' : '',
														}}
														to={'/register'}
													>
														Sign up
													</Link>
												</li>
											</>
										)}
									</li>
								</ul>
							</nav>
							<a className="mobile-show search-bar-icon" href="#">
								<i className="fas fa-search"></i>
							</a>
							<div className="mobile-menu"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
