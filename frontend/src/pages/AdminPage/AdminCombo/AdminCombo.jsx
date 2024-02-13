import { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';
import './AdminCombo.css';
import { AddCombo } from './components/AddCombo/AddCombo';

export const AdminCombo = () => {
	const [isOpenAddForm, setIsOpenAddForm] = useState(false);

	return (
		<div className="d-flex" id="wrapper">
			{isOpenAddForm && (
				<AddCombo
					setIsOpenAddForm={setIsOpenAddForm}
					// handleGetAllProducts={handleGetAllProducts}
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
										<th scope="col">Combo ID</th>
										<th scope="col">Combo Name</th>
										<th scope="col">Total Price</th>
										<th scope="col">Total Calories</th>
										<th scope="col">Rating</th>
										<th scope="col">Accumulated Point</th>
										<th scope="col">Exchanged Point</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									{/* <c:forEach items="${combos}" var="c">
										<tr>
											<td>${c.comboID}</td>
											<td>${c.comboName}</td>
											<td>${c.totalPrice}</td>
											<td>${c.totalCalories}</td>
											<td>${c.rating}</td>
											<td>${c.accumulatedPoint}</td>
											<td>${c.exchangedPoint}</td>
											<td>
												<a href="update-combo?id=${c.comboID}" className="edit">
													<i className="view-modal fa-sharp fa-regular fa-pen-to-square  text-dark"></i>
												</a>{' '}
												&nbsp;&nbsp;&nbsp;
												<a
													href="delete-combo?id=${c.comboID}"
													className="delete"
												>
													<i className="fa-sharp fa-solid fa-trash  text-dark"></i>
												</a>
											</td>
										</tr>
									</c:forEach> */}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
