import { useEffect, useState } from 'react';
import './../../assets/css/style.css';
import {login, reset} from './../../features/auth/authSlice';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components';
import './LoginPage.css';

export const LoginPage = () => {
    const [loginValue, setLoginValue] = useState({
        email: '',
        password: ''
    })

    const {email, password} = loginValue;

    const navigate = useNavigate();
    const dispatch = useDispatch();
	
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError && String(message) == 'Email or password is invalid!'){
            toast.error(message)
        }

        if(isSuccess || user){
			navigate('/home');
        } 

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setLoginValue((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value            
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginValue))
    }

    if(isLoading){
        return <Spinner />
    }

	return (
		<div
			class="img js-fullheight"
			style={{ backgroundImage: 'url(/img/product/bglogin.jpg)' }}
		>
			<section class="ftco-section">
				<div class="container p-5">
					<div class="row justify-content-center">
						<div class="col-md-6 col-lg-4">
							<div class="login-wrap p-0">
								<h3 class="mb-4 text-center">Have an account?</h3>
								<form class="signin-form" onSubmit={onSubmit}>
									<div class="form-group">
										<input
											type="text"
											name="email"
											class="rounded-pill form-control"
											placeholder="Email"
											value={email}
                                            onChange={onChange}
										/>
									</div>
									<div class="form-group">
										<input
											id="password-field"
											type="password"
											name="password"
											class="rounded-pill form-control"
											placeholder="Password"
											value={password}
                                            onChange={onChange}
										/>
										<span
											toggle="#password-field"
											class="fa fa-fw fa-eye field-icon toggle-password"
										></span>
									</div>
									<div class="form-group">
										<button
											type="submit"
											class="rounded-pill form-control btn btn-primary submit px-3"
										>
											Sign In
										</button>
									</div>
									<div class="form-group d-md-flex">
										<div class="w-50">
											<label class="checkbox-wrap checkbox-primary">
												Remember Me
												<input type="checkbox" checked name="remember" />
												<span class="checkmark"></span>
											</label>
										</div>
										<div class="w-50 text-md-right">
											<a href="forgotPassword.jsp" style={{ color: '#fff' }}>
												Forgot Password
											</a>
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
