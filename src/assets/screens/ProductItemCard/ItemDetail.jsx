import TranslatedContent from '@components/Blocks/TranslatedContent'
import styles from '@styles/components/ProductItemCard/ItemDetail.module.scss'
import { useTranslation } from 'react-i18next'
import LikeAndShare from '@components/Blocks/LikeAndShare'
import sliderStyles from '@styles/components/Blocks/Slider.module.scss'

function ItemDetail() {
	const { t } = useTranslation()

	return (
		<div className={styles.ItemDetailContainer}>
			<div className={`${styles.ItemPageNavigationContainer}`}>
				<nav className={`${styles.ItemPageNavigation}`}>
					<ul className={`${styles.ItemPageNavigationList}`}>
						<li className={`${styles.ItemPageNavigationItem}`}>
							{t('Митці')}
						</li>
						<p
							className={`${styles.ItemPageNavigationItemSeparator}`}
						>
							&#8250;
						</p>
						<li className={`${styles.ItemPageNavigationItem}`}>
							Митець
						</li>
						<p
							className={`${styles.ItemPageNavigationItemSeparator}`}
						>
							&#8250;
						</p>
						<li className={`${styles.ItemPageNavigationItem}`}>
							Картина
						</li>
					</ul>
				</nav>
			</div>
			<div className={`${styles.ItemDetailTopContainer}`}>
				<div className={`${styles.ItemDetailImageContainer}`}>
					<div className={`${styles.ItemDetailImageWrapper}`}>
						<img
							className={`${styles.ItemDetailBottomImage}`}
							src="/Img/gallery/1.webp"
							alt="Картинка"
						/>
					</div>
					<div className={`${styles.ItemDetailZoomButtonWrapper}`}>
						<button className={`${styles.ItemDetailZoomButton}`}>
							<img
								className={`${styles.ItemDetailBottomImage}`}
								src="/Img/gallery/1.webp"
								alt="Картинка"
							/>
						</button>
					</div>
				</div>
			</div>
			<div className={`${styles.ItemDetailBottomContainer}`}>
				<div className={`${styles.ItemDetailLeftContainer}`}>
					<div className={`${styles.ItemDetailTitleWrapper}`}>
						<h1 className={`${styles.ItemDetailTitle}`}>
							Назва картини
						</h1>
					</div>
					<div
						className={`${styles.ItemDetailDateOfCreationWrapper}`}
					>
						<p className={`${styles.ItemDetailDateOfCreation}`}>
							Дата створення картини
						</p>
					</div>
					<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
					<div className={`${styles.ItemDetailAboutContainer}`}>
						<div
							className={`${styles.ItemDetailArtistNameWrapper}`}
						>
							<p className={`${styles.ItemDetailArtistName}`}>
								Митець&#58;
							</p>
							<p
								className={`${styles.ItemDetailArtistNameValue}`}
							>
								Ім'я митця
							</p>
						</div>
						<div className={`${styles.ItemDetailSizeWrapper}`}>
							<p className={`${styles.ItemDetailSize}`}>
								Розмір&#58;
							</p>
							<p className={`${styles.ItemDetailSizeValue}`}>
								Розмір
							</p>
						</div>
						<div className={`${styles.ItemDetailStileWrapper}`}>
							<p className={`${styles.ItemDetailStile}`}>
								Стиль&#58;
							</p>
							<p className={`${styles.ItemDetailStileValue}`}>
								Стиль
							</p>
						</div>
						<div
							className={`${styles.ItemDetailOriginalTitleWrapper}`}
						>
							<p className={`${styles.ItemDetailOriginalTitle}`}>
								Оригінальна назва&#58;
							</p>
							<p
								className={`${styles.ItemDetailOriginalTitleValue}`}
							>
								Оригінальна назва
							</p>
						</div>
						<div className={`${styles.ItemDetailTechniqueWrapper}`}>
							<p className={`${styles.ItemDetailTechnique}`}>
								Техніка&#58;
							</p>
							<p className={`${styles.ItemDetailTechniqueValue}`}>
								Техніка
							</p>
						</div>
					</div>
				</div>
				<div className={`${styles.ItemDetailRightContainer}`}>
					<div
						className={`${styles.ItemDetailDescriptionWrapper}`}
					>
						<p className={`${styles.ItemDetailDescription}`}>
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Facilis earum atque reprehenderit! Temporibus,
							voluptatum. Necessitatibus, nam molestias aperiam
							laboriosam sit aliquam nobis sunt facilis unde
							dolores? Saepe quasi minima accusantium? Eveniet
							voluptatem quia corporis quae hic vitae? Consequatur
							totam eum nam a porro fuga voluptas doloremque, quo
							adipisci earum debitis veniam necessitatibus ut
							laboriosam animi quod tempora accusamus odio
							accusantium. Quasi, sunt. Numquam asperiores aperiam
							provident exercitationem omnis, et obcaecati
							dignissimos ut ipsa itaque? Soluta ad, eius tempora
							totam eveniet consequatur ullam, nisi quidem ipsam
							eligendi fugit, quisquam illum ipsum! Maiores
							corporis optio, quod molestiae enim modi adipisci
							aliquid aut corrupti temporibus qui perferendis
							blanditiis eveniet in unde velit quo laborum
							voluptates assumenda at. Voluptates magnam aut
							tenetur consequuntur explicabo. Eaque fuga quae
							quidem sequi, tempora quo illo maiores quibusdam
							dolores voluptas et aut, odio molestias officia
							beatae unde quaerat libero adipisci soluta
							exercitationem ducimus inventore similique.
							Dignissimos, dolorem animi. Repudiandae facere
							laboriosam aliquid corporis magnam non alias
							cupiditate voluptates eius id, animi assumenda.
							Dolorem nesciunt, maiores laborum laboriosam
							deserunt obcaecati aliquam nostrum, magni saepe
							earum, libero maxime! Reiciendis, nisi. Quas porro,
							aperiam totam quisquam repellendus esse! Veniam enim
							recusandae a natus autem deserunt velit, suscipit
							illum, minima laborum eaque. Veniam sequi a cum
							voluptate expedita quisquam reiciendis quod modi.
							Modi molestias error accusamus recusandae neque
							culpa corrupti facere optio porro repudiandae, enim
							inventore laboriosam nesciunt nobis aut voluptas
							placeat incidunt? Ab alias eligendi consectetur
							repellendus rerum molestias assumenda illo. Ex omnis
							temporibus nemo impedit! Qui odio tempore fuga
							adipisci nemo in, placeat quas animi ad quidem
							laudantium omnis? Esse quas voluptates quod
							accusamus tempore repellat quisquam quam at cumque.
							Expedita culpa facere deleniti nostrum hic! Voluptas
							quia porro maxime. Rerum eveniet nostrum distinctio
							architecto asperiores quo nulla at nam quas! Ad
							commodi aut impedit delectus pariatur ut excepturi
							veniam.
						</p>
					</div>
					<button
						className={`${styles.ItemDetailReadMoreButton}`}
					>
						{t('Читати далі')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ItemDetail
