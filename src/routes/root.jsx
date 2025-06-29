import { Outlet, Link } from "react-router-dom";
import '../App.css'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";

// N.B. this was copied from the React Router docs, https://v5.reactrouter.com/web/guides/scroll-restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      // Silently handle scroll errors (e.g., in test environments)
      console.warn('Scroll restoration failed:', error);
    }
  }, [pathname]);

  return null;
}

export default function Root(){
    const [error, setError] = useState(null);

    // Handle any unhandled errors in the app
    useEffect(() => {
        const handleError = (event) => {
            console.error('Unhandled error:', event.error);
            setError({
                message: "An unexpected error occurred. Please refresh the page and try again.",
                type: 'error'
            });
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            setError({
                message: "A network or processing error occurred. Please check your connection and try again.",
                type: 'error'
            });
        });

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    return (
        <>
            {error && (
                <ErrorMessage 
                    message={error.message} 
                    type={error.type} 
                    onClose={() => setError(null)}
                />
            )}
            <NavigationBar />
            <div className ="pagebody">
                <ScrollToTop/>
                <Outlet />
            </div>
        </>
    )
}

function NavigationBar() {
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        // Set active page based on current location
        const path = window.location.hash.replace('#', '');
        setActivePage(path || '/');
    }, []);

    const handleNavClick = (page) => {
        setActivePage(page);
    };

    return (
      <div className="navbar">
        <p style={{color :'white', padding : '1em'}}>Luke Bridges' Page</p>
        <Link to ={'/'} onClick={() => handleNavClick('/')}>
            <button 
                className="navbar-button" 
                style={{
                    backgroundColor: activePage === '/' ? '#007bff' : '#555'
                }}
            >
                About
            </button>
        </Link>
        <Link to={'code'} onClick={() => handleNavClick('/code')}>
            <button 
                className="navbar-button"
                style={{
                    backgroundColor: activePage === '/code' ? '#007bff' : '#555'
                }}
            >
                Code
            </button>
        </Link>
        <Link to={'math'} onClick={() => handleNavClick('/math')}>
            <button 
                className="navbar-button"
                style={{
                    backgroundColor: activePage === '/math' ? '#007bff' : '#555'
                }}
            >
                Math
            </button>
        </Link>
      </div>
    );
}
  