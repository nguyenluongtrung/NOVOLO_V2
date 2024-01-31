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
		try{
			await dispatch(deleteProductFromWishList(productId))
			dispatch(getProductsFromWishList());
		} catch (error){
			console.log('Error deleting product: ', error)
		}
    }

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
								<p>Fresh and Organic</p>
								<h1>Wish List</h1>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cart-section mt-150 mb-150">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="cart-table-wrap">
								<table className="cart-table">
									<thead className="cart-table-head">
										<tr className="table-head-row">
											<th className="product-image">Product Image</th>
											<th className="product-name">Name</th>
											<th className="product-price">Price</th>
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
														<td className="product-price">0$</td>
														<td className="product-detail">
															<Link to={`/single-product/${product._id}`}>See Detail</Link>
														</td>
														<td className="product-delete">
															<button onClick={() => handleDeleteProductFromWishlist(product._id)} className="btn btn-danger px-5 py-3">
																<FaTrash />
															</button>
														</td>
													</tr>
												</>
											);
										})}

										{/* <c:forEach items="${combos}" var="c">
                                        <tr className="table-body-row">
                                            <!--<td className="product-remove"><a href="remove-from-cart?id=${c.comboID}"><i className="far fa-window-close"></i></a></td>-->
                                            <td className="product-image"><img src="${c.image}" alt="" style="height: 50px; width: 50px;"></td>
                                            <td className="product-name">${c.comboName}</td>
                                            <td className="product-price">${c.totalPrice}$</td>
                                            <td className="product-detail"><a href="combo-detail?id=${c.comboID}">See Detail</a></td>
                                            <!--<td className="product-delete"><a>Thêm Button Delete</a></td>-->
                                            <td className="product-delete">
                                                <a href="remove-wishlist?comboID=${c.comboID}">
                                                    <button className="btn btn-danger px-5 py-3">
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>
                                    </c:forEach>      */}
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
