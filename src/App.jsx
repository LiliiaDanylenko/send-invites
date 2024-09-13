import { useState } from 'react';
import { Success } from './components/Success/Success';
import { Users } from './components/Users/Users';
import './index.css'

function App() {
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {success ? (
        <Success count={count} setSuccess={setSuccess} />
      ) : (
        <Users setSuccess={setSuccess} setCount={setCount} />
      )}
    </div>
  );
}

export default App
