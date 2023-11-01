import React from "react";
import Navbar from "../Components/Navbar";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../App.css";
import "@splidejs/react-splide/css/core";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "@splidejs/react-splide/css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../Components/Cards";
import { useMediaQuery } from "react-responsive";
import { useNavigate,Link } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [carousel, setCarousel] = useState([]);
  const [action, setAction] = useState([]);
  const [puzzle, setPuzzle] = useState([]);
  const [genres, setGenres] = useState([]);
  const isMid = useMediaQuery({ maxWidth: 766 });
  const [isloading, setIsloading] = useState(true);
  const [added,setAdded]=useState(false)
  const getCarousel = async () => {
    try {
      const res = await axios.get(
        "https://api.rawg.io/api/games?key=45f59e1704f8461689b89fa64f35877b&page_size=10&platforms=187"
      );
      setCarousel(res.data.results);
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    }
  };

  const getAction = async () => {
    try {
      const res = await axios.get(
        "https://api.rawg.io/api/games?key=45f59e1704f8461689b89fa64f35877b&page_size=10&genres=action&dates=2020-01-01,2023-10-01&ordering=-rating&platforms=187"
      );
      setAction(res.data.results);
    } catch (error) {
      console.error("Error fetching action data:", error);
    }
  };
 
  const getPuzzle = async () => {
    try {
      const res = await axios.get(
        "https://api.rawg.io/api/games?key=45f59e1704f8461689b89fa64f35877b&page_size=10&genres=puzzle&dates=2020-01-01,2023-10-01&ordering=-rating&platforms=187"
      );
      setPuzzle(res.data.results);
    } catch (error) {
      console.error("Error fetching action data:", error);
    }
  };
  const getGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.rawg.io/api/genres?key=45f59e1704f8461689b89fa64f35877b&page_size=10"
      );
      setGenres(res.data.results);
    } catch (error) {
      console.error("Error fetching action data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        await getCarousel();
        await getAction();
        await getPuzzle();
        await getGenres();
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsloading(false);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div>
      <Navbar />
      <div className="pt-[80px]">
        <div className="hero px-10">
          <Splide
            className="w-full "
            options={{
              type: "loop",
              autoplay: "play",
              interval: 3000,
              pauseOnHover: false,
              arrows: false,
              pagination: true,
            }}
          >
            {carousel.map((item) => {
              return (
                <SplideSlide className="flex flex-col w-full relative">
                  <div className="hero__slide__image h-[70vh] flex flex-col items-center justify-center w-full relative">
                    <img
                      src={item.background_image}
                      className="object-cover rounded-3xl max-w-full max-h-full"
                      alt="The Witcher 3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent opacity-[65%] rounded-3xl"></div>
                    <div className="hero__slide__content absolute top-[15%] md:w-[40rem] w-[50rem]">
                      <div>
                        <h2
                          className="hero__slide__title text-5xl"
                          style={{ fontFamily: "Brolimo" }}
                        >
                          {item.name}
                        </h2>
                        <p className="hero__slide__description text-lg mt-5 pr-[25rem]">
                          The Witcher 3: Wild Hunt is a 2015 action role-playing
                          game developed and published by Polish developer CD
                          Projekt Red and is based on The Witcher series of
                          fantasy novels by Andrzej Sapkowski.
                        </p>
                        <div className="flex mt-5">
                         <Link to={`/description/${item.id}`}>
                          <button className="flex items-center justify-center w-[8rem] h-[3rem] text-xl bg-white text-black border-2 border-white hover:bg-black hover:text-white rounded-xl">
                          Discover{" "}
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
        <div className="Action mt-5 px-10">
          <div className="flex items-center justify-between text-4xl">
            <h1>Top in action</h1>
          </div>

          {isloading ? (
            <h1>Loading...</h1>
          ) : (
            <Splide
              className="flex items-center justify-center p-12 md:p-20"
              options={
                isMid
                  ? {
                      perPage: 3,
                      type: "loop",
                      autoplay: "play",
                      interval: 5000,
                      pauseOnHover: false,
                      arrows: true,
                      pagination: false,
                    }
                  : {
                      perPage: 4,
                      type: "loop",
                      autoplay: "play",
                      interval: 5000,
                      pauseOnHover: false,
                      arrows: true,
                      pagination: false,
                    }
              }
            >
              {action.map((item) => (
                <SplideSlide key={item.id}>
                  <Cards data={item} />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
        <div className="Puzzle mt-5 px-10">
          <div className="flex items-center justify-between text-4xl">
            <h1>Top in puzzle</h1>
          </div>

          {isloading ? (
            <h1>Loading...</h1>
          ) : (
            <Splide
              className="flex items-center justify-center p-12 md:p-20"
              options={
                isMid
                  ? {
                      perPage: 3,
                      type: "loop",
                      autoplay: "play",
                      interval: 5000,
                      pauseOnHover: false,
                      arrows: true,
                      pagination: false,
                    }
                  : {
                      perPage: 4,
                      type: "loop",
                      autoplay: "play",
                      interval: 5000,
                      pauseOnHover: false,
                      arrows: true,
                      pagination: false,
                    }
              }
            >
              {puzzle.map((item) => (
                <SplideSlide key={item.id}>
                  <Cards data={item} />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
        <div className="Tags p-10 ">
          <div className="flex items-center justify-between mb-5 text-4xl">
            <h1>Get by Genres</h1>
            <Link to="/catagory">
            <h1 className=" underline">See more</h1>
            </Link>
          
          </div>
          {isloading ? (
            <h1>Loading..</h1>
          ) : (
            <div className="grid grid-cols-5  gap-y-5">
              {genres.map((item) => (
                <Link to={`/catagory/${item.slug}`}>
                <div class="h-[8rem] w-[15rem] relative rounded-2xl">
                  <img
                    src={item.image_background}
                    alt=""
                    class="absolute h-full object-cover w-full opacity-60 rounded-2xl"
                  />
                  <h1 class="absolute px-20 py-10 text-white text-3xl ">
                    {item.name}
                  </h1>
                </div>
                </Link>
              ))}
            </div>
        
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
