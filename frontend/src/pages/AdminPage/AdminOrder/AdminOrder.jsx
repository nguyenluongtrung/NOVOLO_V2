import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';

export const AdminOrder = () => {
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
						<div className="row mb-3">
							<h3 className="fs-4 mb-3 d-inline col-sm-3">List of orders </h3>
							<div className="col-sm-7">
								<form action="search-by-time">
									<input
										className="py-1 w-25"
										type="number"
										min="2000"
										step="1"
										name="year"
										placeholder="Enter year..."
									/>
									<input
										className="py-1 w-25"
										type="number"
										min="1"
										max="12"
										step="1"
										name="month"
										placeholder="Enter month..."
									/>
									<input
										className="py-1 w-25"
										type="number"
										min="1"
										max="31"
										step="1"
										name="date"
										placeholder="Enter date..."
									/>
									<button type="submit" className="btn btn-success">
										Search
									</button>
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
					<form action="statusproduct" method="POST">
						<div className="col">
							<table className="table bg-white rounded shadow-sm  table-hover">
								<thead>
									<tr>
										<th scope="col" style={{ fontSize: '90%' }}>
											Order ID
										</th>
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
									{/* <c:if test="${listSize != 0}">
                                            <c:forEach items="${list}" var="c" varStatus="status">
                                                <tr>
                                                    <td>${c.orderID}</td>
                                                    <td>${c.date}</td>
                                                    <td>${c.totalPrice}</td>
                                                    <td>${c.note}</td>
                                                    <td>
                                                        <input type="radio" name="status_${c.orderID}" value="PEND" ${c.status == 'PEND' ? 'checked' : ''}>Pending
                                                        <input type="radio" name="status_${c.orderID}" value="SUCC" ${c.status == 'SUCC' ? 'checked' : ''}>Success
                                                        <input type="radio" name="status_${c.orderID}" value="FAIL" ${c.status == 'FAIL' ? 'checked' : ''}>Fail
                                                    </td>
                                                    <td><a href="#"><button className="btn btn-success px-4 py-1">View Details</button></a></td>
                                                </tr>
                                            </c:forEach>
                                        </c:if>
                                        <c:if test="${listSize == 0}">
                                            <tr><p className="text-center text-danger">The list is empty!</p></tr>

                                    </c:if> */}
								</tbody>
							</table>
							<button
								style={{ float: 'right' }}
								className="btn btn-success px-3 col-sm-2"
								type="submit"
							>
								<a className="view-modal text-decoration-none text-white">
									&nbsp; Submit
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
