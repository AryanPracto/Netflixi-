import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const url="http://localhost:5000"
    const [token,setToken]=useState("");
    const [movieList,setMovieList]=useState([]);

    const fetchAllMovies=async()=>{
        const response=await axios.get(url+"/api/v1/search/movie/allMovies")
        setMovieList(response.data);
    }

    const fetchMoviesByCategory=async(category)=>{
        const respone=await axios.get(url+`/api/v1/search/${category}`);
        setMovieList(respone.data);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchAllMovies();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
            }
        }
        loadData();
    },[]);

    const contextValue={
        movieList,
        token,
        setMovieList,
        setToken,
        url,
        fetchAllMovies,
        fetchMoviesByCategory
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;