import "./App.css";
import { useState, useEffect, createRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Page from "./Page";


function PokeDex() {
  const ref = createRef();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const sortData = (e) => {
    if (e.target.value === "asd") {
      setPokemons([...pokemons].sort((a, b) => a.name > b.name ? 1 : -1))
    }
    else if (e.target.value === "dsd") {
      setPokemons([...pokemons].sort((a, b) => b.name > a.name ? 1 : -1))
    }
  }

  const showModel = async (url) => {
    try {
      setIsLoading(true);
      const result = await axios.get(url);
      const data = await result.data;
      setPokemonDetail(data);
      if (pokemonDetail) setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }


  const getPokedex = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const data = await result.data.results;
      setPokemons(data);
      if (pokemons) setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPokedex();
  }, [])

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
                <ReactLoading />
              </header>
            </div>
          </>
        ) : (
          <>
            <div className="search-sort">
              <input type="search" classname="search-here" placeholder="Search" onChange={e => setQuery(e.target.value)} />
              <select onChange={sortData} name="sort">
               
                <option value="asd">Default</option>
                <option value="dsd">By Name (A-Z)</option>
              </select>
            </div>
            <h1>Welcome to pokedex !</h1>
            <Page className="pagedisplaypokemon"
              
              query={query}
              pageLimit={pokemons.length / 5}
              
              dataLimit={5}
              data={pokemons}

              showModel={showModel}
            />
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail ? true : false}
          contentLabel={pokemonDetail?.name || ""}
          ariaHideApp={false}
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
         
        </Modal>
      )
      }
    </div >
  );
}

export default PokeDex;
