import { useDispatch, useSelector } from 'react-redux';
import './CheckoutPage.css';
import { useEffect } from 'react';
import {
	deleteAllProductsFromCart,
	getUserInformation,
} from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../features/orders/ordersSlice';
import { Spinner } from '../../components';
import { toast } from 'react-toastify';

export const CheckoutPage = () => {
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const data = location.state;
	const totalPrice = data.totalPrice;
	const products = data.cart.products;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const productList = [];
		products.map((product) =>
			productList.push({
				productId: product.productId._id,
				quantity: product.quantity,
			})
		);
		const orderData = {
			totalPrice: totalPrice,
			note: data.note,
			shipping: {
				name: data.name,
				address: data.address,
				phone: data.phone,
				email: data.email,
			},
			userId: user._id,
			purchasedItems: {
				products: productList,
			},
		};

		await Promise.all([
			dispatch(createOrder(orderData)),
			dispatch(deleteAllProductsFromCart()),
		]);

		if (isSuccess) {
			toast.success('Place order successfully!');
			navigate('/thank-you');
		} else if (isError) {
			toast.error(message);
		}
	};

	useEffect(() => {
		dispatch(getUserInformation());
	}, [dispatch]);

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
								<h1>Check Out Product</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="checkout-section mt-150 mb-150">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="checkout-accordion-wrap">
								<div className="accordion" id="accordionExample">
									<div className="card single-accordion">
										<div className="card-header" id="headingOne">
											<h5 className="mb-0">
												<button
													className="btn btn-link"
													type="button"
													data-toggle="collapse"
													data-target="#collapseOne"
													aria-expanded="true"
													aria-controls="collapseOne"
												>
													Billing Address
												</button>
											</h5>
										</div>

										<div
											id="collapseOne"
											className="collapse show"
											aria-labelledby="headingOne"
											data-parent="#accordionExample"
										>
											<div className="card-body">
												<div className="billing-address-form">
													<form onSubmit={handleSubmit(onSubmit)}>
														<p>
															<input
																type="text"
																placeholder="Name"
																{...register('name', {
																	required: {
																		value: true,
																		message: 'Name is required!',
																	},
																})}
																defaultValue={user.name}
															/>
														</p>
														{errors.name && <p className='text-danger'>{errors.name.message}</p>}
														<p>
															<input
																type="email"
																placeholder="Email"
																{...register('email', {
																	required: {
																		value: true,
																		message: 'Email is required!',
																	},
																})}
																defaultValue={user.email}
															/>
														</p>
														{errors.email && <p  className='text-danger'>{errors.email.message}</p>}
														<p>
															<input
																type="text"
																placeholder="Address"
																{...register('address', {
																	required: {
																		value: true,
																		message: 'Address is required!',
																	},
																})}
																defaultValue={user.address}
															/>
														</p>
														{errors.address && <p className='text-danger'>{errors.address.message}</p>}
														<p>
															<input
																type="text"
																placeholder="Phone"
																{...register('phone', {
																	required: {
																		value: true,
																		message: 'Phone is required!',
																	},
																})}
																defaultValue={user.phone}
															/>
														</p>
														{errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
														<p>
															<textarea
																{...register('note')}
																id="bill"
																cols="30"
																rows="10"
																placeholder="Note Something"
															></textarea>
														</p>
														Choose payment methods:
														<select name="type">
															<option value="cash">By cash</option>
															<option value="vnpay">By VNPay</option>
														</select>
														<br />
														<button
															type="submit"
															className="boxed-btn place-btn px-4 py-2"
														>
															Place Order
														</button>
													</form>
													{/* <button>
														<a href="vnpayajax?total=${subtotal}">
															Place order VNPAY
														</a>
													</button> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="order-details-wrap">
								<table className="order-details">
									<thead>
										<tr>
											<th>Your order Details</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody className="order-details-body">
										<tr>
											<td>Product</td>
											<td>Total</td>
										</tr>
										{/* <c:if test="${ok != null}">
                                        <c:forEach items="${items}" var="c">
                                            <tr className="total-data">
                                                <td><strong>${c.product.name}</strong></td>
                                                <c:forEach items="${saleList}" var="e">
                                                    <c:if test="${(e.productID == c.product.productID) && (e.saleQuantity > 0)}">
                                                        <c:if test="${c.quantity > e.saleQuantity}">
                                                            <td><del className="text-danger">${c.product.price * c.quantity}$</del> &nbsp; <fmt:formatNumber value="${c.product.price * e.saleQuantity * (1 - saleValue) + c.product.price * (c.quantity - e.saleQuantity)}" pattern="#.##" />$</td>
                                                        </c:if>
                                                        <c:if test="${c.quantity <= e.saleQuantity}">
                                                            <td><del className="text-danger">${c.product.price * c.quantity}$</del> &nbsp; <fmt:formatNumber value="${c.product.price * c.quantity * (1 - saleValue)}" pattern="#.##" />$</td>
                                                        </c:if>
                                                        <c:set var="k" value="1"></c:set>
                                                    </c:if>
                                                </c:forEach>
                                                <c:if test="${k != 1}">
                                                    <td>${c.product.price * c.quantity}$</td>
                                                </c:if>
                                                <c:set var="k" value="0"></c:set>
                                                </tr>
                                        </c:forEach>
                                        <c:forEach items="${comboItems}" var="c">
                                            <tr className="total-data">
                                                <td><strong>${c.combo.comboName}</strong></td>
                                                <td>
                                                <fmt:formatNumber value="${c.combo.totalPrice * c.quantity}" pattern="#.##" />$
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </c:if>
                                    <c:if test="${ok == null}">
                                        <c:forEach items="${items}" var="c">                             
                                            <tr>
                                                <td>${c.product.name}</td>
                                                <td>${c.product.price * c.quantity}$</td>
                                            </tr>
                                        </c:forEach>
                                        <c:forEach items="${comboItems}" var="c">
                                            <tr className="total-data">
                                                <td>${c.combo.comboName}</td>
                                                <td>
                                                <fmt:formatNumber value="${c.combo.totalPrice * c.quantity}" pattern="#.##" />$
                                                </td>
                                            </tr>
                                        </c:forEach>
                                    </c:if> */}
									</tbody>
									<tbody className="checkout-details">
										<tr>
											<td>Subtotal</td>
											<td>$</td>
										</tr>
										<tr>
											<td>
												<strong>TOTAL</strong>
											</td>
											<td>{totalPrice}$</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
