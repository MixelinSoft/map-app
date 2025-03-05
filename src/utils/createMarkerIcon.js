import L from 'leaflet'
import placeIcon from '@/assets/icons/place-icon.svg'
import peopleIcon from '@/assets/icons/people-icon.svg'

const createMarkerIcon = (type, id, nearestPeoples, activeMarker, name) => {
  // Check if the marker should be highlighted
  const isHighlighted =
    (type === 'people' &&
      nearestPeoples.length > 0 &&
      nearestPeoples.some((people) => people.id === id)) ||
    (type === 'place' && activeMarker?.id === id)

  // Create Leaflet Custom Icon
  return L.divIcon({
    className: 'custom-icon',
    html: `
    <div class="marker-container ${isHighlighted ? 'highlighted-marker' : ''}" >
      <div class="marker marker-${type} ">
        <div class="marker-dot">
          <!-- Dynamically set the icon based on the type (place or people) -->
          <img class="marker-icon" src="${type === 'place' ? placeIcon : peopleIcon}" alt="${type} icon" />
        </div>
      </div>
      <div class="marker-name">${name}</div>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

export default createMarkerIcon
