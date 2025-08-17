import { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import './Home.css'



function Home() {
    //local storage
  const [tweets, setTweets] = useState(() => {
    try {
      const raw = localStorage.getItem("tweets");
      const initial = raw ? JSON.parse(raw) : [];
      return initial.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    } catch {
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  function handleAdd(tweet) {
   // the new tweet is always at the top
    setTweets(prev => [tweet, ...prev]);

  }

  return (
    <div className="container">
      <Tweet onAdd={handleAdd} />

      <ul className="tweets-list">
        {tweets.map(t => (
          <li key={t.id} className="tweet">
            <div className="tweet-header">
              <span className="user">{t.username}</span>
              <span className="time">{t.createdTime}</span>
            </div>
            <p className="text">{t.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
