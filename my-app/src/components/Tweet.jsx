import { useState } from "react";
import './Tweet.css'

const MAX_LEN = 140;
const USERNAME = "OR";

export default function Tweet({ onAdd}) {
  const [text, setText] = useState("");

  const remaining = MAX_LEN - text.length;
  const isTooLong = remaining < 0;
  const isEmpty = text.trim().length === 0;
  const disabled = isTooLong || isEmpty;

  function handleSubmit() {
    if (disabled) return;

    const newTweet = {
      userName: USERNAME,
      content: text.trim(),
      date: new Date().toISOString(),
    };
    onAdd(newTweet);
    setText("");
  }

  return (
    <div className="tweet-form">
      <textarea
        placeholder="What do you think..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {isTooLong && (
        <div className="tweet-error">The tweet can't contain more than 140 chars.</div>
      )}
      <div className="tweet-actions">
            <button type="button" onClick={handleSubmit} disabled={disabled}>
            Tweet
            </button>
        </div>
    </div>
  );
}
