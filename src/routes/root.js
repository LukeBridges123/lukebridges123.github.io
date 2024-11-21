import { Outlet, Link } from "react-router-dom";
import '../App.css'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// N.B. this was copied from the React Router docs, https://v5.reactrouter.com/web/guides/scroll-restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default function Root(){
    return (
        <>
            <NavigationBar />
            <div class ="pagebody">
                <ScrollToTop/>
                <Outlet />
            </div>
        </>
        
    )
}

function NavigationBar() {
    return (
      <div className="navbar">
        <p style={{color :'white'}}>Luke Bridges' Page</p>
        <Link to ={'/'}><button className="navbar-button">About</button></Link>
        <Link to={'code'}><button className="navbar-button">Code</button></Link>
        <Link to={'math'}><button className="navbar-button">Math</button></Link>
      </div>
    );
}
  