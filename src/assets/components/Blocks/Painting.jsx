import PropTypes from 'prop-types'
import TranslatedContent from '@components/Blocks/TranslatedContent'

function Painting({ painting }) {
	return (
		<figure className="article-media__figure">
			<picture>
				<img
					alt=""
					src={painting.images[0].imageUrl}
					loading="lazy"
					width="340"
					height="481"
				/>
			</picture>

			<figcaption className="image__caption">
				<p className="image__caption__piece">
					{painting.author.title}
					<br />
					<em>
						<a href="https://www.tate.org.uk/art/artworks/gleizes-portrait-of-jacques-nayral-t02410">
							<TranslatedContent
								en={painting.title_en}
								uk={painting.title_uk}
							/>
						</a>
					</em>
					(1911)
					<br />
					Tate
				</p>
			</figcaption>
		</figure>
	)
}

Painting.propTypes = {
	painting: PropTypes.object,
}

export default Painting
