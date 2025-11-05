import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY } from "../../data";
import "./SearchFeed.css";

function SearchFeed() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${query}&key=${API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="feed search-feed">
      {videos.length === 0 ? (
        <p>No results found for <strong>{query}</strong>.</p>
      ) : (
        videos.map((video, index) => (
          <Link
            key={index}
            to={`/video/${video.id.videoId}`}
            className="card"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h4>{video.snippet.title}</h4>
            <p className="channel">{video.snippet.channelTitle}</p>
          </Link>
        ))
      )}
    </div>
  );
}

export default SearchFeed;