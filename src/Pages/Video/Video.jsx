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
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); 
  const [replyInputs, setReplyInputs] = useState({});

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
        setLikes(parseInt(videoData.statistics.likeCount) || 0);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${id}&key=${API_KEY}&maxResults=20&order=time`
        );
        const data = await res.json();
        const items = data.items.map((thread) => {
          const top = thread.snippet.topLevelComment.snippet;
          const repliesArr = (thread.replies && thread.replies.comments) 
            ? thread.replies.comments.map(r => ({
                id: r.id,
                text: r.snippet.textDisplay,
                author: r.snippet.authorDisplayName,
                timestamp: r.snippet.publishedAt
              }))
            : [];
          return {
            id: thread.id,
            text: top.textDisplay,
            author: top.authorDisplayName,
            timestamp: top.publishedAt,
            replies: repliesArr
          };
        });
        setComments(items);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  const { snippet, statistics } = video;
  const { title, channelTitle, publishedAt, description } = snippet;
  const { viewCount } = statistics;

  const handleLike = () => setLikes(prev => prev + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;
    const newC = {
      id: Date.now().toString(),
      text: trimmed,
      author: "You",
      timestamp: new Date().toISOString(),
      replies: []
    };
    setComments([newC, ...comments]);
    setNewComment("");
  };

  const handleReplyChange = (commentId, value) => {
    setReplyInputs({ ...replyInputs, [commentId]: value });
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    const text = (replyInputs[commentId] || "").trim();
    if (!text) return;
    const updated = comments.map(c => {
      if (c.id === commentId) {
        const replyObj = {
          id: Date.now().toString(),
          text,
          author: "You",
          timestamp: new Date().toISOString()
        };
        return {
          ...c,
          replies: [...c.replies, replyObj]
        };
      }
      return c;
    });
    setComments(updated);
    setReplyInputs({ ...replyInputs, [commentId]: "" });
  };

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
              <div className="stat like-btn" onClick={handleLike}>
                <FaThumbsUp /> <span>{likes.toLocaleString()} likes</span>
              </div>
              <div className="stat">
                <FaCalendarAlt /> <span>{new Date(publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="video-description">
              <h3>Description</h3>
              <p>{description}</p>
            </div>

            <div className="comments-section">
              <h3>Comments</h3>
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <button type="submit">Post</button>
              </form>
              <div className="comments-list">
                {comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <strong>{comment.author}</strong>
                      <span className="comment-time">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>

                    <form
                      onSubmit={e => handleReplySubmit(e, comment.id)}
                      className="reply-form"
                    >
                      <input
                        type="text"
                        placeholder="Reply..."
                        value={replyInputs[comment.id] || ""}
                        onChange={e => handleReplyChange(comment.id, e.target.value)}
                      />
                      <button type="submit">Reply</button>
                    </form>

                    {comment.replies.length > 0 && (
                      <div className="replies-list">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="reply">
                            <div className="comment-header">
                              <strong>{reply.author}</strong>
                              <span className="comment-time">
                                {new Date(reply.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="comment-text">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="recommended-section">
          <Recommended categoryId={categoryId} uniform />
        </div>
      </div>
    </div>
  );
}

export default Video;