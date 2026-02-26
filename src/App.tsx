import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './shared/Header'
import { Footer } from './shared/Footer'
import { Home } from './features/home/Home'
import NotFound from './shared/NotFound'
import Profile from './features/profile/Profile'
import Discover from './features/discover/Discover'
import { Messages } from './features/messages/Messages'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/discover" element={<Discover/>}/>
          <Route path="/messages" element={<Messages/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
  )
}

export default App