import React from 'react';

const Toasty = ({ toggleToast }) => (
  <div className="flex space-x-2 justify-center mt-4">
    <div className="bg-tiffany-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" id="toast" role="alert">
      <div className=" bg-tiffany-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-primary-500 rounded-lg">
        <p className="font-bold text-primary-500">Movement Created!</p>
        <button
          type="button"
          className="button-icon m-0 bg-primary-500 hover:bg-splash-500"
          onClick={() => { toggleToast(); }}
        > Close
        </button>

      </div>
    </div>
  </div>
);

export { Toasty };
