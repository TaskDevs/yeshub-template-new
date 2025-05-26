import React from 'react';
import { Dialog } from '@headlessui/react';

const TransactionDetailsModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="tw-css fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transaction Details - TRX-2023051002</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
          </div>

          {/* Metadata */}
          <div className="text-sm text-gray-600 mb-4">
            <p><span className="font-medium">Transaction ID:</span> TRX-2023051002</p>
            <p><span className="font-medium">Date:</span> May 10, 2025, 15:45 PM</p>
          </div>

          {/* Amount Section */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">Amount</span>
              <span className="text-xl font-bold text-red-600">-$1,800.00</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-1 rounded">Withdrawal</span>
              <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Pending</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Sender:</strong> Alexander Mitchell</div>
              <div><strong>Recipient:</strong> Chase Bank ****4521</div>
              <div><strong>Payment Method:</strong> ACH Transfer</div>
              <div><strong>Reference Number:</strong> REF-20230510-002</div>
              <div><strong>Description:</strong> Withdrawal to Bank Account</div>
              <div><strong>Category:</strong> Bank Withdrawal</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Processing Time:</strong> 1-2 Business Days</div>
              <div><strong>Fee:</strong> $2.50</div>
              <div><strong>Net Amount:</strong> $1,802.50</div>
            </div>
          </div>

          {/* Notes */}
          <div className="text-sm text-gray-600 mb-6">
            <h3 className="font-semibold text-gray-800 mb-1">Notes</h3>
            <p>Standard ACH transfer to linked bank account</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center border-t pt-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm">Report Issue</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm">Print</button>
            </div>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
              Download Receipt
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TransactionDetailsModal;
