import React, { useState } from "react";
import { shortenUrl } from "../UrlThunk.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./UrlForm.css";

const UrlForm: React.FC = () => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const shortenedUrl = useAppSelector((state) => state.Url.shortenedUrl);
  const loading = useAppSelector((state) => state.Url.loading);
  const error = useAppSelector((state) => state.Url.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(shortenUrl(url));
  };

  return (
    <div className="container">
      <h2 className="heading">Shorten your link!</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
        <button
          type="submit"
          disabled={loading}
          className={loading ? "button" : "button"}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {error && <p className="errorText">{error}</p>}
      {shortenedUrl && (
        <p className="link">
          Your link: <a href={shortenedUrl}>{shortenedUrl}</a>
        </p>
      )}
    </div>
  );
};

export default UrlForm;
