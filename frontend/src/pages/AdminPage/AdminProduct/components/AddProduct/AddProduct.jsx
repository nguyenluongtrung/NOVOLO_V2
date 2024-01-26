import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../../../../features/products/productsSlice';
import { Spinner } from '../../../../../components';
import './AddProduct.css';
import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { getAllCategories } from '../../../../../features/categories/categoriesSlice';

export const AddProduct = ({ setIsOpenAddForm }) => {
	const dispatch = useDispatch();

	const {
		isLoading: productLoading,
		isSuccess: productSuccess,
		isError: productError,
		message: productMessage,
	} = useSelector((state) => state.products);
	const {
		categories,
		isError: categoryError,
		isLoading: categoryLoading,
		message: categoryMessage,
	} = useSelector((state) => state.categories);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
        const addData = {...data, isSurprise: false, startDate: null, endDate: null}
		if (productError) {
			toast.error(productMessage);
		}
		dispatch(createProduct(addData));
		if (productSuccess) {
			toast.success('Create new product successfully!');
		}
	};

	useEffect(() => {
		if (categoryError) {
			toast.error(categoryMessage);
		}
		dispatch(getAllCategories());
	}, [dispatch, categoryError, categoryMessage]);

	if (productLoading || categoryLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="overlay"></div>
			<div className="content">
				<form className="addProductForm" onSubmit={handleSubmit(onSubmit)}>
					<p style={{ fontWeight: 'bold', textAlign: 'center' }}>
						ADD NEW PRODUCT
					</p>
					<div onClick={() => setIsOpenAddForm(false)} className="close-btn">
						<FaTimes />
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Product Name <span className="text-danger">*</span>
							</label>
							<input
								type="text"
								{...register('name')}
								placeholder="Enter product name"
								required
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Price <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('price')}
								placeholder="Enter price"
								required
								min="0"
							/>
						</div>
						<div className="input-box">
							<label>
								Image <span className="text-danger">*</span> &nbsp; &nbsp;
								<span className="text-danger" id="error-image"></span>
							</label>
							<input
								type="text"
								{...register('image')}
								placeholder="Enter image source"
								required
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label className="mb-2">
								Category <span className="text-danger">*</span>
							</label>
							<select
								{...register('categoryID')}
								className="w-100 rounded"
								style={{ padding: '13px 13px', borderColor: '#e7e6e7' }}
							>
								{categories.map((category) => {
									return <option value={category._id}>{category.name}</option>;
								})}
							</select>
						</div>
						<div className="input-box">
							<label>
								Calories <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('calories')}
								placeholder="Enter calories"
								required
								min="0"
							/>
						</div>
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Accumulated Point <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('accumulatedPoint')}
								placeholder="Enter accumulated points"
								required
								min="0"
							/>
						</div>
						<div className="input-box">
							<label>
								Exchanged Point <span className="text-danger">*</span>
							</label>
							<input
								type="number"
								{...register('exchangedPoint')}
								placeholder="Enter exchanged points"
								required
								min="0"
							/>
						</div>
					</div>
					{/* <c:if test="${surpriseProduct != null}">
								<div className="column">
									<div className="input-box">
										<label>Surprise start day</label>
										<input
											type="date"
											name="p_startDate"
											min="<%= LocalDate.now()%>"
										/>
									</div>
									<div className="input-box">
										<label>Surprise end day</label>
										<input
											type="date"
											name="p_endDate"
											min="<%= LocalDate.now()%>"
										/>
									</div>
								</div>
							</c:if> */}
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};
