import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './MovieApp.css'; // Importa los estilos CSS

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(""); 

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
        with_genres: selectedGenre 
      },
    });
    setMovies(results);
    setMovie(results[0]);
    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    if (data.videos && data.videos.results && data.videos.results.length > 0) {
      setTrailer(data.videos.results[0]); // Establece el primer video de la lista como el trailer
    } else {
      setTrailer(null); // No hay trailer disponible
    }
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (selectedGenre) { // Actualizar películas cuando se cambie el género seleccionado
      fetchMovies();
    }
  }, [selectedGenre]);  

  return (
    <div className="container-fluid">
      <div className="row-md-4">
        <div className="col ">
          <h3>CATEGORIAS</h3>
          <button className="genre-button" onClick={() => setSelectedGenre("28")}>Action</button>
              <button className="genre-button" onClick={() => setSelectedGenre("12")}>Adventure</button>
              <button className="genre-button" onClick={() => setSelectedGenre("16")}>Animation</button>
              <button className="genre-button" onClick={() => setSelectedGenre("35")}>Comedy</button>
              <button className="genre-button" onClick={() => setSelectedGenre("80")}>Crime</button>
              <button className="genre-button" onClick={() => setSelectedGenre("99")}>Documentary</button>
              <button className="genre-button" onClick={() => setSelectedGenre("18")}>Drama</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10751")}>Family</button>
              <button className="genre-button" onClick={() => setSelectedGenre("14")}>Fantasy</button>
              <button className="genre-button" onClick={() => setSelectedGenre("36")}>History</button>
              <button className="genre-button" onClick={() => setSelectedGenre("27")}>Horror</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10402")}>Music</button>
              <button className="genre-button" onClick={() => setSelectedGenre("9648")}>Mystery</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10749")}>Romance</button>
              <button className="genre-button" onClick={() => setSelectedGenre("878")}>Science Fiction</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10770")}>TV Movie</button>
              <button className="genre-button" onClick={() => setSelectedGenre("53")}>Thriller</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10752")}>War</button>
              <button className="genre-button" onClick={() => setSelectedGenre("37")}>Western</button>
              <h4>TV Shows</h4>
              <button className="genre-button" onClick={() => setSelectedGenre("10759")}>Action & Adventure</button>
              <button className="genre-button" onClick={() => setSelectedGenre("16")}>Animation</button>
              <button className="genre-button" onClick={() => setSelectedGenre("35")}>Comedy</button>
              <button className="genre-button" onClick={() => setSelectedGenre("80")}>Crime</button>
              <button className="genre-button" onClick={() => setSelectedGenre("99")}>Documentary</button>
              <button className="genre-button" onClick={() => setSelectedGenre("18")}>Drama</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10751")}>Family</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10762")}>Kids</button>
              <button className="genre-button" onClick={() => setSelectedGenre("9648")}>Mystery</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10763")}>News</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10764")}>Reality</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10765")}>Sci-Fi & Fantasy</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10766")}>Soap</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10767")}>Talk</button>
              <button className="genre-button" onClick={() => setSelectedGenre("10768")}>War & Politics</button>
              <button className="genre-button" onClick={() => setSelectedGenre("37")}>Western</button>
            </div>
        <div className="col-md-15">
         
          <form className="container mb-4" onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </form>
          <main>
            {movie && (
              <div
                className="viewtrailer"
                style={{
                  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                }}
              >
                {playing ? (
                  <>
                    <YouTube
                      videoId={trailer ? trailer.key : ""}
                      className="reproductor container"
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)} className="boton">
                      Close
                    </button>
                  </>
                ) : (
                  <div className="container">
                    <div className="">
                      {trailer ? (
                        <button
                          className="boton"
                          onClick={() => setPlaying(true)}
                          type="button"
                        >
                          Play Trailer
                        </button>
                      ) : (
                        "Sorry, no trailer available"
                      )}
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
          <div className="container mt-3">
            <div className="row">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="col-md-4 mb-3"
                  onClick={() => selectMovie(movie)}
                >
                  <img
                    src={`${URL_IMAGE + movie.poster_path}`}
                    alt=""
                    height={600}
                    width="100%"
                  />
                  <h4 className="text-center">{movie.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
