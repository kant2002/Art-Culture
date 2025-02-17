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
			<div className={`${styles.ItemDetailLeftContainer}`}>
				<div className={`${styles.ItemDetailTitleWrapper}`}>
					<h1 className={`${styles.ItemDetailTitle}`}>
						Назва картини
					</h1>
				</div>
				<div className={`${styles.ItemDetailDateOfCreationWrapper}`}>
					<p className={`${styles.ItemDetailDateOfCreation}`}>
						Дата створення картини
					</p>
				</div>
				<LikeAndShare className={sliderStyles.LikeAndShareFixed} />
				<div className={`${styles.ItemDetailAboutContainer}`}>
					<div className={`${styles.ItemDetailArtistNameWrapper}`}>
						<p className={`${styles.ItemDetailArtistName}`}>
							Митець&#58;
						</p>
						<p className={`${styles.ItemDetailArtistNameValue}`}>
							Ім'я митця
						</p>
					</div>
					<div className={`${styles.ItemDetailSizeWrapper}`}>
						<p className={`${styles.ItemDetailSize}`}>
							Розмір&#58;
						</p>
						<p className={`${styles.ItemDetailSizeValue}`}>Розмір</p>
					</div>
					<div className={`${styles.ItemDetailStileWrapper}`}>
						<p className={`${styles.ItemDetailStile}`}>
							Стиль&#58;
						</p>
						<p className={`${styles.ItemDetailStileValue}`}>Стиль</p>
					</div>
					<div className={`${styles.ItemDetailOriginalTitleWrapper}`}>
						<p className={`${styles.ItemDetailOriginalTitle}`}>
							Оригінальна назва&#58;
						</p>
						<p className={`${styles.ItemDetailOriginalTitleValue}`}>
							Оригінальна назва
						</p>
					</div>
					<div className={`${styles.ItemDetailTechniqueWrapper}`}>
						<p className={`${styles.ItemDetailTechnique}`}>
							Техніка&#58;
						</p>
						<p className={`${styles.ItemDetailTechniqueValue}`}>Техніка</p>
					</div>
				</div>
			</div>
			<div className={`${styles.ItemDetailRightContainer}`}></div>
		</div>
	)
}

export default ItemDetail
