import "./App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  const [currentPage, setCurrent] = useState(`https://pokeapi.co/api/v2/pokemon`);
  
  const [prevPage, setPrev] = useState();
  
 //in array bcs to display value in sequence
  const [sorts, setSorts] = useState([]);
  // eslint-disable-next-line 
  const [PokeDetail, setPokeDetail]= useState([]);
  const [nextPage, setNext] = useState();
  // eslint-disable-next-line 
  const {name} = useParams();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

//fetch api
//sort page

  useEffect (() => {
    axios.get(currentPage)
    .then (response => {
      if (sorts === 'name'){
        const sorting = response.data.results.sort((x,y) =>
        x.name.localeCompare(y.name));
        setPokemons(sorting);
        setIsLoading(false);
      }
      else
      {
        setIsLoading(false);
        setPokemons(response.data.results);
        setPrev(response.data.previous);
        setNext(response.data.next);
        
      }
    })
    .catch(error => {
      console.log(error);
    })
  }, [currentPage, sorts])
  
 /*
 const sorting = (e) =>{
  if(e.target.value === "ace"){
    setPokemons([...pokemons].sort((a,b)=> a.name > b.name ? 1 : -1))
  }
  else if (e.target.value ==== "dsd") {
    setPokemons([...pokemons].sort((a,b)=> b.name > a.name ? 1 : -1))
  }

  }
 }*/
  const searched = (event)=> {
    let {value} = event.target;
    setSearch(value);
  }
  function redirectPrev(){
    setCurrent(prevPage);
  }

  function redirectNext(){
    setCurrent(nextPage);
  }
  //passing value get from API
  const pokedexDetail = (name) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      setIsLoading(false);
      setPokemonDetail(response.data);
    })
    .catch(error => {
      console.log(error);
    })
 
  }
  

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>    
        <header className="App-header">
          <b><ReactLoading/></b>

          <div className="container-welcome">
          <h1>Welcome to pokedex !</h1>

          <div className="search-input">
            <input
            className="search-here"
            type="text"
            value={search}
            placeholder="Search Pokemon"
            onChange={searched}
            />
            <select
            value={pokemons.name}
            onChange={(e) =>
            setSorts(e.target.value)}
            >
              <option value="default">default</option>
              <option value="name"> By Name </option>

            </select>
          </div>

          {pokemons.length > 0 && <div>
            {
              pokemons.filter(item => 
                item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                .map((item, index)=> {
                  return <div key={index} className="container-detail" 
                  onClick={() =>{setPokemonDetail(item); pokedexDetail(item.name)}}>
                    <Link to={`/pokedex/${item.name}`}>
                      <img src="item.sprites" alt='' width="50%" height="40%"/>
                      <h4>{item.name}</h4>
                    </Link>

                  </div>
                })
            }</div>
            }
            <div className="page-button">
              <button
              type="btn"
              onClick={redirectPrev}
              >
                Previous
              </button>
              <button
              type="btn"
              onClick={redirectNext}
              >
                Next
              </button>
            </div>
          

          </div>
          
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex, and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>when hover on the list item , change the item color to yellow.</li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>If you do more than expected (E.g redesign the page / create a chat feature at the bottom right). it would be good.</li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Implement loader here</b>
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <b>Implement Pokedex list here</b>
            <b><ReactLoading /></b>
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <li>show the sprites front_default as the pokemon image</li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format
              </li>
              <li>Create a bar chart based on the stats above</li>
              <li>Create a  buttton to download the information generated in this modal as pdf. (images and chart must be included)</li>
            </ul>
          </div>

          
          <div className="container-pokemon">
            
            <div>
              <img src={PokeDetail.sprites.front_default} alt='' width="300" height="300"/>
            </div>
          
          <div>
          <h3>{PokeDetail.species.name}</h3>
          </div>
          </div>
          {
            PokeDetail.stats.map((item) => {
              return <div>
                <table style={{width:'100%'}}>
                  <tr>
                    <td style={{width:'40%'}}>{item.base_stat}</td>
                    <td style={{width:'40%'}}>{item.effort}</td>
                    <td style={{width:'40%'}}>{item.stat.name}</td>
                  </tr>
                </table>
              </div>
            })
          }
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
