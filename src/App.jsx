import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// import of the pages
import Home from './pages/Home';
import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";
import Type from "./pages/Type";
import Types from "./pages/Types";

// import of my components
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'


function App() {


  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<Pokemon />} />
            <Route path="/type/:element" element={<Type />} />
            <Route path="/pokemons" element={<Pokemons />} />
            <Route path="/types" element={<Types />} />
          </Routes>
        </main>
        <footer>
        <Footer/>
        </footer>
      </div>
    </Router>
    </>
  )
}

export default App
