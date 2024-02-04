import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProductById, updateProduct } from '../../../../../features/products/productsSlice';
import { Spinner } from '../../../../../components';
import './UpdateProduct.css';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../../../../features/categories/categoriesSlice';

export const UpdateProduct = ({ setIsOpenUpdateForm, chosenProductId, handleGetAllProducts }) => {
	const [isSurprise, setIsSurprise] = useState(false);
	const dispatch = useDispatch();

	const {
		products: product,
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

	const handleCloseBtn = () => {
		setIsOpenUpdateForm(false);
		handleGetAllProducts();
	}

	const onSubmit = async (data) => {
		const updateData = {
			...data,
			isSurprise: isSurprise,
		};
		if (productError) {
			toast.error(productMessage);
		}
		await dispatch(updateProduct({chosenProductId, updateData}));
		
		if (productSuccess) {
			toast.success('Update product successfully!');
			handleCloseBtn();
		}
	};

	useEffect(() => {
		if (categoryError) {
			toast.error(categoryMessage);
		}
		if(!categories){
			dispatch(getAllCategories());
		}
	}, [dispatch, categoryError, categoryMessage]);

	if (productLoading || categoryLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="overlay-update"></div>
			<div className="content">
				<form className="updateProductForm" onSubmit={handleSubmit(onSubmit)}>
					<p style={{ fontWeight: 'bold', textAlign: 'center' }}>
						UPDATE PRODUCT
					</p>
					<div onClick={handleCloseBtn} className="close-btn">
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
					<div>
						<label>
							Product status <span className="text-danger">*</span>
						</label>
						<input type="radio" value={true} {...register('productStatus')} />{' '}
						True
						<input
							type="radio"
							value={false}
							{...register('productStatus')}
						/>{' '}
						False
					</div>
					<div className="column">
						<div className="input-box">
							<label>
								Is surprise <span className="text-danger">*</span>
							</label>
							<input
								type="radio"
								name="isSurprise"
								onChange={() => setIsSurprise(true)}
							/>{' '}
							True
							<input
								type="radio"
								name="isSurprise"
								onChange={() => setIsSurprise(false)}
							/>{' '}
							False
						</div>
					</div>
					{isSurprise && (
						<div className="column">
							<div className="input-box">
								<label>Start day</label>
								<input
									type="date"
									{...register('startDate')}
									min={new Date().toISOString().split('T')[0]}
								/>
							</div>
							<div className="input-box">
								<label>End day</label>
								<input
									type="date"
									{...register('endDate')}
									min={new Date().toISOString().split('T')[0]}
								/>
							</div>
						</div>
					)}
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};
