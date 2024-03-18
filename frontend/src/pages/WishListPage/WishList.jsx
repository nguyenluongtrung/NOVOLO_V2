import { useEffect } from 'react';
import { Spinner } from '../../components';
import './WishList.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductsFromWishList } from '../../features/products/productsSlice';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { deleteProductFromWishList } from '../../features/auth/authSlice';

export const WishList = () => {
	const dispatch = useDispatch();
	const { products, isError, isLoading, message } = useSelector(
		(state) => state.products
	);

	const handleDeleteProductFromWishlist = async (productId) => {
		try {
			await dispatch(deleteProductFromWishList(productId));
			dispatch(getProductsFromWishList());
		} catch (error) {
			console.log('Error deleting product: ', error);
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(getProductsFromWishList());
	}, [dispatch, isError, message]);

	if (isLoading || !Array.isArray(products)) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="breadcrumb-section breadcrumb-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="breadcrumb-text">
								<h1>Wish List</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="boby-table">
				<div className="cart-section pt-150 pb-150">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="cart-table-wrap">
									<table className="cart-table">
										<thead className="cart-table-head">
											<tr className="table-head-row">
												<th className="product-image">Product Image</th>
												<th className="product-name">Name</th>
												<th className="product-detail">Detail</th>
												<th className="product-delete">Delete</th>
											</tr>
										</thead>
										<tbody>
											{products.map((product) => {
												return (
													<>
														<tr className="table-body-row">
															<td className="product-image">
																<img
																	src={product.image}
																	alt=""
																	style={{ height: '50px', width: '50px' }}
																/>
															</td>
															<td className="product-name">{product.name}</td>
															<td className="product-detail">
																<Link to={`/single-product/${product._id}`}>
																	See Detail
																</Link>
															</td>
															<td className="product-delete">
																<button
																	onClick={() =>
																		handleDeleteProductFromWishlist(product._id)
																	}
																	className="btn btn-danger px-5 py-3"
																>
																	<FaTrash />
																</button>
															</td>
														</tr>
													</>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
