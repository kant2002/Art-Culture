import {
	BrowserRouter,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import Footer from '../assets/screens/footer/Footer.jsx'
import Home from '../assets/screens/home/Home.jsx'
import MainPage from '../assets/screens/mainPage/MainPage.jsx'
import { routes } from './routes.data.js'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.component />}
					/>
				))}

				<Home />
				<MainPage />
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}
