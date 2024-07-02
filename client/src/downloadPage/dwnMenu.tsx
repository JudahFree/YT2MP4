import styles from "./dwnMenu.module.css";

export function Tabs() {
  return (
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
  );
}
