import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const AddCombo = ({ setIsOpenAddForm }) => {
	const [image, setImage] = useState('');
	const [discount, setDiscount] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const onSubmit = () => {

    }

	return (
		<div className="popup active" id="popup-2">
			<div className="overlay"></div>
			<div className="content2">
				<div className="close-btn" onClick={() => setIsOpenAddForm(false)}>
					&times;
				</div>
				<p style={{ fontWeight: 'bold', textAlign: 'center' }}>ADD NEW COMBO</p>
				<br />
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<table className="table bg-white rounded shadow-sm  table-hover">
							<thead>
								<tr>
									<th scope="col" style={{ fontSize: '90%' }}></th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Category Name
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Product Name
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Quantity
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Main course</td>
									<td>
										<select
											style={{ width: '200px' }}
											onchange="redirectToURL(this)"
											name=""
											value=""
										>
											<option value="">Select</option>
											<option value="search-product-by-category?id=${1}&ok=${1}">
												Chicken
											</option>
											<option value="search-product-by-category?id=${3}&ok=${1}">
												Burger
											</option>
											<option value="search-product-by-category?id=${5}&ok=${1}">
												Spaghetti
											</option>
											<option value="search-product-by-category?id=${7}&ok=${1}">
												Taco
											</option>
										</select>
									</td>
									<td>
										<select required style={{ width: '200px' }} name="main">
											{/* <c:if test="${mainCourse != null}">
														<c:forEach items="${mainCourse}" var="c">
															<option className="py-1" value="${c.productID}">
																${c.name}
															</option>
														</c:forEach>
													</c:if> */}
										</select>
									</td>
									<td>
										<input type="number" name="m_quantity" min="1" required />
									</td>
								</tr>
								<tr>
									<td>Side dish</td>

									<td>
										<select
											style={{ width: '200px' }}
											onchange="redirectToURL(this)"
											name=""
											value=""
										>
											<option value="">Select</option>
											<option value="search-product-by-category?id=${2}&ok=${2}">
												Sandwich
											</option>
											<option value="search-product-by-category?id=${6}&ok=${2}">
												Salad
											</option>
											<option value="search-product-by-category?id=${8}&ok=${2}">
												French Fries
											</option>
										</select>
									</td>
									<td>
										<select required style={{ width: '200px' }} name="side">
											{/* <c:if test="${sideDish != null}">
														<c:forEach items="${sideDish}" var="c">
															<option value="${c.productID}">${c.name}</option>
														</c:forEach>
													</c:if> */}
										</select>
									</td>
									<td>
										<input type="number" name="s_quantity" min="1" required />
									</td>
								</tr>
								<tr>
									<td>Beverage</td>

									<td>
										<select
											style={{ width: '200px' }}
											onchange="redirectToURL(this)"
											name=""
											value=""
										>
											<option value="">Select</option>
											<option value="search-product-by-category?id=${4}&ok=${3}">
												Beverage
											</option>
										</select>
									</td>
									<td>
										<select required style={{ width: '200px' }} name="beverage">
											{/* <c:if test="${beverage != null}">
														<c:forEach items="${beverage}" var="c">
															<option value="${c.productID}">${c.name}</option>
														</c:forEach>
													</c:if> */}
										</select>
									</td>
									<td>
										<input type="number" name="b_quantity" min="1" required />
									</td>
								</tr>
							</tbody>
						</table>

						<table className="table bg-white rounded shadow-sm table-hover">
							<thead>
								<tr>
									<th scope="col" style={{ fontSize: '90%' }}>
										Combo Name
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Exchanged points
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Accumulated points
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Discount
									</th>
									<th scope="col" style={{ fontSize: '90%' }}>
										Image
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<input
											className="py-1"
											type="text"
											{...register('name')}
											placeholder="Please give a name..."
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="number"
											{...register('exchangedPoint')}
											min="1"
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="number"
											{...register('accumulatedPoint')}
											min="1"
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="number"
											name="discount"
											min="0"
											max="1"
											step="0.01"
											onChange={(e) => setDiscount(e.target.value)}
											required
										/>
									</td>
									<td>
										<input
											className="py-1"
											type="file"
											name="image"
											onChange={(e) => setImage(e.target.files[0])}
											required
										/>
									</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td colspan="1">
										<button
											className="btn btn-success py-2"
											style={{ width: '100%' }}
											type="submit"
										>
											SUBMIT
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>
	);
};
