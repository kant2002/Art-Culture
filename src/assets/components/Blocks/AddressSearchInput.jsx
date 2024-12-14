import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AddressSearch({ onSelect }) {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		let cancelTokenSource

		const fetchData = async () => {
			if (query.length < 3) {
				setResults([])
				return
			}
			setLoading(true)
			cancelTokenSource = axios.CancelToken.source()
			try {
				const response = await axios.get('/api/geo', {
					params: { q: query },
					cancelToken: cancelTokenSource.token,
				})
				setResults(response.data || [])
			} catch (error) {
				if (!axios.isCancel(error)) {
					console.error('Error fetching data:', error)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchData()

		return () => {
			if (cancelTokenSource) {
				cancelTokenSource.cancel()
			}
		}
	}, [query])

	const handleSelect = (item) => {
		const lat = item.lat
		const lon = item.lon
		const displayName = item.display_name

		if (onSelect) {
			onSelect({ lat, lon, address: displayName })
		}
		setQuery(displayName)
		setResults([])
	}

	return (
		<div style={{ position: 'relative' }}>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Пошук Адреси"
				style={{ width: '100%', padding: '8px' }}
			/>
			{loading && <div>Loading...</div>}
			{results.length > 0 && (
				<ul
					style={{
						position: 'absolute',
						background: '#fff',
						listStyleType: 'none',
						margin: 0,
						padding: '8px',
						width: '100%',
						border: '1px solid #ccc',
						zIndex: 1000,
					}}
				>
					{results.map((item, index) => (
						<li
							key={index}
							onClick={() => handleSelect(item)}
							style={{ cursor: 'pointer', padding: '4px' }}
						>
							{item.display_name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default AddressSearch