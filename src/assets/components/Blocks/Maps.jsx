import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, Marker, Popup, TitleLayer } from 'react-leaflet'

function Map({ exhibitions }) {
	const defaultPosition = [50, 10]
	const defaultZoom = 4

	return (
		<MapContainer
			center={defaultPosition}
			zoom={defaultZoom}
			style={{ height: '500px', width: '100%' }}
		>
			<TitleLayer
				attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{exhibitions.map((ex) => {
				if (!ex.latitude || !ex.longitude) return null
				position = [ex.latitude, ex.longitude]
				return (
					<Marker key={ex.id} position={position}>
						<Popup>
							<p>{ex.title_en || ex.title_uk || 'Виставка'}</p>
							<p>
								{ex.address || ex.location_en || ex.location_uk}
							</p>
						</Popup>
					</Marker>
				)
			})}
		</MapContainer>
	)
}
