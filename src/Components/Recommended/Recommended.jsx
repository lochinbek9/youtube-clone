import React, { useEffect, useState } from "react";
import { API_KEY } from "../../data";
import { Link } from "react-router-dom";
import "./Recommended.css";

function Recommended({ categoryId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=20&videoCategoryId=${categoryId}&regionCode=US&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    if (categoryId) fetchRecommended();
  }, [categoryId]);

  const formatViews = (views) => {
    if (!views) return "N/A";
    const num = parseInt(views);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  return (
    <div className="recommended">
      <h3>Recommended Videos</h3>
      <div className="related-list">
        {videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="related-card"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="video-img"
            />
            <div className="video-info">
              <h4 className="video-title">{video.snippet.title}</h4>
              <p className="video-channel">{video.snippet.channelTitle}</p>
              <p className="video-stats">{formatViews(video.statistics?.viewCount)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recommended;