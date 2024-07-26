// import React from 'react'
// import BullLogo from '/logoFooter/BullLogo.svg' // Замініть на реальний шлях до вашого лого
// import PlayUkraineLogo from '/logoFooter/PlayUkrainLogo.svg'
// import RedDot from '/logoFooter/RedDot.svg'
import styles from '/src/styles/layout/Footer.module.scss'

const Footer = () => {
	return (
		// <footer className={styles.footer}>
		// 	<div className={styles.footerWrapper}>
		// 		<div className={styles.footerLeftSideWrapper}>
		// 			<div className={styles.leftSideLogo}>
		// 				<img src={BullLogo} alt='Art & Culture Ukraine' />
		// 			</div>
		// 			<div className={styles.leftSideLogoText}>
		// 				<p className={styles.logoText}>art</p>
		// 				<p className={styles.logoSubText_Culture}>&CULTURE</p>
		// 				<p className={styles.logoSubText_Ukraine}>UKRAINE</p>
		// 			</div>
		// 			<div className={styles.leftSideLogoRedDot}>
		// 				<img src={RedDot} alt='Red Dot' className={styles.footerRedDot} />
		// 			</div>
		// 		</div>
		// 		<div className={styles.footerMenuWrapper}>
		// 			<nav className={styles.footerMenuBlockFirstColumn}>
		// 				<ul className={styles.firstColumn}>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Головна
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Новини
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Митці
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Виставки
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Музеї
		// 						</a>
		// 					</li>
		// 				</ul>
		// 			</nav>
		// 			<nav className={styles.footerMenuBlockSecondColumn}>
		// 				<ul className={styles.secondColumn}>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Архітектура
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Арт-терміни
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Що поруч
		// 						</a>
		// 					</li>
		// 					<li>
		// 						<a className={styles.footerMenu_Link} href='#'>
		// 							Контакти
		// 						</a>
		// 					</li>
		// 				</ul>
		// 			</nav>
		// 		</div>
		// 		<div className={styles.footerSeparator}></div>
		// 		<div className={styles.footerRightSideWrapper}>
		// 			<div className={styles.footerSocial}>
		// 				<h3 className={styles.socialTitle}>FOLLOW US</h3>
		// 				<div className={styles.footerSocialIcons}>
		// 					<i className='fab fa-facebook-f'>
		// 						<img src='/footerIcons/FacebookIcons.svg' />
		// 					</i>
		// 					<i className='fab fa-instagram'>
		// 						<img src='/footerIcons/InstagramIcon.svg' />
		// 					</i>
		// 					<i className='fab fa-xing'>
		// 						<img src='/footerIcons/XIcon.svg' />
		// 					</i>
		// 				</div>
		// 			</div>
		// 			<div className={styles.rightSideLogoContact}>
		// 				<p>
		// 					<a href='#'>Контакти</a>
		// 				</p>
		// 				<img src={PlayUkraineLogo} alt='Play Ukraine' />
		// 			</div>
		// 			<div className={styles.footerInfo}>
		// 				<p>
		// 					<a href='#'>Legal Notice</a>
		// 				</p>
		// 				<p>
		// 					<a href='#'>Privacy Policy</a>
		// 				</p>
		// 				<p>
		// 					<a href='#'>Copyrights</a>
		// 				</p>
		// 			</div>
		// 		</div>
		// 	</div>
		// </footer>

		<footer className={`${styles.footer}`}>
			<div className={`${styles.footerWrapper}`}>
				<div className={`${styles.footerLeftWrapper}`}>

					<div className={`${styles.footerLogoWrapper}`}>
						<img className={`${styles.footerLogoImg}`} src='/public/logoHeader/logo.svg' alt='Art & culture Ukraine' />
						<div className={`${styles.footerLogoTitleWrapper}`}>
							<p className={`${styles.footerLogoFirstWord}`}>art</p>
							<p className={`${styles.footerLogoSecondWord}`}>&culture</p>
							<p className={`${styles.footerLogoThirdWord}`}>Ukraine</p>
						</div>
					</div>

					<nav className={`${styles.footerMenuWrapper}`}>
						<ul className={`${styles.footerMenuUl}`}>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Головна
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Архiтектура
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Новини
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Арт Терміни
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Митцi
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Що поруч
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Виставки
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Контакти
								</a>
							</li>
							<li className={`${styles.footerMenuLi}`}>
								<a className={`${styles.footerMenuLink}`} href='#'>
									Музеї
								</a>
							</li>
						</ul>
					</nav>

				</div>

				<div className={`${styles.footerSeparatorWrapper}`}>
					<img className={`${styles.footerSeparatorImg}`} src='/public/logoHeader/footerSeparator.svg' alt='separator' />
				</div>

				<div className={`${styles.footerRightWrapper}`}>

					<div className={`${styles.footerTopInner}`}>

						<div className={`${styles.footerSocialWrapper}`}>
							<div className={`${styles.footerFollowUsWrapper}`}>
								<p className={`${styles.footerFollowUsTitle}`}>follow us</p>
							</div>
							<div className={`${styles.footerSociaButtonslWrapper}`}>
								<button className={`${styles.footerFacebookButton} ${styles.footerSocialButton}`}>
									<img className={`${styles.footerFacebookButtonImg}`} src='/public/logoHeader/fasebook.svg' alt='facebook' />
								</button>
								<button className={`${styles.footerInstagramButton} ${styles.footerSocialButton}`}>
									<img className={`${styles.footerInstagramButtonImg}`} src='/public/logoHeader/instagram.svg' alt='instagram' />
								</button>
								<button className={`${styles.footerTwitterButton} ${styles.footerSocialButton}`}>
									<img className={`${styles.footerTwitterButtonImg}`} src='/public/logoHeader/twitter.svg' alt='twitter' />
								</button>
							</div>
						</div>

						<div className={`${styles.footerContactsWrapper}`}>
							<div className={`${styles.footerContactsTitleWrapper}`}>
								<p className={`${styles.footerContactsTitle}`}>Контакти</p>
							</div>
							<div className={`${styles.footerContactsLinkWrapper}`}>
								<a className={`${styles.footerContactsLink}`} href='#'>
									<img className={`${styles.footerContactsLinkImg}`} src='/public/logoHeader/footerPlayUkraine.png' alt='PlayUkraine' />
								</a>
							</div>
						</div>

					</div>

					<div className={`${styles.footerBottomInner}`}>

						<div className={`${styles.footerLegalWrapper}`}>
							<a className={`${styles.footerLegalLink}`} href='#'>
								<p className={`${styles.footerLegalLinkText}`}>Legal Notice</p>
							</a>
						</div>
						<div className={`${styles.footerPolicyWrapper}`}>
							<a className={`${styles.footerPolicyLink}`} href='#'>
								<p className={`${styles.footerPolicyLinkText}`}>Privacy Policy</p>
							</a>
						</div>
						<div className={`${styles.footerCopyrightWrapper}`}>
							<a className={`${styles.footerCopyrightLink}`} href='#'>
								<p className={`${styles.footerCopyrightLinkText}`}>Copyrights</p>
							</a>
						</div>

					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
