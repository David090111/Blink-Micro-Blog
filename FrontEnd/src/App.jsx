import './App.css'
import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header'
import { Body } from './components/Body'
import { Footer } from './components/Footer'

import AuthProvider from "./context/AuthProvider";


function App() {
  const [sidebarFlag, setSidebarFlag] = useState(false);

  return (
    <>
      <AuthProvider>
        <Header sOpen={() => setSidebarFlag(true)}/>
        <Body sFlag={sidebarFlag} sClose={() => setSidebarFlag(false)}/>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
