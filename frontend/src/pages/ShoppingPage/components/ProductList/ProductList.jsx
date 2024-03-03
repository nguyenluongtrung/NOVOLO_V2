import './ProductList.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa';
import { addProductToWishList, addProductsToCart } from '../../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Spinner } from '../../../../components';
import { useEffect } from 'react';
import { getAllNewestPrices } from '../../../../features/prices/pricesSlice';
import { FaShoppingCart } from 'react-icons/fa';

export const ProductList = ({ products, searchName, pageNumber }) => {
	const dispatch = useDispatch();

	const {
		isSuccess: authSuccess,
		isError: authError,
		isLoading: authLoading,
		message: authMessage,
	} = useSelector((state) => state.auth);

	const {
		prices,
		isError: priceError,
		isLoading: priceLoading,
		message: priceMessage,
	} = useSelector((state) => state.prices);

	const addProductToWishlist = async (productId) => {
		await dispatch(addProductToWishList(productId));
		if (authError) {
			toast.error(authMessage);
		} else if (authSuccess) {
			toast.success('Add product to wishlist successfully!');
		}
	};

	const addProductToCart = async (productId) => {
		await dispatch(addProductsToCart({productId: productId, quantity: 1}));
		if(authSuccess) {
			toast.success('Add to cart successfully!')
		} else if(authError){
			toast.error(authMessage);
		}
	}

	useEffect(() => {
		if (priceError) {
			toast.error(priceMessage);
		}
		dispatch(getAllNewestPrices());
	}, [dispatch, priceMessage, priceError]);

	if (priceLoading || authLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<div className="row">
				{products
					.filter((val) => {
						if (searchName == '') return val;
						else if (
							val.name.toLowerCase().includes(searchName.toLowerCase())
						) {
							return val;
						}
					})
					.map((product) => {
						return (
							<div className="col-lg-4 col-md-6 text-center strawberry">
								<div
									className={
										product?.isSurprise
											? 'single-product-item bg-yellow'
											: 'single-product-item'
									}
								>
									<div className="product-image">
										<Link to={`/single-product/${product._id}`}>
											<img
												src={product?.image}
												style={{ width: '100%', height: '250px' }}
											/>
										</Link>
									</div>
									<h3 style={{ color: product.isSurprise && 'grey' }}>
										{product?.name}
									</h3>
									<p
										style={{ color: product.isSurprise ? 'grey' : '' }}
										className="product-price"
									>
										{
											prices[
												prices.findIndex(
													(price) => price.productId === product._id
												)
											]?.price
										}{' '}
										$
									</p>
									<p
										className={
											product?.isSurprise ? 'text-white' : 'text-secondary'
										}
									>
										{product?.calories} Calories
									</p>

									{product?.productStatus ? (
										<a className="cart-btn" onClick={() => addProductToCart(product?._id)}>
											<FaShoppingCart /> Add to Cart
										</a>
									) : (
										<a
											className="btn btn-danger px-4 py-2 text-white"
											onClick={() =>
												toast.error('This product is already sold out!')
											}
										>
											Sold out
										</a>
									)}

									{!product?.isSurprise && (
										<a onClick={() => addProductToWishlist(product?._id)}>
											<button className="btn btn-danger px-4 py-2 mx-4">
												<FaHeart />
											</button>
										</a>
									)}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};
