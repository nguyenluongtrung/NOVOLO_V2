import React from 'react';
import './../../assets/css/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { reset, registerUser } from '../../features/auth/authSlice';
import { Spinner } from '../../components';
import { useForm } from 'react-hook-form';
import { rules } from '../../utils/rules';
import './RegisterPage.css';

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {register, handleSubmit, formState: {errors}} = useForm();

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

	const onSubmit = (data) => {
		dispatch(registerUser(data));

		if(isSuccess){
			toast.success('Register successfully!')
			navigate('/home')
		}
	};

	if(isLoading){
		return <Spinner />
	}

	return (
		<div
		class="img js-fullheight"
		style={{backgroundImage: 'url(/img/product/bglogin.jpg)' }}
		>
			<section class="ftco-section">
				<div class="sign-up-container pt-4">
					<div class="row justify-content-center">
						<div class="col-md-6 text-center mb-5">
							<h2 class="heading-section">SIGN UP</h2>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-md-6 col-lg-4">
							<div class="login-wrap p-0">
								<form class="signin-form" onSubmit={handleSubmit(onSubmit)}>
									<div class="form-group">
										<input
											type="text"
											class="form-control rounded-pill"
											placeholder="Your Name"
											{...register('name', rules.name)}
										/>
									</div>
									<div class="form-group">
										<input
											type="text"
											class="form-control rounded-pill"
											placeholder="Address"
											{...register('address')}
										/>
									</div>
									<div class="form-group">
										<input
											type="text"
											class="form-control rounded-pill"
											placeholder="Phone number"
											{...register('phone', rules.phone)}
										/>
										<div id="error-phone" class="text-warning"></div>
									</div>
									<div class="form-group">
										<input
											type="email"
											class="form-control rounded-pill"
											placeholder="Email"
											{...register('email', rules.email)}
										/>
										<div id="error-email" class="text-warning"></div>
									</div>
									<div class="form-group">
										<input
											type="date"
											class="form-control rounded-pill"
											{...register('dob')}
										/>
									</div>
									<div class="form-group">
										<select {...register('gender')} class="form-control rounded-pill">
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div class="form-group">
										<input
											id="password-field"
											type="password"
											class="form-control rounded-pill"
											placeholder=' Your Password'
											{...register('password', rules.password)}
										/>
										<span
											toggle="#password-field"
											class="fa fa-fw fa-eye field-icon toggle-password"
										></span>
									</div>
									<div class="form-group " >
										<button style={{fontWeight:"bold"}}
											type="submit"
											class="form-control rounded-pill btn btn-primary submit px-3"
										>
											Sign Up
										</button>
									</div>
									<div class="form-group d-md-flex">
										<div class="w-50" style={{fontWeight:"bold"}} >
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
