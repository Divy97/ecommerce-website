import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    // const { cart } = ;
    setCart(await commerce.cart.add(productId, quantity));
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    // const { cart } = ;
    setCart(await commerce.cart.update(productId, { quantity }));
  };

  const handleRemoveFromCart = async (productId) => {
    // const { cart } = ;
    setCart(await commerce.cart.remove(productId));
  };

  const handleEmptyCart = async () => {
    // const { cart } = ;
    setCart(await commerce.cart.empty());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("PRODUCTS", products);
  console.log("CART", cart);

  return (
    <>
      <Router>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleEmptyCart={handleEmptyCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Route>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
