import { useEffect, useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../features/orders/ordersSlice';
import { formatDate } from '../../../utils/format';
import './AdminOrder.css';

export const AdminOrder = () => {
	const [ status, setStatus ] = useState('');
	const { orders, isLoading } = useSelector((state) => state.orders);
	const dispatch = useDispatch();

	const handleUpdateStatus = () => {
		
	}

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);
	
	return (
		<div className="d-flex" id="wrapper">
			<AdminSidebar />

			<div id="page-content-wrapper">
				<nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
					<div className="d-flex align-items-center">
						<i
							className="fas fa-align-left primary-text fs-4 me-3"
							id="menu-toggle"
						></i>
						<h2 className="fs-2 m-0">Order Management</h2>
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
						<div className="row mb-3" style={{margin:"auto"}}>
							<h3 className="fs-4 mb-3 d-inline col-sm-3">List of orders </h3>
							<div className="col-sm-7">
								<form action="search-by-time">
									<div className='style-search'>
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
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => {
										return (
											<tr>
												<td>{formatDate(order.date)}</td>
												<td>{order.totalPrice}</td>
												<td>{order.note}</td>
												<td>
													<input type="radio" value="pending" name='status' onClick={(e) => setStatus(e.target.value)}/>
													Pending
													<input type="radio" value="fulfilled" name='status' onClick={(e) => setStatus(e.target.value)} />
													Success
													<input type="radio" value="rejected" name='status' onClick={(e) => setStatus(e.target.value)} />
													Fail
												</td>
												<td>
													<a href="#">
														<button className="btn btn-success px-4 py-1">
															View Details
														</button>
													</a>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<button
								style={{ float: 'right' }}
								className="btn btn-success px-3 col-sm-2"
								onClick={handleUpdateStatus}
							>
								<a className="view-modal text-decoration-none text-white">
									&nbsp; Update status
								</a>
							</button>
						</div>
					</form>
					{/* <c:if test="${sort != null && search == null}">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="pagination-wrap text-center">
                                    <ul className="d-flex text-center justify-content-center" style="margin-top: -30px">
                                        <c:forEach begin="1" end="${numberPage}" var="i">
                                            <li style="list-style: none"><a style="border: 1px solid black; border-radius: 50%" className="m-3 text-dark text-decoration-none px-2 py-1" href="sort-orders-admin?index=${i}&ok=${ok}">${i}</a></li>
                                            </c:forEach>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </c:if> */}
				</div>
			</div>
		</div>
	);
};
