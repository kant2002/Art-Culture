import Home from '../assets/screens/home/Home'
import Layout from '../assets/screens/layout/Layout'
import MainPage from '../assets/screens/mainPage/MainPage'
import userProfile from '../assets/screens/userProfile/userProfile'

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

	{
		path: '/userProfile',
		element: userProfile,
		isAuth: true,
	},
]
