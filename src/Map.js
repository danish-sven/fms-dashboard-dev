// Import necessary libraries
import React, { useRef, useEffect, useState } from 'react'; // React libraries
import mapboxgl from 'mapbox-gl'; // Mapbox GL JS library

// Import data sources
import parksData from './sydney-parks.json'; // Parks data JSON
import vehicleData from './vehicleData.json'; // Vehicle data JSON

// Import CSS
import './Map.css';

// Set Mapbox token 
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlZmFuZHMiLCJhIjoiY2xpbDhieGVsMDJ6cDNkcnRlZHd1Mm9oMCJ9.e2hVvAkDhSwaGmT9jCl83w';

// Main functional component
export default function App() {

  // Use a React ref to manage the map container DOM element and keep the map object
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Use React useState to manage the map's popup state
  const [popup, setPopup] = useState(null);

  // Calculate the bounding box of the vehicles data to set the map's initial view
  const minLat = Math.min(...vehicleData.map(data => data.lat));
  const maxLat = Math.max(...vehicleData.map(data => data.lat));
  const minLon = Math.min(...vehicleData.map(data => data.lon));
  const maxLon = Math.max(...vehicleData.map(data => data.lon));

  // Bounding box, in [minLon, minLat], [maxLon, maxLat] format
  const boundingBox = [[minLon, minLat], [maxLon, maxLat]];

  // On component mount, initialize the map
  useEffect(() => {
    // If the map is already initialized, return out
    if (map.current) return;

    // Create a new map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // Container element
      style: 'mapbox://styles/mapbox/streets-v12', // Map style
      interactive: true // Enables map interactivity
    });

    // Once the map has loaded...
    map.current.on('load', () => {
      // Set the map's bounds to the vehicle data bounding box with a little padding
      map.current.fitBounds(boundingBox, { padding: 20 });

      // For each park in the parks data...
      parksData.features.forEach((park) => {
        // Create a DOM element for the park marker
        const parkEl = document.createElement('div');
        parkEl.className = 'marker';

        // Create a popup for the park marker with park's name and description
        const parkPopup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <h3>${park.properties.title}</h3>
            <p>${park.properties.description}</p>
          `);

        // Create and add the park marker to the map
        new mapboxgl.Marker()
          .setLngLat(park.geometry.coordinates)
          .setPopup(parkPopup)
          .addTo(map.current);
        
        // Add event listeners to show and hide the popup
        parkEl.addEventListener('mouseenter', () => parkPopup.addTo(map.current));
        parkEl.addEventListener('mouseleave', () => parkPopup.remove());
      });

      // For each vehicle in the vehicles data...
      vehicleData.forEach(vehicle => {
        // Create a DOM element for the vehicle marker
        var el = document.createElement('div');
        el.className = 'marker ' + vehicle.status;

        // Create a popup for the vehicle marker with vehicle's information
        const vehiclePopup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <h3>${vehicle.ZID}</h3>
            <p>Status: ${vehicle.status}</p>
            <p>Home: ${vehicle.home}</p>
          `);

        // Create and add the vehicle marker to the map
        var marker = new mapboxgl.Marker(el)
          .setLngLat([vehicle.lon, vehicle.lat])
          .setPopup(vehiclePopup)
          .addTo(map.current);

        // Add event listeners to show and hide the popup and set the popup state
        el.addEventListener('mouseenter', () => vehiclePopup.addTo(map.current));
        el.addEventListener('mouseleave', () => {
          if (popup !== vehiclePopup) {
            vehiclePopup.remove();
          }
        });
        el.addEventListener('click', () => {
          if (popup) {
            popup.remove();
          }
          setPopup(vehiclePopup);
        });
      });
    });

    // Cleanup on component unmount
    return () => map.current.remove();
  }, []);

  // Render the map container
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
