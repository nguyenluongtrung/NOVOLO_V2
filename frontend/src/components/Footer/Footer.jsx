import './../../assets/css/main.css'

export const Footer = () => {
	return (
		<div className="footer-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-8">
						<div className="footer-box about-widget">
							<h2 className="widget-title">About us</h2>
							<p>
							We aim to build a weekly menu, the main product is healthy food, our difference is the combination of vegetarian and nonvegetarian menus alternating throughout the week. Our target customer base consists of individuals with stable or high income, including office workers.
							</p>
						</div>
					</div>
					<div className="col-lg-4 col-md-8">
						<div className="footer-box get-in-touch">
							<h2 className="widget-title">Get in Touch</h2>
							<ul>
								<li>FPT Da Nang Urban Area, Hoa Hai Ward, Ngu Hanh Son District, Da Nang City.</li>
								<li>greencorner@gmail.com</li>
								<li>+84 0111111111</li>
							</ul>
						</div>
					</div>
					<div className="col-lg-4 col-md-8">
						<div className="footer-box pages">
							<h2 className="widget-title">Pages</h2>
							<ul>
								<li>
									<a href="/home">Home</a>
								</li>
								<li>
									<a href="/about-us">About</a>
								</li>
								
								<li>
									<a href="/shop">Shop</a>
								</li>
								<li>
									<a href="/contact">Contact</a>
								</li>
								</ul>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
