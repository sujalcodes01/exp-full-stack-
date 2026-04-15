import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* 🔥 Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <h3 className="text-white">🛒 My Store</h3>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4 fw-bold">Product List</h2>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        )}

        <div className="row">
          {products.map((p, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body text-center">
                  <h5 className="fw-bold">{p.name}</h5>
                  <p className="text-success fs-5">₹ {p.price}</p>

                  {/* Buttons */}
                  <button className="btn btn-primary me-2">Buy</button>
                  <button className="btn btn-outline-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-4">
        © 2026 My Store
      </footer>
    </div>
  );
}

export default App;