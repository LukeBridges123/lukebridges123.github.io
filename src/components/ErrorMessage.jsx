import { useState, useEffect } from 'react';

export function ErrorMessage({ message, type = 'error', onClose, autoClose = true, autoCloseDelay = 5000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (autoClose && autoCloseDelay > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, autoCloseDelay);
            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseDelay, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    if (!isVisible) return null;

    const getBackgroundColor = () => {
        switch (type) {
            case 'error': return '#f44336';
            case 'warning': return '#ff9800';
            case 'success': return '#4caf50';
            case 'info': return '#2196f3';
            default: return '#f44336';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'success': return '✅';
            case 'info': return 'ℹ️';
            default: return '❌';
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: getBackgroundColor(),
            color: 'white',
            padding: '15px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxWidth: '400px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
            <span style={{ fontSize: '18px' }}>{getIcon()}</span>
            <span style={{ flex: 1 }}>{message}</span>
            <button
                onClick={handleClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '0',
                    marginLeft: '10px'
                }}
            >
                ×
            </button>
        </div>
    );
}

export function LoadingMessage({ message = "Loading..." }) {
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '5px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
            <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>
            <span>{message}</span>
        </div>
    );
} 