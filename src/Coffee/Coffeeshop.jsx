import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import spe from './imgs/esp.jpg';
import tea from './imgs/tea.jpg';
import maggi from './imgs/maggi.jpg';
import burger from './imgs/burger.jpg';
import fries from './imgs/French_fries.jpg';
import wich from './imgs/sandwich.jpg';
import momo from './imgs/momo.jpg';
import momo2 from './imgs/chi_momo.jpg';
import cake from './imgs/cakes.jpg';
import cookies from './imgs/cookies.jpg';
import ban from './imgs/ban.jpg';
import bur from './imgs/bur.jpg'
import "./styles.css";

const products = [
  { id: 1, name: "Tea", price: 30,image:tea},
  { id: 2, name: "Coffee", price: 60, image:spe},
  { id: 3, name: "Maggi", price: 50,image:maggi },
  { id: 4, name: "Veg Burger", price: 60,image:burger },
  { id: 5, name: "Chicken Burger", price: 80,image:bur},
  { id: 6, name: "French fries", price: 60,image:fries}
];

const sandwich = [
  { id: 7, name: "Sandwich", price: 70,image:wich},
  { id: 8, name: "Veg Momos", price: 50,image:momo},
  { id: 9, name: "Chicken Momos", price: 70 ,image:momo2},
  { id: 10, name: "Cookies", price: 10,image:cookies },
  { id: 11, name: "Cakes", price: 30,image:cake},
  { id: 12, name: "Ban Butter Jum", price: 30,image:ban}
];

export default function CoffeeShop() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== product.id));
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (cart.length > 0) {
      setShowPopup(true);
      setCart([]);
      setTimeout(() => setShowPopup(false), 3000);
    }
    else{
      alert("There is no Item Add Item")
    }
  };

  return (
    <div className="container">
      <h1 className="title">🍔Welcome to Dev Coffee☕</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h2>{product.name}</h2>
            <img src= {product.image} alt={product.name} className="product-image"/>
            <p>Rs:{product.price}</p>
            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="products">
        {sandwich.map((product) => (
          <div key={product.id} className="card">
            <h2>{product.name}</h2>
            <img src= {product.image} alt={product.name} className="product-image"/>
            <p>Rs:{product.price}</p>
            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name} - ${item.price} x {item.quantity}</span>
                <div className="cart-buttons">
                  <button onClick={() => removeFromCart(item)}><Minus size={16} /></button>
                  <button onClick={() => addToCart(item)}><Plus size={16} /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="total">Total: Rs{total.toFixed(2)}</p>
        <button className="checkout-button" onClick={placeOrder}>
          <ShoppingCart className="icon" /> Checkout
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you ❤ for your purchase🎉.</p>
          </div>
        </div>
      )}
    </div>
  );
}
