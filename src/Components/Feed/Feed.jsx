import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import "./Feed.css";

function Feed({ category }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&regionCode=US&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [category]); 

  return (
    <div className="feed">
      {videos.length === 0 && <p>No videos available for this category.</p>}
      {videos.map((video, index) => (
        <Link key={index} to={`/video/${video.id}`} className="card">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <h4>{video.snippet.title}</h4>
        </Link>
      ))}
    </div>
  );
}

export default Feed;