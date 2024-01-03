import React from 'react';

const FeeModal = ({ showFeeModal, setShowFeeModal, feeInput, setFeeInput, confirmFeePayment }) => {
  return (
    showFeeModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black opacity-25 fixed inset-0"></div>
        <div className="z-50 bg-white p-4 rounded-md shadow-lg">
          <div className="flex flex-col items-center">
            <label className="text-lg font-bold mb-2">Enter Fee Amount:</label>
            <input
              type="number"
              value={feeInput}
              onChange={(e) => setFeeInput(e.target.value)}
              className="border border-gray-300 p-2 mb-2 rounded-md"
            />
            <div className="flex justify-center">
              <button
                onClick={confirmFeePayment}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowFeeModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default FeeModal;
