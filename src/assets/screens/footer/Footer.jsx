import React from 'react'
import BullLogo from '/logoFooter/BullLogo.svg' // Замініть на реальний шлях до вашого лого
import PlayUkraineLogo from '/logoFooter/PlayUkrainLogo.svg'
import RedDot from '/logoFooter/RedDot.svg'
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
				<div className={`${styles.leftWrapper}`}>

					<div className={`${styles.logoWrapper}`}>
						<img className={`${styles.logoImg}`} src='/public/logoHeader/logo.svg' alt='Art & culture Ukraine'/>
						<div className={`${styles.logoTitleWrapper}`}>
							<p className={`${styles.logoFirstWord}`}>art</p>
							<p className={`${styles.logoSecondWord}`}>&culture</p>
							<p className={`${styles.logoThirdWord}`}>Ukraine</p>
						</div>
					</div>

					<nav className={`${styles.menuWrapper}`}>
							<ul className={`${styles.menuUl}`}>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Головна
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Новини
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Митці
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Виставки
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Музеї
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Архітектура
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Арт Терміни
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Що поруч
									</a>
								</li>
								<li className={`${styles.menuLi}`}>
									<a className={`${styles.menuLink}`} href='#'>
										Контакти
									</a>
								</li>
							</ul>
						</nav>

				</div>

				<div className={`${styles.rightWrapper}`}>


					<div className={`${styles.topInner}`}>

						<div className={`${styles.socialWrapper}`}>
							<div className={`${styles.followUsWrapper}`}>							
								<p className={`${styles.followUsTitle}`}>follow us</p>
							</div>
							<div className={`${styles.sociaButtonslWrapper}`}>
								<button className={`${styles.facebookButton} ${styles.socialButton}`}>
									<img className={`${styles.facebookButtonImg}`}></img>
								</button>
								<button className={`${styles.instagramButton} ${styles.socialButton}`}>								
									<img className={`${styles.instagramButtonImg}`}></img>
								</button>
								<button className={`${styles.twitterButton} ${styles.socialButton}`}>								
									<img className={`${styles.twitterButtonImg}`}></img>
								</button>
							</div>
						</div>

						<div className={`${styles.kontactsWrapper}`}>
							<div className={`${styles.kontactsTitleWrapper}`}>
								<p className={`${styles.kontactsTitle}`}>Контакти</p>
							</div>
							<div className={`${styles.kontactsLinkWrapper}`}>
								<a className={`${styles.kontactsLink}`} href='#'>
									<img className={`${styles.kontactsLinkImg}`} src='/public/logoHeader/phoneIcon.svg' alt='Phone'/>
								</a>
							</div>
						</div>

					</div>


					<div className={`${styles.bottomInner}`}>						

						<div className={`${styles.legalWrapper}`}>
							<a className={`${styles.legalLink}`} href='#'>
								<p className={`${styles.legalLinkText}`}>Legal Notice</p>
							</a>
						</div>
						<div className={`${styles.policyWrapper}`}>
							<a className={`${styles.policyLink}`} href='#'>
								<p className={`${styles.policyLinkText}`}>Privacy Policy</p>
							</a>
						</div>
						<div className={`${styles.CopyrightWrapper}`}>
							<a className={`${styles.CopyrightLink}`} href='#'>
								<p className={`${styles.CopyrightLinkText}`}>Copyrights</p>
							</a>
						</div>

					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
