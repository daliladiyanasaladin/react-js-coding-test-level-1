import "./App.css";
import { useState } from "react";
import { NavLink,useHistory } from "react-router-dom";


function Home() {
  const [text, setText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const history = useHistory();
//use the current useState to pass the value ready
  const handleChangeInput = (e) => {
    setText(e.target.value);
    checkReady();
  }
//check validity ready input
  const checkReady = () => {
    const inputReady = text + '!'
    if (inputReady !== "Ready!") {
      setIsReady(false);
    }
     else {
    setIsReady(true);
    setText("");
      
  
  }
  //redirect to next page

  }

  const page = () => {
    history.push('/pokedex');
   
  }

  return (
    <div className="App">
      <header className="App-header">
      <NavLink to="/pokedex">
        <img
          hidden={!isReady}
          src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
          className="App-logo"
          alt="logo"
          style={{ padding: "10px", cursor:"pointer" }}
          onClick={page}
        />
        
        </NavLink>
        <b>
          Requirement: Try to show the hidden image and make it clickable that
          goes to /pokedex when the input below is "Ready!" remember to hide the
          red text away when "Ready!" is in the textbox.
        </b>
        <p>Are you ready to be a pokemon master?</p>
        
        <input type="text" name="name" value={text} onChange={handleChangeInput} />
        {text.length === 0 && !isReady && <span style={{ color: "red" }}>I am not ready yet!</span>}
      </header>
    </div>
  );
}

export default Home;
