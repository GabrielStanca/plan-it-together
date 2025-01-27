import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Cererea GET către backend
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}asdf`);
        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }
        const data = await response.text(); // Dacă serverul trimite text simplu
        setMessage(data); // Stochează mesajul în state
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessage();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {message && <p>Success: {message}</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </header>
    </div>
  );
}

export default App;
