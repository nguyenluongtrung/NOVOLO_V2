import { useEffect, useState } from 'react';
import './AdminSale.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
	getAllPromotions,
	deletePromotion,
} from './../../../features/promotions/promotionsSlice';
import { Spinner } from '../../../components'; 
import { FaTrash, FaPenSquare } from 'react-icons/fa';  
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import moment from 'moment'; 
export const AdminPromotion = () => {
	const dispatch = useDispatch();
	const {
		promotions,
		isError: promotionError,
		isSuccess: promotionSuccess,
		isLoading: promotionLoading,
		message: promotionMessage,
	} = useSelector((state) => state.promotions);
 
	const handleDeletePromotion = async (promotionId) => {
		try {
			await dispatch(deletePromotion(promotionId));
			if (promotionSuccess) {
				dispatch(getAllPromotions(''));
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (promotionError) {
			toast.error(promotionMessage);
		}
		 
		Promise.all([
			dispatch(getAllPromotions())
		]).catch((error) => {
			console.error('Error during dispatch:', error);
		});
	}, [dispatch, promotionError, promotionMessage]);

	if (
		promotionLoading 
	) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="d-flex" id="wrapper">
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
							<h3 className="fs-4 mb-3 d-inline col-sm-10">Promotion events </h3>
							<button className="btn btn-success px-3 py-1 col-sm-2">
								<a
									className="view-modal text-decoration-none text-white"
									href="add-promotion"
								>
									<span>
										<i className="fa-sharp fa-solid fa-plus"></i>
									</span>
									&nbsp; Add a promotion event
								</a>
							</button>

							<div className="col">
								<table className="table bg-white rounded shadow-sm  table-hover">
									<thead>
									<tr>
											<th scope="col">Sale Name</th>
											<th scope="col">Sale Value</th>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Sale Code</th>
											<th scope ="col">Quantity</th>
										</tr>
									</thead>
									<tbody>
										
										{promotions.map((promotion) => {
											return (
												<tr>
													<td>{promotion?.promotionName}</td>
													<td>{promotion?.promotionValue}</td>
													<td>{promotion?.startDate ? moment(promotion.startDate).format('YYYY-MM-DD') : ''}</td>
													<td>{promotion?.endDate ? moment(promotion.endDate).format('YYYY-MM-DD') : ''}</td>
													<td>{promotion?.promotionCode}</td>
													<td>{promotion?.promotionQuantity}</td>
													<td>
														<a
															className="edit"
															 
														>
															<FaPenSquare />
														</a>{' '}
														&nbsp;&nbsp;&nbsp;
														<button
															onClick={() => handleDeletePromotion(promotion._id)}
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

						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="pagination-wrap text-center">
									<ul
										className="d-flex text-center justify-content-center"
										style={{ marginTop: '10px' }}
									>
										 
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