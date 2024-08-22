import { Outlet, Link } from "react-router-dom";
import '../App.css'
export default function Root(){
    return (
        <>
            <NavigationBar />
            <div class ="pagebody">
                <Outlet />
            </div>
        </>
        
    )
}

function NavigationBar() {
    return (
      <div className="navbar">
        <p style={{color :'white'}}>Luke Bridges' Page</p>
        <Link to ={'/about'}><button className="navbar-button">About</button></Link>
        <Link to={'/code'}><button className="navbar-button">Code</button></Link>
        <Link to={'/math'}><button className="navbar-button">Math</button></Link>
      </div>
    );
}
  