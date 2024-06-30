import "./App.css";
import React, { useState } from "react";
import { Footer } from "./footer";
import { jsonToXml } from "./descript";
import logo from "./assets/YTMP4.svg";

function App() {
  return (
    <>
      <div>
        <img src={logo} id="logo" className="center" />
        <h1 id="Title">YT2MP4</h1>
      </div>
      <div className="container-sm">
        <YTInput />
      </div>
      <Footer />
    </>
  );
}

export function YTInput() {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D"
  );
  const [error, setError] = useState("");
  const [xmlData, setXmlData] = useState<JSX.Element | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleButtonClick = async () => {
    if (url && url.startsWith("https://www.youtube.com/watch?v=")) {
      console.log(url);
      try {
        const response = await fetch("http://127.0.0.1:5000/info?url=" + url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Server response:", data);
        setError(""); // Clear any error messages
        const xml = jsonToXml(data);
        setXmlData(xml);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to process the URL. Please try again later.");
      }
    } else {
      setError(
        "Please input a YouTube link starting with: https://www.youtube.com/watch?v="
      );
    }
  };

  return (
    <>
      <div>
        <input
          type="url"
          id="urlImport"
          value={url}
          onChange={handleInputChange}
        />
        <button id="yt-button" onClick={handleButtonClick}>
          Convert
        </button>
        <div id="error">{error && <p>{error}</p>}</div>
        <div id="xmlData">
          {xmlData && (
            <pre>
              <code>{xmlData}</code>
            </pre>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
