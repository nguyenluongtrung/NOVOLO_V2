import React, { useEffect, useState } from 'react';
import './ShoppingPage.css';
import './../../assets/css/main.css';
// import './../../assets/css/owl.carousel.css';
import './../../assets/css/magnific-popup.css';
import './../../assets/css/animate.css';
import './../../assets/css/meanmenu.min.css';
import './../../assets/css/responsive.css';
import { ProductList } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productsSlice';
import { Spinner } from './../../components';
import { toast } from 'react-toastify';

export const ShoppingPage = () => {
	const [searchName, setSearchName] = useState('');
	const dispatch = useDispatch();
	const { products, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.products
	);

	const onSubmit = (data) => {
		let searchData = '';
		let i = 0;
		Object.keys(data).forEach((key) => {
			if (data[key] !== '') {
				searchData += key + '=' + data[key];
				++i;
				if (i < Object.keys(data).length) {
					searchData += '&';
				}
			}
		});
		searchData = searchData.replace(
			/calories_(\w+)__=(\d+)/g,
			'calories[$1]=$2'
		);
		dispatch(getAllProducts(searchData));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(getAllProducts(''));
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="breadcrumb-section breadcrumb-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="breadcrumb-text">
								<p>Fresh and Organic</p>
								<h1>Shop</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid fix-ui">
				<div className="row">
					<div className="col-sm-3 mt-5 mb-150">
						<div className="shop__sidebar__search w-100">
							<input
								style={{ width: '100%' }}
								className="rounded p-2 border-1"
								type="text"
								placeholder="Search..."
								onChange={(event) => setSearchName(event.target.value)}
							/>
						</div>
						<hr />
						<div className="search-by-price">
							<p className="bg-orange p-3 text-white font-weight-bold">
								The amount of price you want:
							</p>

							<ul className="price-ul">
								<li className="mb-2">
									<a href="search-price?from=${1}&to=${10}">1 - 10$</a>
								</li>
								<li className="mb-2">
									<a href="search-price?from=${11}&to=${20}">11 - 20$</a>
								</li>
								<li className="mb-2">
									<a href="search-price?from=${21}&to=${30}">21 - 30$</a>
								</li>
								<li className="mb-2">
									<a href="search-price?from=${31}&to=${40}">31 - 40$</a>
								</li>
								<li className="mb-2">
									<a href="search-price?from=${41}&to=${-1}">41+$</a>
								</li>
							</ul>
						</div>
						<hr />
						<div className="search-by-categories ">
							<p className="bg-orange p-3 text-white font-weight-bold">
								The amount of calories you want to take in
							</p>

							<ul className="calories-ul">
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ calories_gte__: '0', calories_lte__: '100' })
										}
									>
										0 - 100 (calories)
									</a>
								</li>
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ calories_gte__: '100', calories_lte__: '200' })
										}
									>
										100 - 200 (calories)
									</a>
								</li>
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ calories_gte__: '200', calories_lte__: '300' })
										}
									>
										200 - 300 (calories)
									</a>
								</li>
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ calories_gte__: '300', calories_lte__: '400' })
										}
									>
										300 - 400 (calories)
									</a>
								</li>
								<li className="mb-2">
									<a onClick={() => onSubmit({ calories_gte__: '400' })}>
										400+ (calories)
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-sm-9">
						<div className="product-section mt-5  mb-150">
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<div className="product-filters">
											<ul>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${-1}"
													>
														All
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${1}"
													>
														Chicken
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${2}"
													>
														Sandwich
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${3}"

													>
														Burger
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${4}"
													>
														Beverage
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${5}"
													>
														Spaghetti
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${6}"
													>
														Salad
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${7}"
													>
														Taco
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${8}"
													>
														Fresh Fries
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${9}"
													>
														Dessert
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a
														className="text-white"
														href="search-category?id=${10}"
													>
														Slide Dish
													</a>
												</li>
												<li
													// onMouseOver="this.style.backgroundColor = '#000'"
													// onMouseOut="this.style.backgroundColor = '#f28123'"
													className="border-0 bg-orange"
												>
													<a className="text-white" href="view-all-combo">
														Combo
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<ProductList products={products} searchName={searchName}/>
								{/* <div className="row product-lists">
                                <c:if test="${ms != null}">
                                    <p className="w-100 text-center text-secondary">${ms}</p>
                                </c:if>
                                <c:if test="${ms == null}">
                                    <c:if test="${isCombo == null}">
                                        <c:forEach items="${list}" var="c">
                                            <c:if test="${(c.isSurprise == true && c.status == true) || (c.isSurprise == false)}">
                                                <div className="col-lg-4 col-md-6 text-center strawberry">
                                                    <div className="single-product-item ${c.isSurprise ? "bg-yellow" : ''}" >
                                                        <div className="product-image">
                                                            <a href="single-product?id=${c.productID}"><img src="${c.image}" style='width:100%;height:250px'></a>
                                                        </div>
                                                        <h3 style="${c.isSurprise ? "color: grey" : ''}">${c.name}</h3>
                                                        <p style="${c.isSurprise ? "color: grey" : ''}" className="product-price"> ${c.price}$ </p>
                                                        <p className="${c.isSurprise ? "text-white" : 'text-secondary'}">${c.calories} Calories</p>
                                                        <c:if test="${c.status == false}">
                                                            <a href="sorry.jsp" className="btn btn-danger px-5 py-3">Sold out</a>
                                                        </c:if>
                                                        <c:if test="${c.status == true}">
                                                            <a href="add-to-cart?productID=${c.productID}" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                                                        </c:if>

                                                        <c:if test="${sessionScope.acc.role != null}">
                                                            <c:if test="${c.isSurprise == false}">
                                                                <a href="add-to-wishlist?productID=${c.productID}"><button className="btn btn-danger px-5 py-3"><i className="fas fa-heart" onclick="changeColor(this)"></i></button></a>
                                                                    </c:if>
                                                                </c:if>
                                                    </div>
                                                </div>
                                            </c:if>
                                        </c:forEach>
                                    </c:if>
                                    <c:if test="${isCombo != null}">
                                        <c:forEach items="${listCombo}" var="c">
                                            <div className="col-lg-4 col-md-6 text-center strawberry border-danger">
                                                <div className="single-product-item">
                                                    <div className="product-image">
                                                        <a href="combo-detail?id=${c.comboID}"><img src="${c.image}" style='width:100%;height:250px'></a>
                                                    </div>
                                                    <h3>${c.comboName}</h3>
                                                    <p className="product-price"> ${c.totalPrice}$ </p>
                                                    <p className="text-secondary">${c.totalCalories} Calories</p>
                                                    <a href="add-to-cart?comboID=${c.comboID}" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                                                    <c:if test="${sessionScope.acc.role != null}">
                                                        <a href="add-to-wishlist?comboID=${c.comboID}"><button className="btn btn-danger px-5 py-3"><i className="fas fa-heart" onclick="changeColor(this)"></i></button></a>
                                                            </c:if>
                                                </div>
                                            </div>
                                        </c:forEach>
                                    </c:if>
                                </c:if> */}

								{/* <c:if test="${price == null && s_name == null && calo == null && category == null}">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="pagination-wrap">
                                            <ul>
                                                <c:forEach begin="1" end="${pageNumber}" var="i">
                                                    <li><a href="shopping?index=${i}">${i}</a></li>
                                                    </c:forEach>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </c:if> */}

								{/* <c:if test="${price != null && s_name == null && calo == null && category == null}">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="pagination-wrap">
                                            <ul>
                                                <c:forEach begin="1" end="${pageNumber}" var="i">
                                                    <li><a href="search-price?from=${from}&to=${to}&index=${i}">${i}</a></li>
                                                    </c:forEach>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </c:if> */}

								{/* <c:if test="${price == null && s_name != null && calo == null && category == null}">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="pagination-wrap">
                                            <ul>
                                                <c:forEach begin="1" end="${pageNumber}" var="i">
                                                    <li><a href="search-name?name=${name}&index=${i}">${i}</a></li>
                                                    </c:forEach>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </c:if> */}

								{/* <c:if test="${price == null && s_name == null && calo != null && category == null}">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="pagination-wrap">
                                            <ul>
                                                <c:forEach begin="1" end="${pageNumber}" var="i">
                                                    <li><a href="search-by-calories?from=${from}&to=${to}&index=${i}">${i}</a></li>
                                                    </c:forEach>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </c:if> */}

								{/* <c:if test="${price == null && s_name == null && calo == null && category != null}">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="pagination-wrap">
                                            <ul>
                                                <c:forEach begin="1" end="${pageNumber}" var="i">
                                                    <li><a href="search-category?id=${id}&index=${i}">${i}</a></li>
                                                    </c:forEach>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </c:if> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};