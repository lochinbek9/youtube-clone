import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../../data";
import "./Video.css";
import { FaThumbsUp, FaEye, FaCalendarAlt } from "react-icons/fa";
import Recommended from "../../Components/Recommended/Recommended";

function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const data = await res.json();
        const videoData = data.items[0];
        setVideo(videoData);
        setCategoryId(videoData.snippet.categoryId);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  const { snippet, statistics } = video;
  const { title, channelTitle, publishedAt, description } = snippet;
  const { viewCount, likeCount } = statistics;

  return (
    <div className="video-container">
      <div className="video-content">
        <div className="video-player">
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="video-info">
            <h2>{title}</h2>
            <p><strong>Channel:</strong> {channelTitle}</p>

            <div className="video-stats">
              <div className="stat">
                <FaEye /> <span>{parseInt(viewCount).toLocaleString()} views</span>
              </div>
              <div className="stat">
                <FaThumbsUp /> <span>{parseInt(likeCount).toLocaleString()} likes</span>
              </div>
              <div className="stat">
                <FaCalendarAlt /> <span>{new Date(publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="video-description">
              <h3>Description</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>

        <div className="recommended-section">
          <Recommended categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
}

export default Video;