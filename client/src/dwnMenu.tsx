import styles from "./dwnMenu.module.css";
import { urlSource } from "./URL/urlSource";

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
    await fetch("http://127.0.0.1:5000/download?url=" + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
