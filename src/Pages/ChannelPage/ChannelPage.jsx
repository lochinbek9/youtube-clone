import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEY } from "../../data";


function ChannelPage() {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`
        );
        const data = await res.json();
        const vids = data.items
          .filter(item => item.id.videoId) 
          .map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url
          }));
        setVideos(vids);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, [channelId]);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="channel-page">
      <h2>Channel Videos</h2>
      <div className="feed">
        {videos.map(video => (
          <div
            key={video.id}
            className="card"
            onClick={() => handleVideoClick(video.id)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <h4>{video.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelPage;