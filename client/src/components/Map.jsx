import React, { useEffect, useState } from 'react';
import MapPin from './MapPin';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { localityData } from '../mock/data';

let lastPan = [0, 0];

const Map = ({ setCoordinates, eventsList, point, setPoint, pannedEvent }) => {
  const [locality, setLocality] = useState(null);
  const [mapUpdate, setMapUpdate] = useState(false);
  const API_KEY = import.meta.env.VITE_GEOCODE_API;

  function MapCtrl() {
    const map = useMap();

    map.on('moveend', function () {
      const currView = map.getCenter();

      const currLocality = getViewArea(currView.lat, currView.lng);

      setCoordinates([currView.lat, currView.lng]);
    });

    return null;
  }

  function UserPin() {
    const map = useMap();

    map.on('click', function (e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      // setPoint([lat, lng]);
      setPoint([lat, lng]);
    });

    map.on('contextmenu', function (e) {
      setPoint(null);
    });

    return <>{point && <Marker id='user-pin' position={point}></Marker>}</>;
  }

  function MapPanner() {
    const map = useMap();
    if (pannedEvent && pannedEvent[0] !== lastPan[0]) {
      lastPan = [...pannedEvent];
      map.flyTo(pannedEvent, 18, {
        animate: true,
        duration: 2,
      });
    }

    return null;
  }

  async function getViewArea(lat, lon) {
    try {
      // BING API URL
      const url = `http://dev.virtualearth.net/REST/v1/Locations/${lat},${lon}?o=json&key=${API_KEY}`;

      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      // const response = await fetch(url, options);
      // const data = await response.json();
      const data = localityData;

      if (data?.resourceSets[0]?.resources[0]?.address?.locality) {
        const city = data?.resourceSets[0]?.resources[0]?.address.locality;
        const state =
          data?.resourceSets[0]?.resources[0]?.address.adminDistrict;
        setLocality(`${city}, ${state}`);
      } else {
        console.log('Could not update locality');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MapContainer
      className='flex justify-center items-center h-full'
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      center={[38.21363852151677, -85.58345588638122]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <MapCtrl />
      <UserPin />
      <MapPanner />
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {eventsList !== null ? (
        <>
          {eventsList.map((event) => (
            <MapPin event={event} key={event._id} />
          ))}
        </>
      ) : null}
    </MapContainer>
  );
};

export default Map;
