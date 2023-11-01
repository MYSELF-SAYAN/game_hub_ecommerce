import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { FaGlobeAsia } from "react-icons/fa";
import { ImReddit } from "react-icons/im";
import "@splidejs/react-splide/css";
import { Rate } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Description = () => {
  const [game, setGame] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const[added,setAdded]=useState(false)
  const data = useSelector((state) => state.auth);
  const { id } = useParams();
  const rand = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  const getData = async () => {
    const res = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=45f59e1704f8461689b89fa64f35877b`
    );
    console.log("game data", res.data);
    setGame(res.data);
  };
  const getScreenshots = async () => {
    const res = await axios.get(
      `https://api.rawg.io/api/games/${id}/screenshots?key=45f59e1704f8461689b89fa64f35877b`
    );
    console.log("game Screenshots", res.data.results);
    setScreenshots(res.data.results);
  };
  const addCart = async (name,price) => {
    try {
      const res = await axios.post(`/cart/${data.id}`, {
        name: name,
        price: price,
      });
      if (res.status === 200) {
        setAdded(true)
        console.log("added to cart");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setWishlist = async () => {
    try {
      
      const res = await axios.post(`/wishlist/${data.id}`, {
        name: game.name,
        price: rand,
      });
      if (res.status === 200) {
        console.log("added to wishlist");
        setWishlisted(true);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsloading(true);
    getData();
    getScreenshots();
    setIsloading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-[80px] p-10 ">
        <div className="mb-10 px-24">
          <h1
            className="text-5xl mb-3 flex flex-wrap"
            style={{ fontFamily: "Brolimo" }}
          >
            {game.name}
          </h1>
          <div className="flex items-center ">
            <Rate disabled defaultValue={game.rating} />
            <h1 className="text-2xl ml-5">{game.rating}</h1>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">
            <div className="flex items-center justify-center ">
              <Splide
                className="max-h-[60rem] max-w-[80%]"
                options={{
                  type: "loop",
                  autoplay: "play",
                  interval: 3000,
                  pauseOnHover: false,
                  arrows: true,
                  pagination: true,
                }}
              >
                {screenshots.map((item) => {
                  return (
                    <SplideSlide>
                      <img
                        src={item.image}
                        className="max-h-full max-w-full"
                        alt=""
                      />
                    </SplideSlide>
                  );
                })}
              </Splide>
            </div>
            <p className="text-lg px-24 mt-5" style={{ fontFamily: "Brolimo" }}>
              {game.description_raw}
            </p>
            <div className="flex px-24 mt-5">
              <div className="flex flex-col w-1/2 border-l-2 border-gray-700 pl-5">
                <h1 className="text-gray-300 text-2xl mb-3">Genres</h1>
                <ul className="flex gap-2 flex-wrap">
                  {game.genres?.map((item) => {
                    return (
                      <li className="px-3 py-2 rounded-3xl bg-slate-800">
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-col w-1/2 border-l-2 border-gray-700 pl-5">
                <h1 className="text-gray-300 text-2xl mb-3">Features</h1>
                <ul className="flex gap-2 flex-wrap">
                  {game.tags?.map((item) => {
                    return (
                      <li className="px-3 py-2 rounded-3xl bg-slate-800">
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="px-24 mt-5">
              <h1 className="text-5xl mb-3">Official Links</h1>
              <div className="w-full h-20 bg-gray-800 flex justify-center items-center text-5xl">
                <Link to={game.website}>
                  <FaGlobeAsia className="mx-5 cursor-pointer" />
                </Link>
                <Link to={game.reddit_url}>
                  <ImReddit className="mx-5 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
          <div className="min-w-[400px] max-w-[400px]  p-5">
            <div className="flex items-center justify-center mb-3">
              <img
                src={game.background_image}
                alt=""
                className="w-[200px] h-[200px] rounded-2xl"
              />
            </div>

            <p
              className="bg-[#202020] p-2  w-[7rem] text-sm text-center mb-3"
              style={{ fontFamily: "Brolimo" }}
            >
              BASE GAME
            </p>
            <p className="text-xl mb-3">₹{rand}</p>
            <div className="flex flex-col">
            
              <button className={`h-10 w-full border-[1px] ${added ? "bg-white text-black" : "bg-black text-white"} border-white rounded-lg text-lg mb-3`} onClick={()=>{addCart(game.name,rand)}} disabled={added ? true : false}>
                 {added ? "Added to cart" : "ADD TO CART"}
              </button>
              <button
                className={`h-8 w-full border-[1px] ${
                  wishlisted ? "bg-white text-black" : "bg-black text-white"
                } border-white rounded-lg text-lg mb-3`}
                disabled={wishlisted ? true : false}
                onClick={() => setWishlist()}
              >
                {wishlisted ? "Added to wishlist" : "ADD TO WISHLIST"}
              </button>
            </div>
            <ul>
              <li>
                <div className="flex justify-between text-xl pb-3 border-b-2 border-[#616161] mb-2">
                  <p>Developer</p>
                  <p>
                    {game.developers &&
                      game.developers[0] &&
                      game.developers[0].name}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex justify-between text-xl pb-3 border-b-2 border-[#616161] mb-2">
                  <p>Publishers</p>
                  <p>
                    {game.publishers &&
                      game.publishers[0] &&
                      game.publishers[0].name}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
