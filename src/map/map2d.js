/** 지도 영역 플레이스홀더 — 실제 지도는 추후 개발자 연동 */
let mapContainer = null

export function initMap(containerId = 'map-container') {
  const el = document.getElementById(containerId)
  if (!el) return null
  mapContainer = el
  el.style.backgroundColor = '#DDD'
  return el
}

export function getMap() {
  return mapContainer
}

export function zoomIn() {
  // 추후 지도 연동 시 사용
}

export function zoomOut() {
  // 추후 지도 연동 시 사용
}

export function setHomeView() {
  // 추후 지도 연동 시 사용
}
