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
        <h2>Ujenzi Group of Companies</h2>
        {installable ? (
          countdown > 0 ? (
            <>
              <button className="install-button" onClick={handleInstallClick}>
                INSTALL THE UJENZI APP
              </button>
              <p>
                The Ujenzi App will install in: {countdown} seconds.
              </p>
            </>
          ) : (
            <>
              <p>
                If the app was not installed, click{' '}
                <a href="your-apk-file-url.apk" download>
                  here
                </a>{' '}
                to download the APK manually.
              </p>
              <p>
                Download APK with a{' '}
                <a href="your-apk-file-url.apk" download>
                  link
                </a>{' '}
                to the apk file.
              </p>
            </>
          )
        ) : (
          <p>
            <a href={repo} className="App-link">
              Go to Homepage
            </a>
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
