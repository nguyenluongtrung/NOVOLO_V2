import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar/AdminSidebar';

export const AdminSale = () => {
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
							<h2 className="fs-2 m-0">Sale Management</h2>
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
							<h3 className="fs-4 mb-3 d-inline col-sm-10">Sale events </h3>
							<button className="btn btn-success px-3 py-1 col-sm-2">
								<a
									className="view-modal text-decoration-none text-white"
									href="add-sale"
								>
									<span>
										<i className="fa-sharp fa-solid fa-plus"></i>
									</span>
									&nbsp; Add a sale event
								</a>
							</button>

							<div className="col">
								<table className="table bg-white rounded shadow-sm  table-hover">
									<thead>
										<tr>
											<th scope="col">Sale ID</th>
											<th scope="col">Sale Name</th>
											<th scope="col">Sale Value</th>
											<th scope="col">Start Date</th>
											<th scope="col">End Date</th>
											<th scope="col">Sale Code</th>
											<th scope="col">See Details</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{/* <c:forEach items="${sList}" var="c">
                                        <tr>
                                            <td>${c.saleID}</td>
                                            <td>${c.saleName}</td>
                                            <td>${c.saleValue}</td>
                                            <td>${c.startDate}</td>
                                            <td>${c.endDate}</td>
                                            <td>${c.saleCode}</td>
                                            <td><a href="view-sale-products?id=${c.saleID}"><i className="view-modal fa-solid fa-eye text-dark text-center"></i></a></td>
                                            <td>
                                                <a href="update-sale?id=${c.saleID}" className="edit"><i className="view-modal fa-sharp fa-regular fa-pen-to-square  text-dark"></i></a> &nbsp;&nbsp;&nbsp;
                                                <a href="delete-sale?id=${c.saleID}" className="delete"><i className="fa-sharp fa-solid fa-trash  text-dark"></i></a>
                                            </td>
                                        </tr>
                                    </c:forEach> */}
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

		// <c:if test="${ok != null}">
		//     <div className="popup active" id="popup-2">
		//         <div className="overlay"></div>
		//         <div className="content2">
		//             <div className="close-btn" onclick="togglePopup2()">&times;</div>
		//             <p style="font-weight: bold; text-align: center">ADD NEW SALE</p><br>
		//             <div>
		//                 <form className="form" action="add-sale" method="post" onsubmit="return validateAddForm()">

		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Sale Name</label>
		//                             <input type="text" name="s-name" placeholder="Enter sale name" required />
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Sale Quantity / 1 Product</label>
		//                             <input type="number" name="s-quantity" placeholder="Enter sale quantity" required min="1" />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Sale Value</label>
		//                             <input type="number" name="s-value" placeholder="Enter sale value" required min="0" max="1" step="0.01"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Sale Code</label>
		//                             <input type="text" name="s-code" placeholder="Enter sale code" required />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Start Date</label>
		//                             <input type="date" name="s-start" placeholder="Enter start date"  min="<%= LocalDate.now() %>" required id="s_start"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>End Date &nbsp; <span className="text-danger" id="error-end"></span></label>
		//                             <input type="date" name="s-end" placeholder="Enter end date"  min="<%= LocalDate.now() %>" required id="s_end" />
		//                         </div>
		//                     </div>
		//                     <div className="column mt-3">
		//                         <p className="text-secondary" style="font-size: 80%; font-style: italic">(*) This sale is only applied for the 5 worst products including: ${wItems}
		//                     </div>
		//                     <button>Submit</button>
		//                 </form>
		//             </div>
		//         </div>
		//     </div>
		// </c:if>

		// <c:if test="${okela != null}">
		//     <div className="popup active" id="popup-2">
		//         <div className="overlay"></div>
		//         <div className="content2">
		//             <div className="close-btn" onclick="togglePopup2()">&times;</div>
		//             <p style="font-weight: bold; text-align: center">UPDATE SALE</p><br>
		//             <div>
		//                 <form className="form" action="update-sale" method="post" onsubmit="return validateUpdateForm()">
		//                     <input type="hidden" name="id" value="${id}">
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Sale Name</label>
		//                             <input type="text" name="s-name" placeholder="Enter sale name" required value="${sale.saleName}"/>
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Sale Value</label>
		//                             <input type="number" name="s-value" placeholder="Enter sale value" required value="${sale.saleValue}" min="0" max="1" step="0.01" />
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Sale Code</label>
		//                             <input type="text" name="s-code" placeholder="Enter sale code" required value="${sale.saleCode}" />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Start Date</label>
		//                             <input type="date" name="s-start" placeholder="Enter start date" required value="${sale.startDate}" id="s_start2"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>End Date &nbsp; <span className="text-danger" id="error-end2" ></span></label>
		//                             <input type="date" name="s-end" placeholder="Enter end date" required value="${sale.endDate}" id="s_end2"/>
		//                         </div>
		//                     </div>
		//                     <button>Submit</button>
		//                 </form>
		//             </div>
		//         </div>
		//     </div>
		// </c:if>

		// <c:if test="${oki != null}">
		//     <div className="popup active" id="popup-2" >
		//         <div className="overlay"></div>
		//         <div className="content2" style='height: 400px;'>
		//             <div className="close-btn" onclick="togglePopup2()">&times;</div>
		//             <p style="font-weight: bold; text-align: center">SALE PRODUCTS' DETAILS</p><br>
		//             <div>
		//                 <table className="table bg-white rounded shadow-sm  table-hover">
		//                     <thead>
		//                         <tr>
		//                             <th scope="col">Sale ID</th>
		//                             <th scope="col">Product Name</th>
		//                             <th scope="col">Product ID</th>
		//                             <th scope="col">Sale Quantity</th>
		//                         </tr>
		//                     </thead>
		//                     <tbody>
		//                         <c:forEach items="${saleProducts}" var="c">
		//                             <tr>
		//                                 <td>${c.saleID}</td>
		//                                 <td>${c.productName}</td>
		//                                 <td>${c.productID}</td>
		//                                 <td>${c.saleQuantity}</td>
		//                             </tr>
		//                         </c:forEach>
		//                     </tbody>
		//                 </table>
		//             </div>
		//         </div>
		//     </div>
		// </c:if>
	);
};
