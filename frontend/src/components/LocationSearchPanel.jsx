import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "132 Ground Floor, Isro Road",
    "456 Second Floor, MG Road",
    "789 Third Floor, Brigade Road",
    "101 First Floor, Indiranagar",
  ];
  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            key={index}
            className="flex border-2 p-3 rounded-xl border-gray-100 active:border-black items-center justify-start my-2 gap-4"
          >
            <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
