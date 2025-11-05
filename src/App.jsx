import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Siderbar";
import Video from "./Pages/Video/Video";
import Feed from "./Components/Feed/Feed";
import Navbar from "./Components/Navbar/Navbar";
import SearchFeed from "./Components/SearchFeed/SearchFeed";
import ChannelPage from "./Pages/ChannelPage/ChannelPage";

function App() {
  const [category, setCategory] = useState(0);
  const [sidebar, setSidebar] = useState(true);

  return (
      <div className="app-container">
         <Navbar setSidebar={setSidebar} />
        <Sidebar
          sidebar={sidebar}
          category={category}
          setCategory={setCategory}
        />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Feed category={category} />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/search/:query" element={<SearchFeed />} />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;