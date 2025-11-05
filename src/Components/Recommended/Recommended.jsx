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
            />
            <p>{video.snippet.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recommended;