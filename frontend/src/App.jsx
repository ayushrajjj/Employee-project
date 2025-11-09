import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

// ✅ Import toastify
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<AddEmployee />} />

        </Routes>

        {/* ✅ Toast setup at bottom-right corner */}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          transition={Slide}
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
