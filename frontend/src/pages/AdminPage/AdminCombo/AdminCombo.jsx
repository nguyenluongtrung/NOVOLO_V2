import { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import './AdminCombo.css';
import { AddCombo } from './components/AddCombo/AddCombo';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteProduct,
	getAllProducts,
} from '../../../features/products/productsSlice';
import { FaTrash, FaPenSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllNewestPrices } from '../../../features/prices/pricesSlice';
import { UpdateCombo } from './components/UpdateCombo/UpdateCombo';
import {
	ref,
	getDownloadURL,
	listAll,
} from 'firebase/storage';
import { storage } from './../../../config/firebase';

export const AdminCombo = () => {
	const [imageUrls, setImageUrls] = useState([]);
	const [isOpenAddForm, setIsOpenAddForm] = useState(false);
	const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
	const [chosenComboId, setChosenComboId] = useState('');
	const {
		products,
		isLoading: productLoading,
		isSuccess: productSuccess,
		isError: productError,
		message: productMessage,
	} = useSelector((state) => state.products);
	const {
		prices,
		isError: priceError,
		isLoading: priceLoading,
		message: priceMessage,
	} = useSelector((state) => state.prices);
	const imagesListRef = ref(storage, 'combos/');

	const dispatch = useDispatch();

	const handleDeleteProduct = async (productId) => {
		try {
			await dispatch(deleteProduct(productId));
			if (productSuccess) {
				dispatch(getAllProducts('categoryID=65bf55ce65e2e3ced184149a'));
				toast.success('Delete combo successfully!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleGetAllCombos = () => {
		Promise.all([
			dispatch(getAllProducts('categoryID=65bf55ce65e2e3ced184149a')),
			dispatch(getAllNewestPrices()),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	};

	useEffect(() => {
		listAll(imagesListRef).then((response) => {
			response.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setImageUrls((prev) => [...prev, url]);
				});
			});
		});
	}, []);

	useEffect(() => {
		Promise.all([
			dispatch(getAllNewestPrices()),
			dispatch(getAllProducts('categoryID=65bf55ce65e2e3ced184149a')),
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch]);

	return (
		<div className="d-flex" id="wrapper">
			{isOpenAddForm && (
				<AddCombo
					setIsOpenAddForm={setIsOpenAddForm}
					handleGetAllCombos={handleGetAllCombos}
				/>
			)}

			{isOpenUpdateForm && (
				<UpdateCombo
					setIsOpenUpdateForm={setIsOpenUpdateForm}
					handleGetAllCombos={handleGetAllCombos}
					chosenComboId={chosenComboId}
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
						<h2 className="fs-2 m-0">Combo Management</h2>
					</div>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
				</nav>

				<div className="container-fluid px-4">
					<div className="row my-5">
						<h3 className="fs-4 mb-3 d-inline col-sm-10">List of combos</h3>
						<button
							className="view-modal text-decoration-none text-white btn btn-success px-2 py-1 col-sm-2 mb-4"
							onClick={() => setIsOpenAddForm(true)}
						>
							<span>
								<i className="fa-sharp fa-solid fa-plus"></i>
							</span>
							&nbsp; Add new combo
						</button>

						<div className="col">
							<table className="table bg-white rounded shadow-sm  table-hover">
								<thead>
									<tr>
										<th scope="col">Combo Name</th>
										<th scope="col">Combo Image</th>
										<th scope="col">Total Calories</th>
										<th scope="col">Is Surprise</th>
										<th scope="col">Rating</th>
										<th scope="col">Accumulated Point</th>
										<th scope="col">Exchanged Point</th>
										<th scope="col">Price</th>
										<th scope="col">Status</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{products &&
										products.map((product) => {
											return (
												<tr>
													<td>{product?.name}</td>
													<td>
														<img
															src={imageUrls[imageUrls.findIndex((url) => url.includes(product?.image) == true)]}
															style={{ width: '40px', height: '40px' }}
														/>
													</td>
													<td>{product?.calories}</td>
													<td>{product?.isSurprise ? 'true' : 'false'}</td>
													<td>{product?.rating}</td>
													<td>{product?.accumulatedPoint}</td>
													<td>{product?.exchangedPoint}</td>
													<td>
														{
															prices[
																prices?.findIndex((price) => {
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
															onClick={() => {
																setIsOpenUpdateForm(true);
																setChosenComboId(product?._id);
															}}
														>
															<FaPenSquare />
														</a>{' '}
														&nbsp;&nbsp;&nbsp;
														<button
															className="delete"
															onClick={() => handleDeleteProduct(product._id)}
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
			</div>
		</div>
	);
};
