import { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });
      alert('Signed up! Token: ' + res.data.token);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Signup failed');
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign up</button>
    </>
  );
}

export default App;
