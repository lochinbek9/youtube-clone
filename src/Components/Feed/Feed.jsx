
import "./Feed.css"

import thumbnail1 from "../../assets/thumbnail1.png"
import thumbnail2 from "../../assets/thumbnail2.png"
import thumbnail3 from "../../assets/thumbnail3.png"
import thumbnail4 from "../../assets/thumbnail4.png"
import thumbnail5 from "../../assets/thumbnail5.png"
import thumbnail6 from "../../assets/thumbnail6.png"
import thumbnail7 from "../../assets/thumbnail7.png"
import thumbnail8 from "../../assets/thumbnail8.png"
import { Link } from "react-router-dom"
import { API_KEY } from "../../data.js"
import { useEffect, useState } from "react"

function Feed({ category }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
            const res = await fetch(videoList_url);
            const data = await res.json();
            setData(data.items || []);
        } catch (error) {
            console.error("Fetch error:", error);
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="feed">
            {data.map((item, index) => (
                <Link key={index} to={`/video/${item.id}`} className="card">
                    <img src={item.snippet?.thumbnails?.medium?.url} alt={item.snippet?.title} />
                    <h2>{item.snippet?.title}</h2>
                    <h3>{item.snippet?.channelTitle}</h3>
                    <p>{item.statistics?.viewCount} views</p>
                </Link>
            ))}
        </div>
    );
}

export default Feed