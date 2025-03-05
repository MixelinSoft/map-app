const filterPlaces = (placesArr, filtersObj) => {
  return placesArr.filter((place) => {
    return filtersObj[place.type]
  })
}

export default filterPlaces
