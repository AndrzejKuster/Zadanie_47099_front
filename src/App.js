import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import AddClientForm from './components/AddClientForm'
import './App.css';
import ClientsTable from './components/ClientsTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';
import FindCompany from './components/FindCompany';
import AppRoutes from './routes/AppRoutes';
import AppNav from './components/AppNav';

function App() {


  return (
    <div className="App">
      <AppNav />
      <AppRoutes />
    </div>
  );
}

export default App;
