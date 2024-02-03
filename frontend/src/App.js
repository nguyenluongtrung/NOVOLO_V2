import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { NotFound } from './pages/NotFound';
import { Layout } from './Layout';
import { AboutMe } from './pages/AboutMe';
import { ShoppingPage } from './pages/ShoppingPage';
import { SingleProduct } from './pages/SingleProduct';
import { AdminProduct, AdminSale } from './pages/AdminPage';
import { WishList } from './pages/WishListPage';
import { CartPage } from './pages/CartPage/CartPage';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/about-me" element={<AboutMe />} />
						<Route path="/shop" element={<ShoppingPage />} />
						<Route path="/single-product/:id" element={<SingleProduct />} />
						<Route path="/admin-product" element={<AdminProduct />} />
						<Route path="/admin-sale" element={<AdminSale />} />
						<Route path="/wishList" element={<WishList />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/about-us" element={<AboutUs />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
