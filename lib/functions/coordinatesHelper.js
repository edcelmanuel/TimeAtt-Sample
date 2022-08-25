import * as turf from "@turf/turf"

export const getDistance = (coordinates1, coordinates2) => {
  return turf.distance([coordinates1.lat, coordinates1.lng], [coordinates2.lat, coordinates2.lng], {
    units: "meters",
  })
}
