import { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../features/orders/ordersSlice';
import { formatDate } from '../../../utils/format';
import './AdminOrder.css';
import { FaPenSquare } from 'react-icons/fa';

export const AdminOrder = () => {
	const [ status, setStatus ] = useState('');
	const [ orders, setOrders ] = useState([]);
	const dispatch = useDispatch();

	const handleUpdateStatus = async () => {
		const output = await dispatch(getOrders());
		setOrders(output.payload);
	}

	useEffect(() => {
		handleUpdateStatus();
	}, []);
	
	return (
		<div className="d-flex" id="wrapper">
			<AdminSidebar />

			<div id="page-content-wrapper" style={{ paddingTop: '80px' }}>
				<div className="container-fluid px-4">
					<div className="row my-5">
						<div className="row mb-3 blockitem">
							<h3 className="fs-4 mb-3 d-inline col-sm-3 ListOrder">
								List of orders{' '}
							</h3>
							<div className="col-sm-7">
								<form action="search-by-time">
									<div className="style-search">
										<input
											className="py-1 w-25 style-input"
											type="number"
											min="2000"
											step="1"
											name="year"
											placeholder="Enter year..."
										/>
										<input
											className="py-1 w-25 ml-2 style-input"
											type="number"
											min="1"
											max="12"
											step="1"
											name="month"
											placeholder="Enter month..."
										/>
										<input
											className="py-1 w-25 ml-2 style-input"
											type="number"
											min="1"
											max="31"
											step="1"
											name="date"
											placeholder="Enter date..."
										/>

										<button type="submit" className="btn btn-success ml-2">
											Search
										</button>
									</div>
								</form>
							</div>
							<div className="dropdown col-sm-2">
								<button
									type="button"
									className="btn btn-success dropdown-toggle"
									data-toggle="dropdown"
								>
									Sort order by price
								</button>
								<div className="dropdown-menu">
									<a className="dropdown-item" href="sort-orders-admin?ok=1">
										INCREASINGLY
									</a>
									<a className="dropdown-item" href="sort-orders-admin?ok=0">
										DECREASINGLY
									</a>
								</div>
							</div>
						</div>
					</div>
					{/* <button
						style={{ float: 'right', marginTop: '-50px' }}
						className="btn btn-success mb-3 col-sm-2"
						onClick={handleUpdateStatus}
					>
						<a className="view-modal text-decoration-none text-white">
							&nbsp; Update status
						</a>
					</button> */}
					<form>
						<div className="col">
							<table className="table bg-white rounded shadow-sm  table-hover styled-table">
								<thead>
									<tr>
										<th scope="col" style={{ fontSize: '90%' }}>
											Date
										</th>
										<th scope="col" style={{ fontSize: '90%' }}>
											Total Price
										</th>
										<th scope="col" style={{ fontSize: '90%' }}>
											Note
										</th>
										<th scope="col" style={{ fontSize: '90%' }}>
											Status
										</th>
										<th scope="col" style={{ fontSize: '90%' }}>
											View Detail
										</th>
										<th scope="col" style={{ fontSize: '90%' }}>
											Update
										</th>
									</tr>
								</thead>
								<tbody>
									{orders?.map((order) => {
										return (
											<tr>
												<td>{formatDate(order.date)}</td>
												<td>{order.totalPrice}</td>
												<td>{order.note}</td>
												<td>
													{order.statusHistory[order.statusHistory.length - 1].status == 'fulfilled' && <button className='button-special-success'>fulfilled</button> } 
													{order.statusHistory[order.statusHistory.length - 1].status == 'pending' && <button className='button-special-warning'>pending</button> } 
													{order.statusHistory[order.statusHistory.length - 1].status == 'rejected' && <button className='button-special-error'>rejected</button> } 
												</td>
												<td>
													<a href="#">
														<button className="btn btn-success px-4 py-1">
															View Details
														</button>
													</a>
												</td>
												<td>
														<a
															className="edit"
														>
															<FaPenSquare />
														</a>{' '}
													</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
