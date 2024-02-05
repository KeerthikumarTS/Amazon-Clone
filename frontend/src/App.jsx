import { HelmetProvider } from 'react-helmet-async'
import './App.css'
import {BroswerRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    <Router>
    <div className='App'>
      <HelmetProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </HelmetProvider>
    </div>
    </Router>
  )
}

export default App
