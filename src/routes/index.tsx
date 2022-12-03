import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error"
import Register from "../pages/Register";
import ShowUserDetails from "../pages/Show";
import EditUser from "../pages/Edit";


function RouterApp(){
   return(
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/show/user/:id" element={<ShowUserDetails/>}></Route>
            <Route path="/edit/user/:id" element={<EditUser/>}></Route>
            <Route path="*" element={<Error/>}></Route>
        </Routes>
     </BrowserRouter>
   )
}

export default RouterApp;