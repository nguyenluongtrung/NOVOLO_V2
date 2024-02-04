import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getProductsFromCart } from '../../features/products/productsSlice';
import { Spinner } from '../../components';
import { FaWindowClose } from 'react-icons/fa';
import { deleteProductsFromCart } from '../../features/auth/authSlice';
import { getAllNewestPrices } from '../../features/prices/pricesSlice';

export const CartPage = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		products,
		isError: productError,
		isLoading: productLoading,
		isSuccess: productSuccess,
		message: productMessage,
	} = useSelector((state) => state.products);
	const {
		prices,
		isError: priceError,
		isLoading: priceLoading,
		message: priceMessage,
	} = useSelector((state) => state.prices);

	const {
		isSuccess: authSuccess,
		isError: authError,
		isLoading: authLoading,
		message: authMessage,
	} = useSelector((state) => state.auth);

	useEffect(() => {
		Promise.all([
			dispatch(getProductsFromCart()),
			dispatch(getAllNewestPrices()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch]);

	useEffect(() => {
		if(Array.isArray(products)){
			const calculatedTotal = products.reduce((accumulator, currentValue) => {
				return (
					accumulator +
					currentValue?.quantity *
						prices[
							prices.findIndex(
								(price) =>
									price.productId ==
									currentValue?.productId?._id
							)
						]?.price
				);
			}, 0);
	
			setTotalPrice(calculatedTotal)
		}
	}, [products, prices])

	const handleDeleteProductFromCart = async (productId) => {
		await dispatch(deleteProductsFromCart(productId));
		if (authSuccess) {
			toast.success('Delete from cart successfully!');
			dispatch(getProductsFromCart());
		} else if (authError) {
			toast.error(authMessage);
		}
	};

	const handleCheckOut = (totalPrice) => {
		navigate('/check-out', {state: {totalPrice: totalPrice, cart: {products: products}}})
	}

	if (
		productLoading ||
		priceLoading ||
		authLoading ||
		!Array.isArray(products) ||
		!Array.isArray(prices)
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
								<h1>Cart</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cart-section mt-150 mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 col-md-12">
							<div className="cart-table-wrap">
								<table className="cart-table">
									<thead className="cart-table-head">
										<tr className="table-head-row">
											<th className="product-remove"></th>
											<th className="product-image">Product Image</th>
											<th className="product-name">Name</th>
											<th className="product-price">Price</th>
											<th className="product-quantity">Quantity</th>
											<th className="product-total">Total</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product) => {
											return (
												<tr className="table-body-row">
													<td
														className="product-remove"
														onClick={() =>
															handleDeleteProductFromCart(
																product?.productId?._id
															)
														}
													>
														<FaWindowClose />
													</td>
													<td className="product-image">
														<img
															src={product?.productId?.image}
															alt=""
															style={{ height: '50px', width: '50px' }}
														/>
													</td>
													<td className="product-name">
														{product?.productId?.name}
													</td>
													<td className="product-price">
														{
															prices[
																prices.findIndex(
																	(price) =>
																		price.productId == product?.productId?._id
																)
															]?.price
														}
														$
													</td>
													<td className="product-quantity">
														<input
															type="number"
															defaultValue={product?.quantity}
														/>
													</td>
													<td className="product-total">
														{product?.quantity *
															prices[
																prices.findIndex(
																	(price) =>
																		price.productId == product?.productId?._id
																)
															]?.price}
														$
													</td>
												</tr>
											);
										})}
										{/* <c:forEach items="${items}" var="c">
											<tr className="table-body-row">
												<td className="product-remove">
													<a href="remove-from-cart?id=${c.product.productID}">
														<i className="far fa-window-close"></i>
													</a>
												</td>
												<td className="product-image">
													<img
														src="${c.product.image}"
														alt=""
														style="height: 50px; width: 50px;"
													/>
												</td>
												<td className="product-name">${c.product.name}</td>
												<td className="product-price">${c.product.price}$</td>
												<td className="product-quantity">
													<input
														type="number"
														readonly
														placeholder="${c.quantity}"
													/>
												</td>
												<td className="product-total">
													${c.quantity * c.product.price}$
												</td>
											</tr>
										</c:forEach>
										<c:forEach items="${comboItems}" var="c">
											<tr className="table-body-row">
												<td className="product-remove">
													<a href="remove-from-cart?c_id=${c.combo.comboID}">
														<i className="far fa-window-close"></i>
													</a>
												</td>
												<td className="product-image">
													<img
														src="${c.combo.image}"
														alt=""
														style="height: 50px; width: 50px;"
													/>
												</td>
												<td className="product-name">${c.combo.comboName}</td>
												<td className="product-price">${c.combo.totalPrice}$</td>
												<td className="product-quantity">
													<input
														type="number"
														readonly
														placeholder="${c.quantity}"
													/>
												</td>
												<td className="product-total">
													<fmt:formatNumber
														value="${c.combo.totalPrice * c.quantity}"
														pattern="#.##"
													/>
													$
												</td>
											</tr>
										</c:forEach> */}
									</tbody>
								</table>
							</div>
							<div className="mt-5">
								<Link to={'/shop'} className="px-5 py-3 mt-5 continue-btn">
									Continue shopping
								</Link>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="total-section">
								<table className="total-table">
									<thead className="total-table-head">
										<tr className="table-total-row">
											<th></th>
											<th>Price</th>
											{/* <c:if test="${sessionScope.acc.role != null}">
													<th>Exchanged points</th>
												</c:if> */}
										</tr>
									</thead>
									<tbody>
										<tr className="total-data">
											<td>
												<strong>Total: </strong>
											</td>
											<td>
												{totalPrice}
												$
											</td>
											{/* <td id="subtotalCell">${subtotal}$</td> */}
											{/* <c:if test="${sessionScope.acc.role != null}">
													<td></td>
												</c:if> */}
										</tr>
									</tbody>
								</table>
								<div className="cart-buttons">
									{/* <c:if test="${sessionScope.acc.role != null}">
												<p>
													Your points are:{' '}
													<span id="my-point">
														${sessionScope.acc.totalAccumulatedPoint} points
													</span>
												</p>
											</c:if> */}

									<button onClick={() => handleCheckOut(totalPrice)} className="btn-orange">
										Check Out
									</button>
								</div>
							</div>

							<div className="coupon-section">
								<h3>Apply Coupon</h3>
								<div className="coupon-form-wrap">
									<form action="add-to-cart" method="post">
										<input
											type="hidden"
											name="productID"
											value="${productID}"
										/>
										<p>
											<input type="text" name="code" placeholder="Coupon" />
										</p>
										<p>
											<input type="submit" value="Apply" />
										</p>
									</form>
									{/* <p className="text-danger">${ms != null ? ms : ''}</p> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
