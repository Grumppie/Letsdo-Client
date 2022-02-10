import Home from "./pages/Home";
import Update from "./pages/Update";
import Create from "./pages/Create";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes >
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/todos/:todoId" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div >
      <Footer />
    </>
  );
}

export default App;
