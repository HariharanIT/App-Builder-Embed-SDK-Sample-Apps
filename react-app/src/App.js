import React, { useEffect, useRef, useState } from 'react';
import './app.css';
import AppBuilderReactSdk from '@appbuilder/react';

function App() {
  const [sdkToken, setSdkToken] = useState('');
  const login = () => {
    try {
      AppBuilderReactSdk.login(sdkToken)
        .then(() => {
          console.log('Testing - login success');
        })
        .catch((error) => {
          console.log('Testing - login failure', error);
        });
    } catch (error) {
      console.log('set token error: ', error);
    }
  };
  const logout = () => {
    try {
      AppBuilderReactSdk.logout()
        .then(() => {
          console.log('Testing - logout success');
        })
        .catch((error) => {
          console.log('Testing - logout failure', error);
        });
    } catch (error) {
      console.log('Testing - logout failure: ', error);
    }
  };

  useEffect(() => {
    AppBuilderReactSdk.on('token-not-found', () => {
      console.log('debugging token-not-found triggered');
    });
    AppBuilderReactSdk.on('will-token-expire', () => {
      console.log('debugging will-token-expire triggered');
    });
    AppBuilderReactSdk.on('did-token-expire', () => {
      console.log('debugging did-token-expire triggered');
    });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <span>My React App</span>
        <input
          id="meetingId"
          type="text"
          onChange={(e) => {
            setSdkToken(e.target.value);
          }}
          placeholder="Token"
        ></input>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <AppBuilderReactSdk.View />
      </div>
    </div>
  );
}

export default App;
