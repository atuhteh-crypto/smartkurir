import { DEPOK_VIEWBOX } from "../constants/depok";

/** Haversine distance (meter) */
export function distanceMeters(a, b) {
  if (!a || !b) return Infinity;
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad((b.lat ?? b.latitude) - (a.lat ?? a.latitude));
  const dLon = toRad((b.lon ?? b.longitude) - (a.lon ?? a.longitude));
  const lat1 = toRad(a.lat ?? a.latitude);
  const lat2 = toRad(b.lat ?? b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Cek apakah koordinat dalam Depok */
export function inDepokBBox(lat, lon) {
  return (
    lon >= DEPOK_VIEWBOX.minLon &&
    lon <= DEPOK_VIEWBOX.maxLon &&
    lat >= DEPOK_VIEWBOX.minLat &&
    lat <= DEPOK_VIEWBOX.maxLat
  );
}

/** Geocoding Nominatim khusus Depok */
export async function geocodeDepok(query) {
  const q =
    /depok/i.test(query) || /jawa barat/i.test(query)
      ? query
      : `${query}, Depok, Jawa Barat`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    q
  )}&bounded=1&viewbox=${DEPOK_VIEWBOX.minLon},${DEPOK_VIEWBOX.maxLat},${DEPOK_VIEWBOX.maxLon},${DEPOK_VIEWBOX.minLat}&addressdetails=1&limit=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": "KurirHelper/1.0 (edu)" },
  });
  const data = await res.json();
  if (!data?.length) return null;

  const item = data[0];
  const lat = parseFloat(item.lat);
  const lon = parseFloat(item.lon);
  if (!inDepokBBox(lat, lon)) return null;

  return { lat, lon, label: item.display_name || q };
}
