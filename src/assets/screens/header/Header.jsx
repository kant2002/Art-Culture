import React, { useEffect } from 'react'
import '../../../styles/layout/Header.module.scss'

function Header() {
	useEffect(() => {
		const handleScroll = () => {
			const mainHeader = document.querySelector('.mainHeader')
			const staticHeader = document.querySelector('.staticHeader')

			if (window.scrollY > 177) {
				mainHeader.style.transform = 'translateY(-100%)'
				staticHeader.classList.add('visible')
			} else {
				mainHeader.style.transform = 'translateY(0)'
				staticHeader.classList.remove('visible')
			}
		}

		window.addEventListener('scroll', handleScroll)

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header>
			<div className='mainHeader'>
				<div className='mainHeaderWrapper'>
					<div className='mainHeaderLogo logo'>
						<img
							className='logo__img'
							src='/public/logoHeader/logo.svg'
							alt='Art & culture Ukraine'
						/>
						<div className='logo__titleWrapper'>
							<p className='logo__firstWord white'>art</p>
							<p className='logo__secondWord white'>&culture</p>
							<p className='logo__thirdWord white'>Ukraine</p>
						</div>
					</div>
					<div className='titleContainer'>
						<div className='titleWrapper'>
							<div className='headerLanguageSwitchContainer'>
								<button className='headerLanguageSwitchButton'>
									<p className='headerLanguageSwitchButton__title'>
										Ukrainian &#9660;
									</p>
								</button>
							</div>
							<h1>Ukrainian art & culture online</h1>
						</div>
						<nav className='mainMenuContainer'>
							<ul className='mainMenu__ul'>
								<li className='mainMenu__li'>
									<a className='mainMenu__link' href='#'>
										Головна
									</a>
								</li>
								<li className='mainMenu__li'>
									<a className='mainMenu__link' href='#'>
										Новини
									</a>
								</li>
								<li className='mainMenu__li'>
									<a className='mainMenu__link' href='#'>
										Митці
									</a>
								</li>
								<li className='mainMenu__li'>
									<a className='mainMenu__link' href='#'>
										Виставки
									</a>
								</li>
								<li className='mainMenu__li'>
									<a className='mainMenu__link' href='#'>
										Музеї
									</a>
								</li>
								<li className='mainMenu__li'>
									<a className='mainMenu__link' href='#'>
										Арт Терміни
									</a>
								</li>
							</ul>
						</nav>
					</div>
					<div className='socialContainer'>
						<div className='socialUpperWrapper'>
							<div className='socialLikeAndShareInner'>
								<button className='socialLikeAndShareInner__likeButton circleButton'>
									<img
										className='likeButtonImg'
										src='/public/logoHeader/likeHeart.svg'
										alt='Like'
									/>
								</button>
								<button className='socialLikeAndShareInner__shareButton circleButton'>
									<img
										className='shareButtonImg'
										src='/public/logoHeader/shareArrow.svg'
										alt='Share'
									/>
								</button>
							</div>
							<div className='burgerButtonWrapper'>
								<button className='burgerButton'>
									<img
										className='burgerButton__img'
										src='/public/logoHeader/burgerButtonIcon.svg'
										alt='Menu'
									/>
									<p className='burgerButton__title'>Меню</p>
								</button>
							</div>
						</div>
						<div className='socialDownWrapper'>
							<p className='socialDownWrapper__followUsTitle'>follow us</p>
							<button className='socialDownWrapper__facebookButton socialDownWrapperButton circleButton'>
								<img src='/public/logoHeader/fasebook.svg' alt='Facebook' />
							</button>
							<button className='socialDownWrapper__instagramButton socialDownWrapperButton circleButton'>
								<img src='/public/logoHeader/instagram.svg' alt='Instagram' />
							</button>
							<button className='socialDownWrapper__twitterButton socialDownWrapperButton circleButton'>
								<img src='/public/logoHeader/twitter.svg' alt='Twitter' />
							</button>
							<button className='socialDownWrapper__mailButton socialDownWrapperButton circleButton'>
								<img src='/public/logoHeader/mail.svg' alt='Mail' />
							</button>
							<div className='socialDownWrapper__separator'>
								<img
									src='/public/logoHeader/verticalSeparator.svg'
									alt='button seperator'
								/>
							</div>
							<button className='socialDownWrapper__loginButton socialDownWrapperButton circleButton'>
								<img src='/public/logoHeader/login.svg' alt='Login' />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='staticHeader'>
				<div className='staticHeaderWrapper'>
					<div className='staticHeaderLogo'>
						<p className='staticHeaderLogoTitle'>art</p>
					</div>
					<div className='staticHeaderTitleContainer'>
						<button className='staticHeaderTitleContainer__likeButton circleButton'>
							<img src='/public/logoHeader/likeHeart.svg' alt='Like' />
						</button>
						<h2 className='staticHeaderTitle'>
							Ukrainian art & culture online
						</h2>
						<button className='staticHeaderTitleContainer__shareButton circleButton'>
							<img src='/public/logoHeader/shareArrow.svg' alt='Share' />
						</button>
					</div>
					<div className='staticHeaderLoginContainer'>
						<button className='staticHeaderLoginContainer__loginButton circleButton'>
							<img src='/public/logoHeader/loginBlack.svg' alt='Login' />
						</button>
						<div className='staticHeaderLoginContainer__separator'>
							<img
								className='separatorImg'
								src='/public/logoHeader/verticalSeparatorBlack.svg'
								alt='button seperator'
							/>
						</div>
						<button className='burgerButton'>
							<img
								className='burgerButton__img'
								src='/public/logoHeader/burgerButtonIcon.svg'
								alt='Menu'
							/>
							<p className='burgerButton__title'>Меню</p>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
