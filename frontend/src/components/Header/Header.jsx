import './Header.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';
import { FaHeart } from 'react-icons/fa';
import './../../assets/css/main.css';
import './../../assets/css/responsive.css';
import './../../assets/css/scss/common/_header.scss';

export const Header = () => {
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/home');
	};

	return (
		<div>
			<div>
				<div
					className="container-fluid justify-content-center align-items-center"
					style={{
						backgroundColor: 'rgba(0,0,0,0.5)',
						padding: '0 100px',
						marginTop: '-50px',
					}}
				>
					<div className="row">
						<div className="col-lg-12 col-sm-12 text-center">
							<div className="main-menu-wrap">
								<div className="site-logo">
									<a href="">
										<img
											src="/img/product/abc.png"
											style={{
												padding: 0,
												marginTop: '-20px',
												marginLeft: '-10px',
												paddingTop: '20px',
												width: '80%',
											}}
										/>
									</a>
								</div>

								<nav className="main-menu" style={{ paddingTop: '30px' }}>
									<ul>
										<li className="current-list-item">
											<Link to={'/home'}>Home</Link>
										</li>
										<li>
											<a href="#">About</a>
										</li>
										<li>
											<a href="#">Contact</a>
										</li>
										<li>
											<Link to={'/shop'}>Menu</Link>
										</li>
										{user?.role === 'admin' && (
											<li>
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
													<Link to={'/wishList'} className="wishlist">
														<FaHeart />
													</Link>
													<Link to={'/about-me'}>My Account</Link>
													<button onClick={onLogout}>Log out</button>
												</>
											) : (
												<>
													<Link to={'/login'}>Login</Link>
													<Link to={'/register'}>Sign up</Link>
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
		</div>
	);
};
