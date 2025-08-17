import { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import './Home.css'

const API_URL = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";

function Home() {

    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function fetchTweets() {
        setLoading(true);
        try {
        const res = await fetch(`${API_URL}&select=id,userName,content,date`);
        if (!res.ok) throw new Error(await res.text());
        const rows = await res.json();

        const orderTweets = rows.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTweets(orderTweets);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    }
    useEffect(() => {
        fetchTweets();
    }, []);

   async function handleAdd(newTweet) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTweet),
      });
      if (!res.ok) throw new Error(await res.text());

      await fetchTweets();

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container">
      {loading && <div className="loading">Loading…</div>}
      <Tweet onAdd={handleAdd}/>

      <ul className="tweets-list">
        {tweets.map(t => (
          <li className="tweet">
            <div className="tweet-header">
              <span className="user">{t.userName}</span>
              <span className="time">{t.date}</span>
            </div>
            <p className="text">{t.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
