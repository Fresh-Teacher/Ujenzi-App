import React, { useEffect, useState } from 'react';
import './App.css';

const repo = "https://freshteacher.software";
let deferredPrompt;

function App() {
  const [installable, setInstallable] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = () => {
    setInstallable(false);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  useEffect(() => {
    let timer;
    if (installable) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [installable]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Ujenzi Group of Companies</h2>
        {installable ? (
          <>
            <button className="install-button" onClick={handleInstallClick}>
              INSTALL THE UJENZI APP
            </button>
            <p>
              The Ujenzi App will install in: {countdown} seconds.
            </p>
          </>
        ) : (
          <p>
            <a href={repo} className="App-link">Go to Homepage</a>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
