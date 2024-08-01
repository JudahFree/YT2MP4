import { useState } from "react";
import { jsonToXml } from "./descript.tsx";
import loadingSpinner from "./assets/icons8-Loading.png";

export const urlSource = () => {
  const [url, setUrl] = useState<string>(userLink);
  return { url, setUrl };
};

export let userLink: string = "";

export const createImportChangeHandler = (
  setUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
};

export function YTInput() {
  const { url, setUrl } = urlSource();
  const [error, setError] = useState("");
  const [xmlData, setXmlData] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = createImportChangeHandler(setUrl);

  const handleButtonClick = async () => {
    if (url && url.startsWith("https://www.youtube.com/watch?v=")) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/info?url=" + encodeURIComponent(url),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Server response:", data);
        setError(""); // Clear any error messages
        const xml = jsonToXml(data);
        setXmlData(xml);
        userLink = url;
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to process the URL. Please try again later.");
      } finally {
        setLoading(false);
        console.log(userLink);
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
        {loading && (
          <img
            src={loadingSpinner}
            alt="Loading..."
            className="loading-spinner"
          />
        )}
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
