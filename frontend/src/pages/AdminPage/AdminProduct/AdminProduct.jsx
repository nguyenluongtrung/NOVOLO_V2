import { useEffect, useState } from 'react';
import './AdminProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	getAllProducts,
	deleteProduct,
} from './../../../features/products/productsSlice';
import { Spinner } from '../../../components';
import { FaTrash, FaPenSquare } from 'react-icons/fa';
import { getAllCategories } from '../../../features/categories/categoriesSlice';
import { AddProduct } from './components/AddProduct/AddProduct';
import { UpdateProduct } from './components/UpdateProduct/UpdateProduct';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import { getAllNewestPrices } from '../../../features/prices/pricesSlice';

export const AdminProduct = () => {
	const dispatch = useDispatch();
	const [isOpenAddForm, setIsOpenAddForm] = useState(false);
	const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
	const [chosenProductId, setChosenProductId] = useState('');
	const {
		products,
		productSize,
		isError: productError,
		isSuccess: productSuccess,
		isLoading: productLoading,
		message: productMessage,
	} = useSelector((state) => state.products);
	const {
		categories,
		isError: categoryError,
		isLoading: categoryLoading,
		message: categoryMessage,
	} = useSelector((state) => state.categories);

	const {
		prices,
		isError: priceError,
		isLoading: priceLoading,
		message: priceMessage,
	} = useSelector((state) => state.prices);

	const navigateToAnotherPage = (page) => {
		dispatch(getAllProducts('page='+page));
	}

	const handleDeleteProduct = async (productId) => {
		try {
			await dispatch(deleteProduct(productId));
			if (productSuccess) {
				dispatch(getAllProducts(''));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditProduct = (productId) => {
		setIsOpenUpdateForm(true);
		setChosenProductId(productId);
	};

	const handleGetAllProducts = () => {
		Promise.all([
			dispatch(getAllProducts('')),
			dispatch(getAllNewestPrices()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	};

	useEffect(() => {
		if (productError) {
			toast.error(productMessage);
		}
		if (categoryError) {
			toast.error(categoryMessage);
		}
		if (priceError) {
			toast.error(priceMessage);
		}
		Promise.all([
			dispatch(getAllProducts('')),
			dispatch(getAllCategories()),
			dispatch(getAllNewestPrices()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch, productError, productMessage]);

	if (
		productLoading ||
		categoryLoading ||
		priceLoading ||
		!Array.isArray(products) ||
		!Array.isArray(categories) ||
		!Array.isArray(prices)
	) {
		return <Spinner />;
	}

	return (
		<div className="d-flex" id="wrapper">
			{isOpenAddForm && (
				<AddProduct
					setIsOpenAddForm={setIsOpenAddForm}
					handleGetAllProducts={handleGetAllProducts}
				/>
			)}
			{isOpenUpdateForm && (
				<UpdateProduct
					setIsOpenUpdateForm={setIsOpenUpdateForm}
					chosenProductId={chosenProductId}
					handleGetAllProducts={handleGetAllProducts}
				/>
			)}

			<AdminSidebar />

			<div id="page-content-wrapper">
				<nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
					<div className="d-flex align-items-center">
						<i
							className="fas fa-align-left primary-text fs-4 me-3"
							id="menu-toggle"
						></i>
						<h2 className="fs-2 m-0">Product Management</h2>
					</div>
				</nav>

				<div className="container-fluid px-4">
					<div className="row">
						<h3 className="fs-4 mb-2 col-sm-8">List of products </h3>
						<button
							className="view-modal text-decoration-none text-white btn btn-success px-3 py-1 col-sm-2 mb-4"
							onClick={() => setIsOpenAddForm(true)}
						>
							<span>
								<i className="fa-sharp fa-solid fa-plus"></i>
							</span>
							&nbsp; Add new product
						</button>

						<div className="row">
							<div className="col">
								<table className="table bg-white rounded shadow-sm  table-hover">
									<thead>
										<tr>
											<th scope="col" style={{ fontSize: '90%' }}>
												Name
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Image
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Category Name
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Calories
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Is Surprise
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Rating
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Accumulated Point
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Exchanged Point
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Price
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Status
											</th>
											<th scope="col" style={{ fontSize: '90%' }}>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product) => {
											return (
												<tr>
													<td>{product?.name}</td>
													<td>
														<img
															src={product?.image}
															style={{ width: '40px', height: '40px' }}
														/>
													</td>
													<td>
														{
															categories[
																categories.findIndex(
																	(category) =>
																		category._id === product.categoryID
																)
															]?.name
														}
													</td>
													<td>{product?.calories}</td>
													<td>{product?.isSurprise ? 'true' : 'false'}</td>
													<td>{product?.rating}</td>
													<td>{product?.accumulatedPoint}</td>
													<td>{product?.exchangedPoint}</td>
													<td>
														{
															prices[
																prices.findIndex((price) => {
																	return (
																		price.productId === product._id &&
																		price.endDate === null
																	);
																})
															]?.price
														}{' '}
														$
													</td>
													<td>{product?.productStatus ? 'true' : 'false'}</td>
													<td>
														<a
															className="edit"
															onClick={() => handleEditProduct(product._id)}
														>
															<FaPenSquare />
														</a>{' '}
														&nbsp;&nbsp;&nbsp;
														<button
															onClick={() => handleDeleteProduct(product._id)}
															className="delete"
														>
															<FaTrash />
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
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
											<a onClick={() => navigateToAnotherPage(page)}>{page}</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
