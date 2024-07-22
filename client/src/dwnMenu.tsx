import styles from "./dwnMenu.module.css";
import { urlSource } from "./URL/urlSource";
import axios from "axios";

export function Tabs() {
  return (
    <>
      <div>
        <ul className={styles.downloadNav} id="tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="mp4-tab" type="button">
              MP4
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="mp3-tab" name="disabled">
              MP3
            </button>
          </li>
        </ul>
        <div className="tab-content"></div>
      </div>
      <div>
        <DownloadMenu />
      </div>
    </>
  );
}

export function DownloadMenu() {
  const { url } = urlSource();

  const handleButtonDownload = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/download?url=" + encodeURIComponent(url),
        {
          responseType: "blob",
        }
      );
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };
  return (
    <>
      <div>
        <button id="dw-button" onClick={handleButtonDownload}>
          Download
        </button>
      </div>
    </>
  );
}
