const filterPlaces = (places, filters) => {
  return places.filter((place) => filters.includes(place.type))
}

export default filterPlaces
