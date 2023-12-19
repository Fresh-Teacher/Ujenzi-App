import React, { useEffect, useState } from 'react';
import './App.css';

const repo = "https://ujenzi.vercel.app/";
let deferredPrompt;

function App() {
  const [installable, setInstallable] = useState(false);
  const [countdown, setCountdown] = useState(10);

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
    if (installable && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [installable, countdown]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>UJENZI GROUP OF COMPANIES</h2>
        {installable ? (
          countdown > 0 ? (
            <>
              <p>
                The Install Button will appear in: {countdown} seconds.
              </p>
              <button className="install-button" onClick={handleInstallClick}>
                INSTALL THE UJENZI APP
              </button>
            </>
          ) : (
            <>
              <p>
                If the installation button did not appear, click{' '}
                <a href="Ssebulibas.apk" download>
                  here
                </a>{' '}
                to download its APK.
              </p>
              <p>
                {' '}
                <a href={repo} className="https://ujenzi.vercel.app/">
                <strong>Go to Homepage 🏠</strong>
                </a>{' '}.
              </p>
            </>
          )
        ) : (
          <p>
            <a href={repo} className="https://ujenzi.vercel.app/">
              Go to Homepage
            </a>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
