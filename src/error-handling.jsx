import { useRouteError } from "react-router-dom";

export default function ErrorHandler(){
    const error = useRouteError();
    console.error(error);

    // Determine the type of error and provide appropriate messaging
    let errorMessage = "An unexpected error has occurred.";
    let errorDetails = "";
    
    if (error.status) {
        switch (error.status) {
            case 404:
                errorMessage = "Page not found";
                errorDetails = "The page you're looking for doesn't exist. Please check the URL and try again.";
                break;
            case 403:
                errorMessage = "Access denied";
                errorDetails = "You don't have permission to access this resource.";
                break;
            case 500:
                errorMessage = "Server error";
                errorDetails = "Something went wrong on our end. Please try again later.";
                break;
            case 503:
                errorMessage = "Service unavailable";
                errorDetails = "The service is temporarily unavailable. Please try again later.";
                break;
            default:
                errorMessage = `Error ${error.status}`;
                errorDetails = error.statusText || error.message || "An error occurred while processing your request.";
        }
    } else if (error.message) {
        errorMessage = "Application Error";
        errorDetails = error.message;
    }

    return (
        <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1 style={{ color: '#d32f2f', marginBottom: '1rem' }}>⚠️ {errorMessage}</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>{errorDetails}</p>
            <button 
                onClick={() => window.history.back()} 
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '1rem'
                }}
            >
                Go Back
            </button>
            <button 
                onClick={() => window.location.href = '/#'} 
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#388e3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Go Home
            </button>
        </div>
    );
}