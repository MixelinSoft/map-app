import getDistance from './getDistance'

const getNearestPeoples = (placeCoords, peoples, numberOfPeoples = 3) => {
  // Calculate Distance To All Peoples
  const distances = peoples.map((people) => ({
    ...people,
    distanseToSelectedPlace: getDistance(
      { lat: people.address.geo.lat, lng: people.address.geo.lng },
      { lat: placeCoords[0], lng: placeCoords[1] },
    ),
  }))
  // Sort People By Distance, Get Three Nearest
  const nearestThreePeoples = distances
    .sort((a, b) => a.distanseToSelectedPlace - b.distanseToSelectedPlace)
    .slice(0, numberOfPeoples)
  return nearestThreePeoples
}

export default getNearestPeoples
