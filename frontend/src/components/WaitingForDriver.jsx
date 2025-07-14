import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriverPanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%]"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className='flex items-center justify-between'>
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1714471451/assets/27/362eaf-3e88-4568-a460-29b0da41c285/original/UberX-%281%29.png"
          alt="ride-car"
        />
        <div className='text-right'>
            <h2 className='text-lg font-medium'>ABX</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>KA02 BG 1234</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        </div>
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-1 border-gray-300">
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">Sanky Tank, Bengaluru</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-1 border-gray-300">
                <i className="text-lg ri-map-pin-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm -mt-1 text-gray-600">Sanky Tank, Bengaluru</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3">
                <i className="text-lg ri-currency-line"></i>
                <div>
                    <h3 className="text-lg font-medium">₹193.20</h3>
                    <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingForDriver