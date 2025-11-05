import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../../data";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import "./Sidebar.css";

function Sidebar({ sidebar, category, setCategory }) {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  const categories = [
    { id: 0, name: "Home", icon: home },
    { id: 20, name: "Gaming", icon: game_icon },
    { id: 2, name: "Automobiles", icon: automobiles },
    { id: 17, name: "Sports", icon: sports },
    { id: 24, name: "Entertainment", icon: entertainment },
    { id: 28, name: "Technology", icon: tech },
    { id: 10, name: "Music", icon: music },
    { id: 22, name: "Blogs", icon: blogs },
    { id: 25, name: "News", icon: news },
  ];

  useEffect(() => {
    const fetchChannels = async () => {
      const channelIds = [
        "UCneJYS2Xf_a2a1ealwZb7mQ", 
        "UCQHlwA2RzpQIRNemZX04i_Q", 
        "UCyStLLq1rA9Og2HOcXIbYtA", 
        "UC3Ad7MMhJ1NHAkYbtgbVJ1Q", 
      ];

      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds.join(
            ","
          )}&key=${API_KEY}`
        );
        const data = await res.json();
        const channelList = data.items.map((ch) => ({
          id: ch.id,
          name: ch.snippet.title,
          img: ch.snippet.thumbnails.default.url,
        }));
        setSubscriptions(channelList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChannels();
  }, []);

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    navigate("/"); 
  };

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="shortcut-links">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`side-link ${category === cat.id ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <img src={cat.icon} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
        <hr />
      </div>

      <div className="subscribed-list">
        <h3>Subscribed</h3>
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="side-link"
            onClick={() => handleChannelClick(sub.id)}
          >
            <img src={sub.img} alt={sub.name} />
            <p>{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;