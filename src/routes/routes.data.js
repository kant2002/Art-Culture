import Home from '../assets/screens/home/Home'
import Layout from '../assets/screens/layout/Layout'
import MainPage from '../assets/screens/mainPage/MainPage'

export const routes = [
	{
		path: '/',
		element: Home,
		isAuth: false,
	},

	{
		path: '/MainPage',
		element: MainPage,
		isAuth: false,
	},
	{
		path: '/Layout',
		element: Layout,
		isAuth: false,
	},
]
