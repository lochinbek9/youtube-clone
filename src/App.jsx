
import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Video from "./Pages/Video/Video"
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/video/:categoryId/:videoId" element={<Video/>} />

      </Routes>
    </div>
  )
}

export default App