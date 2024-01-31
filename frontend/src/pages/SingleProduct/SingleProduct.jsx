import './SingleProduct.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProductById } from '../../features/products/productsSlice';
import { Spinner } from '../../components';
import { getCategoryById } from '../../features/categories/categoriesSlice';

export const SingleProduct = () => {
	const { id } = useParams();

	const dispatch = useDispatch();
	const {
		products: product,
		isError,
		isLoading,
		isSuccess,
		message,
	} = useSelector((state) => state.products);
	const { categories: category } = useSelector((state) => state.categories);

	useEffect(() => {
		const loadData = async () => {
			try {
				await dispatch(getProductById(id));
			} catch (error) {
				console.error('Error loading product data:', error);
			}
		};

		loadData();
	}, [dispatch, id]);

	useEffect(() => {
		if (product && product.categoryID) {
			dispatch(getCategoryById(product.categoryID));
		}
	}, [dispatch, product]);

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
								<p>See more Details</p>
								<h1>Single Product</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="single-product pt-150 pb-150 fix-ui">
				<div className="container">
					<div className="row">
						<div className="col-md-5">
							<div className="single-product-img">
								<img src={`/${product?.image}`} alt="" />
							</div>
						</div>
						<div className="col-md-7">
							<div className="single-product-content">
								<h3>{product?.name}</h3>
								<p className="single-product-pricing"></p>
								<div className="single-product-form">
									<p>Calories: {product?.calories}</p>
									<p>Categories: {category?.name}</p>
									<p>
										<strong>Rating: {product?.rating} /5.0</strong>
									</p>
									<form>
										<input
											type="number"
											placeholder="0"
											name="quantity"
											min="1"
										/>
										<br />
										{/* <c:if test="${product.status == false}">
											<a href="sorry.jsp" className="btn btn-danger px-5 py-3">
												Sold out
											</a>
										</c:if>
										<c:if test="${product.status == true}">
											<button
												className="btn btn-success px-5 py-3"
												type="submit"
											>
												<i className="fas fa-shopping-cart"></i> Add to Cart
											</button>
										</c:if> */}
									</form>
									<br />
									{/* <c:if test="${sessionScope.acc.role != null}">
										<a href="add-to-wishlist?productID=${product.productID}">
											<button className="btn btn-danger px-5 py-3">
												<i className="fas fa-heart"></i>
											</button>
										</a>
									</c:if> */}
								</div>
								<h4>Share:</h4>
								<ul className="product-share">
									<li>
										<a href="">
											<i className="fab fa-facebook-f"></i>
										</a>
									</li>
									<li>
										<a href="">
											<i className="fab fa-twitter"></i>
										</a>
									</li>
									<li>
										<a href="">
											<i className="fab fa-google-plus-g"></i>
										</a>
									</li>
									<li>
										<a href="">
											<i className="fab fa-linkedin"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
		
				<div className="row row-content">
					<div className="col-12">
						<h3 className="mx-auto text-black mt-5 mb-5 text-center">
							Feedback
						</h3>
					</div>
					{/* <div className="col-9 offset-2 mx-auto">
                    <c:if test="${write != null}" >
                        <form action="feedback" method="post">
                            <input name="pid" value="${product.productID}" style="display:none;">
                            <input name="orate" value="${product.rating}" style="display:none;">

                            <div className="rating mx-auto">
                                <div className="star">
                                    <input type="radio" name="rate" id="rate-1" value="5" />
                                    <label for="rate-1"  className="fas fa-star"></label>
                                    <input type="radio" name="rate" id="rate-2" value="4" />
                                    <label for="rate-2"  className="fas fa-star"></label>
                                    <input type="radio" name="rate" id="rate-3" value="3" />
                                    <label for="rate-3"  className="fas fa-star"></label>
                                    <input type="radio" name="rate" id="rate-4" value="2" />
                                    <label for="rate-4"  className="fas fa-star"></label>
                                    <input type="radio" name="rate" id="rate-5" value="1" />
                                    <label for="rate-5"  className="fas fa-star"></label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-12">
                                    <textarea className="form-control" name="feedback" placeholder="Please write your feedback" rows="4"></textarea>
                                </div>
                            </div>
                            <div className="form-group row offset-10">
                                <div className="col-12">
                                    <button type="submit"  className="btn btn-warning">Send Feedback</button>
                                </div>
                            </div>

                        </form>  
                    </c:if>

                    <div className="feedback">
                        <form>
                            <c:forEach items="${feed}" var="c">
                                <div className="feedback-content">
                                    <div className="date"><p>${c.date}</p></div>

                                    <div className="row">

                                        <div className="media mt-4">
                                            <a className="pr-3" href="#"><img style="width:40px; height: 40px;" src="${sessionScope.acc.gender ? 'https://bootdey.com/img/Content/avatar/avatar7.png' : 'data:image/png;base64,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'}" alt="avatar" className="ml-3" style="width: 35px; height: 35px;"/>  
                                            </a>
                                            <div className="media-body">
                                                <div className="row">
                                                    <div className="col-12 d-flex">
                                                        <h5>${c.name}</h5>
                                                    </div>
                                                </div>
                                                ${c.msg}
                                            </div>
                                        </div>
                                    </div>
                                    <c:if test="${c.reply != ''}">
                                        <div className="media mt-4 ml-5" style="padding-left:50px;">
                                            <a className="pr-3" href="#"><img className="rounded-circle" alt="avt" style="width:40px;height:40px;" src="https://i.imgur.com/xELPaag.jpg"></a>
                                            <div className="media-body">
                                                <div className="row">
                                                    <div className="col-12 d-flex">
                                                        <h5>Admin</h5>
                                                    </div>
                                                </div>
                                                ${c.reply}
                                            </div>
                                        </div>
                                    </c:if>
                                </div><hr>
                            </c:forEach>


                        </form>
                    </div>
                </div> */}
				</div>
			</div>
			</div>

			<div className="more-products mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="section-title">
								<h3>
									<span className="orange-text">Related</span> Products
								</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Aliquid, fuga quas itaque eveniet beatae optio.
								</p>
							</div>
						</div>
					</div>
					{/* <div className="row">
						<c:forEach items="${relatedProducts}" var="c">
							<div className="col-lg-4 col-md-6 text-center">
								<div className="single-product-item">
									<div className="product-image">
										<a href="single-product?id=${c.productID}">
											<img src="${c.image}" style="width:100%;height:250px" />
										</a>
									</div>
									<h3>${c.name}</h3>
									<p className="product-price"> ${c.price}$ </p>
									<a
										href="add-to-cart?productID=${c.productID}"
										className="cart-btn"
									>
										<i className="fas fa-shopping-cart"></i> Add to Cart
									</a>
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
		</div>
	);
};
