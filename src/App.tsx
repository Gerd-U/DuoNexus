
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './shared/Header'
import { Footer } from './shared/Footer'
import { Home } from './features/home/Home'
import NotFound from './shared/NotFound'



function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
  )
}

export default App
