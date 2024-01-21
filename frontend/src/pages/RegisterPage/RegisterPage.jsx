import React from 'react';
import './../../assets/css/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { reset, register } from '../../features/auth/authSlice';
import { Spinner } from '../../components';


export const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		address: '',
		phone: '',
		email: '',
		dob: '',
		gender: '',
		password: '',
	});

	const {name, address, phone, email, dob, gender, password} = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth) 

	useEffect(() => {
		if(isError){
			toast.error(message);
		}

		if(isSuccess || user){
			navigate('/home')
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(register(formData));
		dispatch(reset());
	};

	if(isLoading){
		return <Spinner />
	}

	return (
		<div
			class="img js-fullheight"
			style={{
				backgroundImage:
					'url(style-sign-up/images/z4373505915681_735607b4dfbe3d3d80f627e7495e773d.jpg)',
			}}
		>
			<section class="ftco-section">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-5">
							<h2 class="heading-section">SIGN UP</h2>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-md-6 col-lg-4">
							<div class="login-wrap p-0">
								<form class="signin-form" onSubmit={onSubmit}>
									<div class="form-group">
										<input
											type="text"
											class="form-control"
											placeholder="Your Name"
											name="name"
											value={name}
											required
											onChange={onChange}
										/>
									</div>
									<div class="form-group">
										<input
											type="text"
											class="form-control"
											placeholder="Address"
											name="address"
											value={address}
											onChange={onChange}
										/>
									</div>
									<div class="form-group">
										<input
											type="text"
											class="form-control"
											placeholder="Phone number"
											name="phone"
											value={phone}
											onChange={onChange}
										/>
										<div id="error-phone" class="text-warning"></div>
									</div>
									<div class="form-group">
										<input
											type="email"
											class="form-control"
											placeholder="Email"
											name="email"
											required
											value={email}
											onChange={onChange}
										/>
										<div id="error-email" class="text-warning"></div>
									</div>
									<div class="form-group">
										<input
											type="date"
											class="form-control"
											placeholder="Date of birth"
											name="dob"
											value={dob}
											onChange={onChange}
										/>
									</div>
									<div class="form-group">
										<select required class="form-control" name="gender">
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div class="form-group">
										<input
											required
											id="password-field"
											type="password"
											class="form-control"
											placeholder="Password"
											name="password"
											onChange={onChange}
											value={password}
										/>
										<span
											toggle="#password-field"
											class="fa fa-fw fa-eye field-icon toggle-password"
										></span>
									</div>
									<div class="form-group">
										<button
											type="submit"
											class="form-control btn btn-primary submit px-3"
										>
											Sign Up
										</button>
									</div>
									<div class="form-group d-md-flex">
										<div class="w-50">
											<Link to={'/login'}>Log in</Link>
										</div>
										<div class="w-50 text-md-right">
											<Link to={'/forgot-password'} style={{ color: '#fff' }}>
												Forgot Password
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
