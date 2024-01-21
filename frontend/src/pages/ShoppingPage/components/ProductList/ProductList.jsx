import React, { useEffect } from 'react';
import { getAllProducts } from '../../../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from './../../../../components';
import { toast } from 'react-toastify';
import './ProductList.css'
import { Link } from 'react-router-dom';

export const ProductList = () => {
	const dispatch = useDispatch();
	const { products, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.products
	);

    // const { user } = useSelector((state) => state.auth)

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(getAllProducts());
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="container">
			<div className="row">
				{products.map((product) => {
					return (
						<div className="col-lg-4 col-md-6 text-center strawberry">
							<div
								className={
									product.isSurprise
										? 'single-product-item bg-yellow'
										: 'single-product-item'
								}
							>
								<div className="product-image">
									<Link to={`/single-product/${product._id}`}>
										<img
											src={product.image}
											style={{ width: '100%', height: '250px' }}
										/>
									</Link>
								</div>
								<h3 style={{ color: product.isSurprise && 'grey' }}>
									{product.name}
								</h3>
								<p
									style={{ color: product.isSurprise ? 'grey' : '' }}
									className="product-price"
								></p>
								<p
									className={
										product.isSurprise ? 'text-white' : 'text-secondary'
									}
								>
									{product.calories} Calories
								</p>

								{product.productStatus ? (
									<a className="cart-btn">
										<i className="fas fa-shopping-cart"></i> Add to Cart
									</a>
								) : (
									<a href="sorry.jsp" className="btn btn-danger px-5 py-3">
										Sold out
									</a>
								)}

								{/* {(!product.isSurprise  )&& (
									<a href="add-to-wishlist?productID=${c.productID}">
										<button className="btn btn-danger px-5 py-3">
											<i
												className="fas fa-heart"
											></i>
										</button>
									</a>
								)} */}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
