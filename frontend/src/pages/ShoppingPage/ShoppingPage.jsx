import React, { useEffect, useState } from 'react';
import './ShoppingPage.css';
import './../../assets/css/main.css';
import './../../assets/css/magnific-popup.css';
import './../../assets/css/animate.css';
import './../../assets/css/meanmenu.min.css';
import './../../assets/css/responsive.css';
import { ProductList } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../features/products/productsSlice';
import { getAllCategories } from '../../features/categories/categoriesSlice';
import { Spinner } from './../../components';

export const ShoppingPage = () => {
	const [searchName, setSearchName] = useState('');
	const [searchData, setSearchData] = useState({});
	const dispatch = useDispatch();
	const {
		products,
		productSize,
		isError: productErr,
		isLoading: productLoad,
		message: productMess,
	} = useSelector((state) => state.products);

	const {
		categories,
		isLoading: categoriesLoad,
	} = useSelector((state) => state.categories);

	const onSubmit = (data) => {
		setSearchData(data);
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
		searchData = searchData.replace(/price_(\w+)__=(\d+)/g, 'price[$1]=$2');
		dispatch(getAllProducts(searchData));
	};

	useEffect(() => {
		Promise.all([
			dispatch(getAllProducts('')),
			dispatch(getAllCategories()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch, productErr, productMess]);

	if (
		productLoad ||
		categoriesLoad ||
		!Array.isArray(categories) ||
		!Array.isArray(products) ||
		products === undefined
	) {
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
						<div className="search-by-price ">
							<p className="bg-orange p-3 text-white font-weight-bold">
								The amount of price you want:
							</p>

							<ul className="price-ul">
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ price_gte__: '1', price_lte__: '10' })
										}
									>
										1 - 10$
									</a>
								</li>
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ price_gte__: '11', price_lte__: '20' })
										}
									>
										11 - 20$
									</a>
								</li>
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ price_gte__: '21', price_lte__: '30' })
										}
									>
										21 - 30$
									</a>
								</li>
								<li className="mb-2">
									<a
										onClick={() =>
											onSubmit({ price_gte__: '31', price_lte__: '40' })
										}
									>
										31 - 40$
									</a>
								</li>
								<li className="mb-2">
									<a onClick={() => onSubmit({ price_gte__: '41' })}>41+$</a>
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
												{categories?.map((category, index) => {
													return (
														<li key={index} className="border-0 bg-orange">
															<a
																className="text-white"
																onClick={() =>
																	onSubmit({ categoryID: category._id })
																}
															>
																{category.name}
															</a>
														</li>
													);
												})}
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

								<div className="row">
									<div className="col-lg-12 text-center">
										<div className="pagination-wrap">
											<ul>
												{Array.from(
													{
														length:
														productSize % 9 == 0
																? productSize / 9
																: productSize / 9 + 1,
													},
													(_, index) => index + 1
												).map((page) => (
													<li>
														<a onClick={() => onSubmit({...searchData, page})}>
															{page}
														</a>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
