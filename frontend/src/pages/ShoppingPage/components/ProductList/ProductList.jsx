import React, { useEffect } from 'react';
import { getAllProducts } from '../../../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from './../../../../components';
import { toast } from 'react-toastify';

export const ProductList = () => {
	const dispatch = useDispatch();
	const { products, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(getAllProducts());
	}, [isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
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
								<a href="single-product?id=${c.productID}">
									<img
										src={product.image}
										style={{ width: '100%', height: '250px' }}
									/>
								</a>
							</div>
							<h3 style={{ color: product.isSurprise && 'grey' }}>
								{product.name}
							</h3>
							{/* <p style="${c.isSurprise ? "color: grey" : ''}" className="product-price"></p> */}
							<p
								className={product.isSurprise ? 'text-white' : 'text-secondary'}
							>
								{product.calories} Calories
							</p>

							{/* // <c:if test="${c.status == false}">
    //     <a href="sorry.jsp" className="btn btn-danger px-5 py-3">Sold out</a>
    // </c:if>
    // <c:if test="${c.status == true}">
    //     <a href="add-to-cart?productID=${c.productID}" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
    // </c:if>

    // <c:if test="${sessionScope.acc.role != null}">
    //     <c:if test="${c.isSurprise == false}">
    //         <a href="add-to-wishlist?productID=${c.productID}"><button className="btn btn-danger px-5 py-3"><i className="fas fa-heart" onclick="changeColor(this)"></i></button></a>
    //             </c:if>
    //         </c:if> */}
						</div>
					</div>
				);
			})}
		</>
	);
};
