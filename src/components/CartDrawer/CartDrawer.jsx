import React from "react";

const CartDrawer = ({ cartItems = [], onClose }) => {
  // Ensure cartItems is always an array
  const totalPrice = cartItems.length > 0 
    ? cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0) 
    : 0;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">🛒 Your Cart</h2>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          ✖
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">{item.name || "Unknown Product"}</h3>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 1} × ${item.price || 0}
                </p>
              </div>
              <span className="font-bold">
                ${(item.price || 0) * (item.quantity || 1)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t pt-4">
        <div className="flex justify-between font-bold mb-4">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;
