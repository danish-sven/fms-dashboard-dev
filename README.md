# Interactive Map Application

This repository contains an interactive mapping application built using React and Mapbox GL JS. The application displays data for parks in Sydney, Australia and moving vehicles.

## Features

- Interactive map with zoom and pan features.
- Dynamic markers on the map representing parks and vehicles.
- Popups with detailed information for each park and vehicle on hover.
- On vehicle marker click, popup remains visible.
- Map view initially fitted to the bounding box of the vehicle data.

## Installation

Before you begin, make sure you have [Node.js](https://nodejs.org/) and npm installed on your system.

1. Clone the repository:

```bash
git clone https://github.com/your-repo-link 
```

2. Navigate into the cloned repository

3. Install the dependencies:
```bash
npm install
```

4. Create a .env file in the root of your project and add your Mapbox access token:
```bash
REACT_APP_MAPBOX_TOKEN=your_mapbox_access_token_here
```

5. Start the app:
```bash
npm start
```

The application will be available on http://localhost:3000.

## Data Sources
The application uses two main data sources:

1. sydney-parks.json: Contains geospatial data for parks in Sydney.
2. vehicleData.json: Contains data for moving vehicles, including their status, home, and current coordinates.