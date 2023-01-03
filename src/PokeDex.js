import "./App.css";
import { useState, useEffect,createRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import {  NavLink } from "react-router-dom";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

import ReactPDF from "@react-pdf/renderer";

function PokeDex() {
  const ref = createRef();
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
        const sorting = response.data.results.sort((a,b) =>
        a.name.localeCompare(b.name));
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
 // passing value get from API
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
          <h1>Welcome to pokedex !</h1>         
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
                <b><ReactLoading/></b>
              </header>
            </div>
          </>
        ) : (
          <>
           <div className="container">
           <h1>Welcome to pokedex !</h1>  
           <div className="search_filter">
            <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={searched}
            className="search-here"
            />

            <select className="option" value={pokemons.name} onChange={(e) => setSorts(e.target.value)}>
              <option value="default">Default</option>
              <option value="name"> By Name (A-Z)</option>
            </select>
           </div>

           {pokemons.length > 0 && <div>
            {
              pokemons.filter(item => item.name.toLowerCase().includes(search.toLocaleLowerCase()))
              .map((item, index) => {
                return <div key={index} className="container-pokemon" onClick={() => {
                  setPokemonDetail(item); pokedexDetail(item.name)
                }}>

                  
                  <NavLink to={`/pokedex/${item.name}`} style={{textDecoration:"none"}}>
                    <img src={item.sprites} alt='' width="500" weight="300"/>
                    <h6>{item.name}</h6>
                  </NavLink>

                </div>
              })
            }
            </div>
            }
            <div className="page-button">
            <button type="btn" onClick={redirectPrev}>Previous</button>
              <button type="btn" onClick={redirectNext}>Next</button>

            </div>
           </div>
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

            <div ref={ref}>
            <img src={pokemonDetail.sprites.front_default} alt="" />
            <div className="flex" >
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Base Stat</th>
                      <th>Stat Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pokemonDetail.stats.map(({ base_stat, stat }, index) => (
                      <tr key={index}>
                        <td>
                          {base_stat}
                        </td>
                        <td>
                          {stat.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <BarChart width={300} height={200}
                  data={pokemonDetail.stats}
                >
                  <XAxis dataKey={"stat.name"} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={"base_stat"} fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
          </div>

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

          {/* Display detail pokemon
                    
          <div className="container-pokemon">
            
            <div>
              <img src={pokemonDetail.sprites.front_default} alt='' width="200" height="200"/>
            </div>
          <div>
          <h6>{pokemonDetail.species.name}</h6>
          </div>
          </div>
          {
          pokemonDetail.stats.map((item) => {
              return <div>
                <table style={{width:'100%'}}>
                  <tr>
                    <td style={{width:'40%'}}>{item.base_stat}</td>
                    <td style={{width:'40%'}}>{item.effort}</td>
                    <td style={{width:'40%'}}>{item.stat.name}</td>
                  </tr>
                </table>
              </div>
          }
            })
          */}
         <ReactPDF targetRef={ref} filename="pokemon.pdf" x="35">
          {({ toPdf }) => (
              <button className="pdf" onClick={toPdf}>Generate pdf</button>
            )}
          </ReactPDF>


          
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
