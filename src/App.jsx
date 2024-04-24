import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import Home from './pages/Home/index.jsx';
import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";
import Type from "./pages/Type";
import Types from "./pages/Types";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<MainContent />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route path="/type/:element" element={<Type />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/types" element={<Types />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
