import React, { useEffect, useState } from 'react';
import MapPin from './MapPin';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { localityData } from '../mock/data';
import { isFiltered } from '../utilities/category';

let lastPan = [[0, 0], 15];

const Map = ({
  setCoordinates,
  eventsList,
  point,
  setPoint,
  pannedEvent,
  setPannedEvent,
  eventFilter,
}) => {
  const [locality, setLocality] = useState(null);
  const [userLoc, setUserLoc] = useState([
    38.21363852151677, -83.58345588638122,
  ]);
  const API_KEY = import.meta.env.VITE_GEOCODE_API;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLoc([position.coords.latitude, position.coords.longitude]);
      setPannedEvent([
        [position.coords.latitude, position.coords.longitude],
        10,
      ]);
    });
  }, []);

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
    const eventPin = new L.Icon({
      iconUrl: `/assets/event-pin.svg`,
      iconRetinaUrl: `/assets/event-pin.svg`,
      iconAnchor: [32, 60],
      popupAnchor: [0, -60],
      iconSize: [64, 64],
    });

    map.on('click', function (e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      // setPoint([lat, lng]);
      setPoint([lat, lng]);
    });

    map.on('movestart', function (e) {
      setPoint(null);
    });

    map.on('contextmenu', function (e) {
      setPoint(null);
    });

    return (
      <>
        {point && (
          <Marker id='user-pin' icon={eventPin} position={point}></Marker>
        )}
      </>
    );
  }

  function MapPanner() {
    const map = useMap();
    if (pannedEvent && pannedEvent[0][0] !== lastPan[0][0]) {
      lastPan = [[...pannedEvent[0]], 18];

      map.flyTo(pannedEvent[0], pannedEvent[1], {
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
      center={userLoc}
      zoom={12}
      scrollWheelZoom={true}
    >
      <MapCtrl />
      <UserPin />
      <MapPanner />
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {eventsList !== null ? (
        <>
          {eventsList.map((event) =>
            isFiltered(event, eventFilter) ? (
              <MapPin event={event} key={event._id} />
            ) : null
          )}
        </>
      ) : null}
    </MapContainer>
  );
};

export default Map;
