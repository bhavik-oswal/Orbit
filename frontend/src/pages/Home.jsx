import React, { useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  useGSAP(function() {
    if(panelOpen) {
      gsap.to(panelRef.current, {
      height: '70%',
      padding: 24,
      // opacity: 1,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(panelRef.current, {
      height: '0%',
      // opacity: 0,
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panelOpen]);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  useGSAP(function () {
    if(vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
      transform: 'translateY(100%)',
      });
    }
  }, [vehiclePanelOpen]);

  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  useGSAP(function () {
    if(confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePanel]);

  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  useGSAP(function () {
    if(vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehicleFound]);

  const WaitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  useGSAP(function () {
    if(waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [waitingForDriver]);

  
  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <h2 className="w-16 absolute left-5 top-5 text-xl font-bold">Orbit</h2>

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://si.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt="map"
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-6 relative">
          <h5 ref={panelCloseRef} onClick={() => {setPanelOpen(false)}} className="absolute opacity-0 right-6 top-6 text-2xl"><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => {submitHandler(e)}}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white overflow-hidden">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
        <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10">
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
        <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6">
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>
        <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6">
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div ref={WaitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-6">
          <WaitingForDriver setConfirmRidePanel={setConfirmRidePanel} setWaitingForDriver={setWaitingForDriver} />
        </div>
      </div>
    </div>
  );
};

export default Home;
