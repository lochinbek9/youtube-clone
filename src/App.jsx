
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import PlayVideo from "./Components/PlayVideo/PlayVideo"
function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>} />
        {/* <Route path="/video/:categoryId/:videoId" element={<Video/>} /> */}
        <Route path="/video/:id" element={<PlayVideo/>} />
      </Routes>
    </div>
  )
}

export default App