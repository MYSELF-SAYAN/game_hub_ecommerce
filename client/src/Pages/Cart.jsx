import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { GiTireIronCross } from "react-icons/gi";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState(1);
const navigate=useNavigate()
  const data = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [updatedCart, setUpdatedCart] = useState([]);
  const getCart = async () => {
    try {
      const res = await axios.get(`/cart/${data.id}`);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const increment = async (id) => {
    try {
      const res = await axios.post(`/cart/${data.id}/increase/${id}`);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const decrement = async (id) => {
    try {
      const res = await axios.post(`/cart/${data.id}/decrease/${id}`);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deletecart = async (id) => {
    try {
      await axios.delete(`/cart/${data.id}/${id}/`);
      const res = await axios.get(`/cart/${data.id}`);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const calculate = () => {
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);
  };
const emptyCart=async()=>{
  try {
    const res = await axios.post(`/cart/${data.id}/empty`);
    setCart(res.data);
  } catch (error) {
    console.log(error);
  }
}
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51O7WiuSBmJjg74XUtqNKlViwIgbra9eRrtYXcqjOs9LGi87ED61vbHnHdn2rtsfv0LJti2jNUbPSaWUZovMBULj500aw92ntcO"
    );

    const body = {
      products: cart,
    };
    const res = await axios.post("/payment/create-checkout-session", body);

    if (res.status === 200) {
      const session = await res.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.log(result.error);
        const empty = await axios.post(`/cart/${data.id}/empty`);
      } else {
        
          setUpdatedCart(cart);
          const empty = await axios.post(`/cart/${data.id}/empty`);
          await Promise.all(
            updatedCart.map(async (item) => {
              await axios.post(`/order/${data.id}`, {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              });
            })
          );
       
      }
     
    }
 emptyCart()
  };
  useEffect(() => {
    getCart();
    calculate();
  }, []);

  useEffect(() => {
    calculate();
    console.log(total);
  }, [cart]);

  return (
    <div className="p-10">
      <div className="flex flex-col">
        <GiTireIronCross className="text-2xl mb-3 cursor-pointer" onClick={()=>{navigate(-1)}}/>
        <h1 className="text-2xl mb-2">Cart</h1>
      </div>

      <div>
        <ul className="bg-[#252525] px-3 py-5 min-h-[50vh] max-h-[50vh] overflow-y-scroll rounded-3xl">
          {cart.map((item) => {
            return (
              <li className="flex justify-between mb-3">
                <p className="text-2xl w-1/4">{item.name}</p>
                <p className="text-2xl w-1/4 text-center">₹{item.price}</p>
                <div className="text-2xl flex w-1/4">
                  <button className=" px-2 py-2 rounded-full  bg-white text-black  mx-3">
                    <AiOutlineMinus
                      onClick={() => {
                        decrement(item._id);
                      }}
                    />
                  </button>
                  <p className="text-2xl flex items-center justify-center">
                    {item.quantity}
                  </p>
                  <button className=" px-2 py-2 rounded-full  bg-white text-black  mx-3">
                    <AiOutlinePlus
                      className="font-extrabold"
                      onClick={() => {
                        increment(item._id);
                      }}
                    />
                  </button>
                </div>
                <div className="w-1/4 items-center justify-center flex">
                  <button
                    className=" rounded-2xl py-2 bg-red-700 px-12"
                    onClick={() => {
                      deletecart(item._id);
                    }}
                  >
                    <ImBin />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h1 className="text-2xl mt-3">Price breakdown</h1>
        <div className="p-10">
          <ul>
            <li className="flex justify-between text-2xl my-3">
              <p>Subtotal</p>
              <p>₹{total}</p>
            </li>
            <li className="flex justify-between text-2xl my-3">
              <p>Tax {`(5%)`}</p>
              <p>₹{(total * 5) / 100}</p>
            </li>
            <li className="flex justify-between text-2xl my-3 py-2 border-b-2 border-gray-600 border-t-2">
              <p>Amount payble</p>
              <p>₹{total + (total * 5) / 100}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-700 text-2xl px-10 py-2 rounded-3xl"
          onClick={() => {
            makePayment();
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
