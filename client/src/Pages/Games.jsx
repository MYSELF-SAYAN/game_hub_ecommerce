import React,{useEffect,useState} from 'react';
import Navbar from '../Components/Navbar';
import Cards from '../Components/Cards';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Games = () => {
    const {id} = useParams();
    console.log(id)
    const [games, setGames] = useState([]);
    const getGames = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/games?key=45f59e1704f8461689b89fa64f35877b&page_size=50&genres=${id}&ordering=-rating&platforms=187,4,1,18,186,7`
        );
        setGames(res.data.results);
      } catch (error) {
        console.error("Error fetching action data:", error);
      }
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          await getGames();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>
      <Navbar/>
      <div className='pt-[80px] p-10'>
        <h1 className='text-5xl mb-5 sm:text-2xl md:text-3xl' style={{fontFamily:"Brolimo"}}>All {id} Games</h1>
        <div className='flex justify-center'>
        <div className='grid grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2'>
        {games.map((item) => (
            <Link to= {`/description/${item.id}`}>
            <Cards data={item} />
            </Link>
                  
               
              ))}
           
        
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default Games;
