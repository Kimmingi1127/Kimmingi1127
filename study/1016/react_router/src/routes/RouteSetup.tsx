import  {Route, Routes} from "react-router-dom";
import NoMatch from "../pages/NoMatch";
import Home from "../pages/Home";

export default function RouteSetup() {
    return(
        <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "*" element = {<NoMatch />} />
            <Route path = "/welcome" element = {<Home  title="Welcome to our site!"/>} />
        </Routes>
    );
}