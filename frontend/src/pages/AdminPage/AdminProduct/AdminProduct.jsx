import { useEffect } from 'react';
import './AdminProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllProducts } from './../../../features/products/productsSlice';
import { Spinner } from '../../../components';
import {FaTrash, FaPenSquare} from 'react-icons/fa'

export const AdminProduct = () => {
	const dispatch = useDispatch();
	const { products, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(getAllProducts());
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className="d-flex" id="wrapper">
			<div className="bg-white" id="sidebar-wrapper">
				<div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
					<i className="fas fa-user-secret me-2"></i>MANAGER PAGE
				</div>
				<div className="list-group list-group-flush my-3">
					<a
						href="admin-page"
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-tachometer-alt me-2"></i>Dashboard
					</a>
					<a
						href="product-admin"
						className="list-group-item list-group-item-action bg-transparent second-text active fw-bold"
					>
						<i className="fas fa-tachometer-alt me-2"></i>Products
					</a>
					<a
						href="orders-admin"
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-gift me-2"></i>Orders
					</a>
					<a
						href="feedback-admin"
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-comment-dots me-2"></i>Feedbacks
					</a>
					<a
						href="sale-admin"
						className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
					>
						<i className="fas fa-comment-dots me-2"></i>Sales
					</a>
					<a
						href="home-control"
						className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
					>
						<i className="fas fa-power-off me-2"></i>Home page
					</a>
				</div>
			</div>

			<div id="page-content-wrapper">
				<nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
					<div className="d-flex align-items-center">
						<i
							className="fas fa-align-left primary-text fs-4 me-3"
							id="menu-toggle"
						></i>
						<h2 className="fs-2 m-0">Product Management</h2>
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
							<h3 className="fs-4 mb-3 d-inline col-sm-10">List of products </h3>
							<button className="btn btn-success px-3 py-1 col-sm-2">
								<a
									className="view-modal text-decoration-none text-white"
									href="add-product"
								>
									<span>
										<i className="fa-sharp fa-solid fa-plus"></i>
									</span>
									&nbsp; Add a new product
								</a>
							</button>
						</div>

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
											Category ID
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
												<td>{product.name}</td>
												<td>
													<image
														src={product.image}
														style={{width: '40px', height: '40px'}}
													/>
												</td>
												<td>{product.categoryID}</td>
												<td>{product.calories}</td>
												<td>{product.isSurprise ? 'true' : 'false'}</td>
												<td>{product.rating}</td>
												<td>{product.accumulatedPoint}</td>
												<td>{product.exchangedPoint}</td>
												<td>{product.price}</td>
												<td>{product.productStatus ? 'true' : 'false'}</td>
												<td>
													<a
														href="update-product?id=${c.productID}"
														className="edit"
													>
														{/* <i className="view-modal fa-sharp fa-regular fa-pen-to-square  text-dark"></i> */}
														<FaPenSquare />
													</a>{' '}
													&nbsp;&nbsp;&nbsp;
													<a
														href="delete-product?id=${c.productID}"
														className="delete"
													>
														{/* <i className="fa-sharp fa-solid fa-trash  text-dark"></i> */}
                                                        <FaTrash />
													</a>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>

						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="pagination-wrap text-center">
									<ul
										className="d-flex text-center justify-content-center"
										style={{ marginTop: '10px' }}
									>
										{/* <c:forEach begin="1" end="${pageNumber}" var="i">
                                            <li style="list-style: none"><a style="border: 1px solid black; border-radius: 50%" className="m-3 text-dark text-decoration-none px-2 py-1" href="product-admin?index=${i}">${i}</a></li>
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
		//             <p style="font-weight: bold; text-align: center">ADD NEW PRODUCT</p><br>
		//             <div>
		//                 <form className="form" action="add-product" method="post" onsubmit="return validateForm()">
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Product Name <span className="text-danger">*</span></label>
		//                             <input type="text" name="name" placeholder="Enter product name" required />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Price <span className="text-danger">*</span></label>
		//                             <input type="number" name="price" placeholder="Enter price" required min="0" />
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Image <span className="text-danger">*</span> &nbsp; &nbsp;<span className="text-danger" id="error-image"></span></label>
		//                             <input type="text" name="image" placeholder="Enter image source" required />

		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label className="mb-2">Category <span className="text-danger">*</span></label>
		//                             <select name="categoryID" className="w-100 rounded" style="padding: 13px 13px; border-color: #e7e6e7">
		//                                 <c:forEach items="${cList}" var="c">
		//                                     <option value="${c.categoryID}">${c.categoryName}</option>
		//                                 </c:forEach>
		//                             </select>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Calories <span className="text-danger">*</span></label>
		//                             <input type="number" name="calories" placeholder="Enter calories" required min="0" />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Accumulated Point <span className="text-danger">*</span></label>
		//                             <input type="number" name="accPoint" placeholder="Enter accumulated points" required min="0"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Exchanged Point <span className="text-danger">*</span></label>
		//                             <input type="number" name="exPoint" placeholder="Enter exchanged points" required min="0" />
		//                         </div>
		//                     </div>
		//                     <c:if test="${surpriseProduct != null}">
		//                         <div className="column">
		//                             <div className="input-box">
		//                                 <label>Surprise start day</label>
		//                                 <input type="date" name="p_startDate" min="<%= LocalDate.now()%>"/>
		//                             </div><div className="input-box">
		//                                 <label>Surprise end day</label>
		//                                 <input type="date" name="p_endDate"  min="<%= LocalDate.now()%>"/>
		//                             </div>
		//                         </div>
		//                     </c:if>
		//                     <button type="submit">Submit</button>
		//                 </form>
		//             </div>
		//         </div>
		//     </div>
		// </c:if>

		// <c:if test="${okela != null}">
		//     <div className="popup active" id="popup-2">
		//         <div className="overlay"></div>
		//         <div className="content">
		//             <div className="close-btn" onclick="togglePopup2()">&times;</div>
		//             <p style="font-weight: bold; text-align: center">UPDATE NEW PRODUCT</p><br>
		//             <div>
		//                 <form className="form" action="update-product" method="post" onsubmit="return validateForm2()">
		//                     <input type="hidden" name="original_price" value="${product.price}">
		//                     <input type="hidden" name="s_date" value="${product.startDate}">
		//                     <input type="hidden" name="productID" value="${product.productID}">
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Product Name <span className="text-danger">*</span></label>
		//                             <input type="text" name="name" value="${product.name}" placeholder="Enter product name" required />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Price <span className="text-danger">*</span></label>
		//                             <input type="number" name="price" value="${product.price}" placeholder="Enter price" required min="0"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Image <span className="text-danger">*</span>&nbsp; &nbsp;<span className="text-danger" id="error-imageu1"></span></label>
		//                             <input type="text" value="${product.image}" name="image" placeholder="Enter image source" required id="imageu1"/>
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label className="mb-2">Category <span className="text-danger">*</span></label>
		//                             <select name="categoryID" className="w-100 rounded" style="padding: 13px 13px; border-color: #e7e6e7">
		//                                 <c:forEach items="${cList}" var="c">
		//                                     <option ${c.categoryID == product.categoryID ? "selected" : ""} value="${c.categoryID}">${c.categoryName}</option>
		//                                 </c:forEach>
		//                             </select>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Calories <span className="text-danger">*</span></label>
		//                             <input type="number" name="calories" value="${product.calories}" placeholder="Enter calories" required min="0" />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Accumulated Point <span className="text-danger">*</span></label>
		//                             <input type="number" name="accPoint" value="${product.accumulatedPoint}" placeholder="Enter accumulated points" required min="0" />
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Exchanged Point <span className="text-danger">*</span></label>
		//                             <input type="number" name="exPoint" value="${product.exchangedPoint}" placeholder="Enter exchanged points" required min="0" />
		//                         </div>
		//                     </div>

		//                     <button type="submit">Submit</button>
		//                 </form>
		//             </div>
		//         </div>
		//     </div>
		// </c:if>

		// <c:if test="${okelala != null}">
		//     <div className="popup active" id="popup-2">
		//         <div className="overlay"></div>
		//         <div className="content2">
		//             <div className="close-btn" onclick="togglePopup2()">&times;</div>
		//             <p style="font-weight: bold; text-align: center">UPDATE NEW PRODUCT</p><br>
		//             <div>
		//                 <form className="form" action="update-product" method="post" onsubmit="return validateForm3()">
		//                     <input type="hidden" name="original_price" value="${product.price}">
		//                     <input type="hidden" name="s_date" value="${product.startDate}">
		//                     <input type="hidden" name="productID" value="${product.productID}">
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Product Name <span className="text-danger">*</span></label>
		//                             <input type="text" name="name" value="${product.name}" placeholder="Enter product name" required />
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Price <span className="text-danger">*</span></label>
		//                             <input type="number" name="price" value="${product.price}" placeholder="Enter price" required min="0"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Image <span className="text-danger">*</span>&nbsp; &nbsp;<span className="text-danger" id="error-imageu2"></span></label>
		//                             <input type="text" value="${product.image}" name="image" placeholder="Enter image source" required id="imageu2"/>
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label className="mb-2">Category <span className="text-danger">*</span></label>
		//                             <select name="categoryID" className="w-100 rounded" style="padding: 13px 13px; border-color: #e7e6e7">
		//                                 <c:forEach items="${cList}" var="c">
		//                                     <option ${c.categoryID == product.categoryID ? "selected" : ""} value="${c.categoryID}">${c.categoryName}</option>
		//                                 </c:forEach>
		//                             </select>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Calories <span className="text-danger">*</span></label>
		//                             <input type="number" name="calories" value="${product.calories}" placeholder="Enter calories" required min="0"/>
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Accumulated Point <span className="text-danger">*</span></label>
		//                             <input type="number" name="accPoint" value="${product.accumulatedPoint}" placeholder="Enter accumulated points" required min="0"/>
		//                         </div>
		//                         <div className="input-box">
		//                             <label>Exchanged Point <span className="text-danger">*</span></label>
		//                             <input type="number" name="exPoint" value="${product.exchangedPoint}" placeholder="Enter exchanged points" required min="0"/>
		//                         </div>
		//                     </div>
		//                     <div className="column">
		//                         <div className="input-box">
		//                             <label>Surprise start day <span className="text-danger">*</span></label>
		//                             <input type="date" name="p_startDate" id="p_startDateu2" required/>
		//                         </div><div className="input-box">
		//                             <label>Surprise end day <span className="text-danger">*</span>&nbsp; &nbsp; <span id="error-endDateu2" className="text-danger"></span></label>
		//                             <input type="date" name="p_endDate" id="p_endDateu2" required/>

		//                         </div>
		//                     </div>
		//                     <button>Submit</button>
		//                 </form>
		//             </div>
		//         </div>
		//     </div>
		// </c:if>
	);
};
