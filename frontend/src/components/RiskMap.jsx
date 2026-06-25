import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle
} from "react-leaflet";

function RiskMap() {

  const locations = [

    {
      city: "Pune",
      lat: 18.5204,
      lng: 73.8567,
      risk: "High"
    },

    {
      city: "Mumbai",
      lat: 19.0760,
      lng: 72.8777,
      risk: "Medium"
    },

    {
      city: "Nashik",
      lat: 19.9975,
      lng: 73.7898,
      risk: "Low"
    }

  ];

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-4">
        Interactive Flood Risk Map
      </h2>

      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={7}
        style={{
          height: "500px",
          width: "100%"
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (

          <div key={loc.city}>

            <Marker
              position={[
                loc.lat,
                loc.lng
              ]}
            >

              <Popup>

                <strong>
                  {loc.city}
                </strong>

                <br />

                Flood Risk:
                {" "}
                {loc.risk}

              </Popup>

            </Marker>

            <Circle
              center={[
                loc.lat,
                loc.lng
              ]}
              radius={10000}
              pathOptions={{
                color:
                  loc.risk === "High"
                    ? "red"
                    : loc.risk === "Medium"
                    ? "orange"
                    : "green"
              }}
            />

          </div>

        ))}

      </MapContainer>

    </div>

  );

}

export default RiskMap;