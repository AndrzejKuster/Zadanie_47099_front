import './App.css';
import ClientsTable from './components/ClientsTable';
import { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import AppNav from './components/AppNav';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <div className="App">
      <AppNav user={user} setUser={setUser} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
}

export default App;
