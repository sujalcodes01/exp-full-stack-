import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "./redux/cartSlice";

import "./App.css";

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState("");

  const products = [
    { id: 1, name: "Smartphone", price: 299.99 },
    { id: 2, name: "Tablet", price: 449.99 },
    { id: 3, name: "Smartwatch", price: 199.99 },
  ];

  const handleAdd = () => {
    const product = products.find((p) => p.id === Number(selectedProduct));
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1>Cart</h1>

      {/* 🔽 Dropdown + Add Button */}
      <div className="buttons">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button onClick={handleAdd}>Add to Cart</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>

              <td>${item.price}</td>

              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Number(e.target.value),
                      })
                    )
                  }
                />
              </td>

              <td>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      <h2 className="total">Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default App;