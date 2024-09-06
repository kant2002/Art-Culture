import Login from '../assets/components/VerificationPages/LoginPage'
import SignUp from '../assets/components/VerificationPages/SignUpPage'
import Home from '../assets/screens/home/Home'
import Layout from '../assets/screens/layout/Layout'
import MainPage from '../assets/screens/mainPage/MainPage'
import UserProfile from '../assets/screens/userProfile/userProfile'
import UserProfileAddPost from '../assets/screens/userProfile/userProfileAddPost'
import UserProfilePosts from '../assets/screens/userProfile/userProfilePosts'
import NewsPage from '../assets/screens/newsPage/NewsPage'
import ArtistPage from '../assets/screens/ArtistPage/ArtistPage'

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
		element: UserProfile,
		isAuth: true,
	},

	{
		path: '/login',
		element: Login,
		isAuth: false,
	},

	{
		path: '/signup',
		element: SignUp,
		isAuth: false,
	},

	{
		path: '/userProfileAddPost',
		element: UserProfileAddPost,
		isAuth: true,
	},

	{
		path: '/userProfilePosts',
		element: UserProfilePosts,
		isAuth: true,
	},

	{
		path: '/NewsPage',
		element: NewsPage,
		isAuth: false,
	},

	{
		path: '/ArtistPage',
		element: ArtistPage,
		isAuth: false,
	},
]
