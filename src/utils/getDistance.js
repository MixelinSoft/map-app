const getDistance = (firstPointCoords, secondPointCoords) => {
  //  Earth Radius
  const R = 6371
  const toRad = (deg) => (deg * Math.PI) / 180

  // Haversine Formula
  const dLat = toRad(secondPointCoords.lat - firstPointCoords.lat)
  const dLon = toRad(secondPointCoords.lng - firstPointCoords.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(firstPointCoords.lat)) *
      Math.cos(toRad(secondPointCoords.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default getDistance
