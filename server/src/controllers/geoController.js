// controllers/geoController.js
import axios from "axios"

export const searchAddress = async (req, res, next) => {
  try {
    const query = req.query.q
    if (!query || query.length < 3) {
      return res.json([]) // Return an empty array if query too short
    }

    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "jsonv2",
          addressdetails: 1,
          limit: 10,
        },
        headers: {
          "User-Agent": "ArtPlayUkraine/1.0 ",
        },
      },
    )

    // Return the data from Nominatim directly to the client
    res.json(response.data)
  } catch (error) {
    console.error("Error fetching address:", error)
    next(error)
  }
}
