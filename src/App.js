import { Routes,Route} from "react-router-dom";
import Home from "./screens/Home.js";
import Login from "./screens/Login.js";
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./screens/MyOrder.js";



function App() {
  return (
    <div className="fs-1">
      <CartProvider>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login"  element={<Login />}/>
          <Route path="/createuser" element={<Signup/>}/>
          <Route path="/myOrder" element={<MyOrder />}/>
  
        </Routes>
      </CartProvider>
      
    </div>
  );
}

export default App;
