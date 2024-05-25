import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../../../../../features/products/productsSlice';
import { Spinner } from '../../../../../components';
import './AddProduct.css';
import { FaTimes } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { getAllCategories } from '../../../../../features/categories/categoriesSlice';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../../../firebase';

export const AddProduct = ({ setIsOpenAddForm, handleGetAllProducts }) => {
	const dispatch = useDispatch();
	const [isSurprise, setIsSurprise] = useState(false);
	const fileRef = useRef(null);
	const [file, setFile] = useState(undefined);
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [image, setImage] = useState('');

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

	const handleCloseBtn = () => {
		setIsOpenAddForm(false);
		handleGetAllProducts();
	};

	useEffect(() => {
		if (file) {
			handleFileUpload(file);
		}
	}, [file]);

	const handleFileUpload = (file) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, `products/${fileName}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFilePerc(Math.round(progress));
			},
			(error) => {
				setFileUploadError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
					setImage(downloadURL)
				);
			}
		);
	};

	const onSubmit = async (data) => {
		const addData = {
			...data,
			isSurprise: isSurprise,
			image,
		};

		if (productError) {
			toast.error(productMessage);
		}
		await dispatch(createProduct(addData));
		if (productSuccess) {
			toast.success('Create new product successfully!');
			handleCloseBtn();
		}
	};

	useEffect(() => {
		if (categoryError) {
			toast.error(categoryMessage);
		}
		if (!categories) {
			dispatch(getAllCategories());
		}
	}, [dispatch, categoryError, categoryMessage]);

	if (productLoading || categoryLoading || !categories) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="overlay-add"></div>
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
							<button
								className="rounded-md rounded-customized-gray p-1 hover:cursor-pointer"
								onClick={() => fileRef.current.click()}
							>
								<span>Choose image</span>
							</button>
							<input
								type="file"
								ref={fileRef}
								hidden
								onChange={(e) => setFile(e.target.files[0])}
							/>
							<p className="text-sm self-center pl-2">
								{fileUploadError ? (
									<span className="text-red">
										Tải ảnh lên thất bại (dung lượng ảnh phải nhỏ hơn 2MB)
									</span>
								) : filePerc > 0 && filePerc < 100 ? (
									<span className="text-gray">{`Đang tải lên ${filePerc}%`}</span>
								) : filePerc === 100 ? (
									<span className="text-green">Tải ảnh lên thành công!</span>
								) : (
									''
								)}
							</p>
						</div>
					</div>
					<div className="column column-flex">
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
					<div className="column column-flex">
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
					<div className="column">
						<div className="input-box">
							<label>
								Is surprise <span className="text-danger">*</span>
							</label>
							<input
								type="radio"
								name="isSurprise"
								onChange={() => setIsSurprise(true)}
								style={{ width: '12px', marginTop: '-10px' }}
							/>{' '}
							True &nbsp;
							<input
								type="radio"
								name="isSurprise"
								onChange={() => setIsSurprise(false)}
								style={{ width: '12px', marginTop: '-10px' }}
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
