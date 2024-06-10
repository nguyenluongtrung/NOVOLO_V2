import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getProductsFromCart } from '../../features/products/productsSlice';
import { Spinner } from '../../components';
import { FaWindowClose } from 'react-icons/fa';
import {
	deleteProductsFromCart,
	getUserInformation,
} from '../../features/auth/authSlice';
import { getAllNewestPrices } from '../../features/prices/pricesSlice';
import { getAllPromotions } from '../../features/promotion/promotionsSlice';

export const CartPage = () => {
	const {
		user,
		isSuccess: authSuccess,
		isError: authError,
		isLoading: authLoading,
		message: authMessage,
	} = useSelector((state) => state.auth);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalPriceUsingPromotion, setTotalPriceUsingPromotion] = useState(0);
	const [promotionCode, setPromotionCode] = useState('');
	const [promotionValue, setPromotionValue] = useState(null);
	const [promotion, setPromotion] = useState(null);
	const [productTicks, setProductTicks] = useState([]);
	const [currentTotalAccumulatedPoints, setCurrentTotalAccumulatedPoints] =
		useState(user.totalAccumulatedPoint);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { products, isLoading: productLoading } = useSelector(
		(state) => state.products
	);
	const { promotions, isLoading: promotionLoading } = useSelector(
		(state) => state.promotions
	);
	const { prices, isLoading: priceLoading } = useSelector(
		(state) => state.prices
	);

	useEffect(() => {
		Promise.all([
			dispatch(getProductsFromCart()),
			dispatch(getAllNewestPrices()),
			dispatch(getAllPromotions()),
			dispatch(getUserInformation()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch]);

	useEffect(() => {
		if (Array.isArray(products)) {
			const calculatedTotal = products.reduce((accumulator, currentValue) => {
				return (
					accumulator +
					currentValue?.quantity *
						prices[
							prices.findIndex(
								(price) => price.productId == currentValue?.productId?._id
							)
						]?.price
				);
			}, 0);

			setTotalPrice(calculatedTotal);
		}
	}, [products, prices]);

	const calculateTotalAfterPromotion = () => {
		if (Array.isArray(products)) {
			const calculatedTotal = products.reduce((accumulator, currentValue) => {
				return promotion &&
					promotion?.productIds.findIndex(
						(pId) => String(pId) == String(currentValue?.productId?._id)
					) != -1
					? accumulator +
							(1 - Number(promotionValue)) *
								currentValue?.quantity *
								prices[
									prices.findIndex(
										(price) => price.productId == currentValue?.productId?._id
									)
								]?.price
					: accumulator +
							currentValue?.quantity *
								prices[
									prices.findIndex(
										(price) => price.productId == currentValue?.productId?._id
									)
								]?.price;
			}, 0);

			// setTotalPriceUsingPromotion(calculatedTotal);
			return calculatedTotal;
		}
	};

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
		if (Number(promotionValue)) {
			const newPrice = parseFloat(calculateTotalAfterPromotion()).toFixed(1);
			setTotalPrice(newPrice);
			navigate('/check-out', {
				state: { totalPrice: newPrice, cart: { products } },
			});
		} else {
			navigate('/check-out', {
				state: {
					totalPrice,
					currentTotalAccumulatedPoints,
					cart: { products },
				},
			});
		}
	};

	const handleCheckPromotion = (e) => {
		e.preventDefault();
		let promotion;
		const promotionIndex = promotions.findIndex(
			(promotion) => promotion.promotionCode === promotionCode
		);
		if (promotionIndex !== -1) {
			promotion = promotions[promotionIndex];
			setPromotionValue(promotion.promotionValue);
			setPromotion(promotion);
		} else {
			setPromotionValue(null);
		}
	};

	const handleUpdateExchangedPoints = (
		productId,
		exchangedPoint,
		reducedPrice
	) => {
		if (productTicks.findIndex((id) => String(id) == String(productId)) == -1) {
			setCurrentTotalAccumulatedPoints(
				currentTotalAccumulatedPoints - exchangedPoint
			);
			setTotalPrice(totalPrice - reducedPrice);
			setProductTicks([...productTicks, productId]);
		} else {
			setCurrentTotalAccumulatedPoints(
				currentTotalAccumulatedPoints + exchangedPoint
			);
			setTotalPrice(totalPrice + reducedPrice);
			setProductTicks(
				productTicks.filter((id) => String(id) !== String(productId))
			);
		}
	};

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

			<div className="cart-section pt-150 pb-150">
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
											<th>Exchanged points</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product) => {
											return (
												<tr className="total-data">
													<td className="product-name">
														{product?.productId?.name}
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
													<td>
														{product?.quantity *
															product?.productId?.exchangedPoint}{' '}
														points{' '}
														<input
															type="checkbox"
															onClick={() =>
																handleUpdateExchangedPoints(
																	product?.productId._id,
																	product?.quantity *
																		product?.productId?.exchangedPoint,
																	product?.quantity *
																		prices[
																			prices.findIndex(
																				(price) =>
																					price.productId ==
																					product?.productId?._id
																			)
																		]?.price
																)
															}
															disabled={
																productTicks.findIndex(
																	(id) =>
																		String(id) ==
																		String(product?.productId?._id)
																) == -1 &&
																Number(
																	product?.quantity *
																		product?.productId?.exchangedPoint
																) > Number(currentTotalAccumulatedPoints)
															}
														/>
													</td>
												</tr>
											);
										})}
										<tr className="total-data">
											<td>
												<strong>Total: </strong>
											</td>
											<td>
												<span
													style={{
														color: Number(promotionValue) ? 'red' : '',
														textDecoration: Number(promotionValue)
															? 'line-through'
															: '',
													}}
												>
													{Math.round(totalPrice)}$
												</span>
												&nbsp;
												<span>
													{/* {Number(promotionValue)
														? `${parseFloat(
																totalPrice * (1 - Number(promotionValue))
														  ).toFixed(1)}$`
														: ''} */}

													{Number(promotionValue)
														? `${Math.round(calculateTotalAfterPromotion())}$`
														: ''}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
								<div className="cart-buttons">
									{/* {Number(promotionValue) && (
										<p className="text-danger" style={{ fontStyle: 'italic' }}>
											Promotion event only applies for:{' '}
											<span id="my-point">
												{products.map((product) => {
													if (
														promotion?.productIds.findIndex(
															(id) => id == product._id
														) != -1
													)
														return <span>{product.name} &nbsp;</span>;
												})}
											</span>
										</p>
									)} */}
									<p>
										Your current accumulated points are:{' '}
										<span id="my-point">
											{currentTotalAccumulatedPoints} points
										</span>
									</p>
									<button
										onClick={() => handleCheckOut(totalPrice)}
										className="btn-orange"
									>
										Check Out
									</button>
								</div>
							</div>

							<div className="coupon-section">
								<h3>Apply Coupon</h3>
								<div className="coupon-form-wrap">
									<form onSubmit={handleCheckPromotion}>
										<p>
											<input
												type="text"
												placeholder="Coupon"
												value={promotionCode}
												onChange={(e) => setPromotionCode(e.target.value)}
											/>
										</p>
										{Number(promotionValue) ? (
											<p style={{ color: 'red' }}>
												Apply promotion code successfully!
											</p>
										) : (
											''
										)}
										<p>
											<button type="submit" className="btn-orange px-4">
												Apply
											</button>
										</p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
