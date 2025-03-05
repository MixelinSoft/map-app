import getDistance from './getDistance'

const getNearestPeoples = (placeCoordinates, peoples, numberOfPeoples = 3) => {
  // Add Distance To People Objects
  const distances = peoples.map((people) => ({
    ...people,
    distanseToSelectedPlace: getDistance(
      { lat: people.address.geo.lat, lng: people.address.geo.lng },
      { lat: placeCoordinates[0], lng: placeCoordinates[1] },
    ),
  }))
  // Sort Peoples By Distance
  const nearestThreePeoples = distances
    .sort((a, b) => a.distanseToSelectedPlace - b.distanseToSelectedPlace)
    // Get Nearest Peoples
    .slice(0, numberOfPeoples)
  return nearestThreePeoples
}

export default getNearestPeoples
