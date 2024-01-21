import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer, Header } from '../components';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<ToastContainer />
		</>
	);
};
