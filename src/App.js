// import logo from './logo.svg';
import './App.css';
import Meme from './component/meme.js'
import ShowMeme from './component/ShowMeme.js'
import { BrowserRouter, Route } from "react-router-dom"
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <h1>X-MayMay</h1>
      
      <img src="jethiya.jpg" id="jeth"/>
     <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={ShowMeme} />
        <Route exact path="/post" component={Meme} />
      </BrowserRouter>
  </div>    
    
  );
}

export default App;
