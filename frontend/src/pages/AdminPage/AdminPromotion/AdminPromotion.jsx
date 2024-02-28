import { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
	deletePromotion,
	getAllPromotions,
} from '../../../features/promotion/promotionsSlice';
import { FaEye, FaTrash, FaPenSquare } from 'react-icons/fa';
import { formatDate } from '../../../utils/format';
import { toast } from 'react-toastify';
import { Spinner } from '../../../components';
import './AdminPromotion.css';
import { AddPromotion } from './components/AddPromotion/AddPromotion';
import { UpdatePromotion } from './components/UpdatePromotion/UpdatePromotion';
import { PromotionDetails } from './components/PromotionDetails/PromotionDetails';

export const AdminPromotion = () => {
	const dispatch = useDispatch();
	const [isOpenAddForm, setIsOpenAddForm] = useState(false);
	const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
	const [isOpenPromotionDetails, setIsOpenPromotionDetails] = useState(false);
	const [chosenPromotionId, setChosenPromotionId] = useState('');

	const { promotions, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.promotions
	);

	const handleDeletePromotion = async (promotionId) => {
		await dispatch(deletePromotion(promotionId));
		if (isSuccess) {
			toast.success('Delete promotion successfully!');
		}
	};

	const handleUpdatePromotion = (promotionId) => {
		setIsOpenUpdateForm(true);
		setChosenPromotionId(promotionId);
	};

	const handlePromotionDetails = (promotionId) => {
		setIsOpenPromotionDetails(true);
		setChosenPromotionId(promotionId);
	};

	useEffect(() => {
		dispatch(getAllPromotions());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="d-flex" id="wrapper">
				{isOpenAddForm && <AddPromotion setIsOpenAddForm={setIsOpenAddForm} />}
				{isOpenUpdateForm && (
					<UpdatePromotion
						setIsOpenUpdateForm={setIsOpenUpdateForm}
						chosenPromotionId={chosenPromotionId}
					/>
				)}
				{isOpenPromotionDetails && (
					<PromotionDetails
						setIsOpenPromotionDetails={setIsOpenPromotionDetails}
						chosenPromotionId={chosenPromotionId}
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
							<h2 className="fs-2 m-0">Promotion Management</h2>
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
							<h3 className="fs-4 mb-3 d-inline col-sm-10">Promotion list</h3>
							<button
								className="btn btn-success px-3 py-1 my-3 col-sm-2"
								onClick={() => setIsOpenAddForm(true)}
							>
								<a className="view-modal text-decoration-none text-white">
									<span>
										<i className="fa-sharp fa-solid fa-plus"></i>
									</span>
									&nbsp; Add a promotion
								</a>
							</button>

							<div className="col">
								<table className="table bg-white rounded shadow-sm  table-hover">
									<thead>
										<tr>
											<th scope="col">Promotion Name</th>
											<th scope="col">Promotion Value</th>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Promotion Code</th>
											<th scope="col">See Details</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{Array.isArray(promotions) && promotions.map((promotion) => {
											return (
												<tr>
													<td>{promotion.promotionName}</td>
													<td>{promotion.promotionValue * 100}%</td>
													<td>{formatDate(promotion.startDate)}</td>
													<td>{formatDate(promotion.endDate)}</td>
													<td>{promotion.promotionCode}</td>
													<td>
														<FaEye
															className="eye-icon"
															onClick={() =>
																handlePromotionDetails(promotion._id)
															}
														/>
													</td>
													<td>
														<FaPenSquare
															className="update-icon"
															onClick={() =>
																handleUpdatePromotion(promotion._id)
															}
														/>
														&nbsp;&nbsp;&nbsp;
														<FaTrash
															className="delete-icon"
															onClick={() =>
																handleDeletePromotion(promotion._id)
															}
														/>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="pagination-wrap text-center">
									<ul
										className="d-flex text-center justify-content-center"
										style={{ marginTop: '10px' }}
									>
										{/* <c:forEach begin="1" end="${numberPage}" var="i">
                                            <li style="list-style: none"><a style="border: 1px solid black; border-radius: 50%" className="m-3 text-dark text-decoration-none px-2 py-1" href="sale-admin?index=${i}">${i}</a></li>
                                            </c:forEach> */}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
