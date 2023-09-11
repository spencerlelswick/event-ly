export default async function latLngToAddress(lat, lon) {
  const API_KEY = import.meta.env.VITE_GEOCODE_API;

  try {
    // BING API URL
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${lat},${lon}?o=json&key=${API_KEY}`;
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.resourceSets[0].estimatedTotal){
      return data.resourceSets[0].resources[0]
    }else{
      return false
    }
  } catch (error) {
    console.log(error);
  }
}