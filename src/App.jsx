import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router-dom'

import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import Home from './pages/Home/index.jsx';
import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";
import Type from "./pages/Type";
import Types from "./pages/Types";



function App() {

  const HeaderLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )
  }

  return (
    <>
     <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<HeaderLayout/>}>
              <Route path="/pokemon/:name" element={<Pokemon />} />
              <Route path="/type/:element" element={<Type />} />
              <Route path="/pokemons" element={<Pokemons />} />
              <Route path="/types" element={<Types />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
