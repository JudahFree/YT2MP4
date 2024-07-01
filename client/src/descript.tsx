import styles from "./Descript.module.css";

export const jsonToXml = (json: any) => {
  const { thumbnail, title, uploader, like_count } = json;
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.videoBox}>
          <h1>{title}</h1>
          <img src={thumbnail}></img>
          <h1>Uploader: {uploader}</h1>
          <p>Likes:{like_count}</p>
        </div>
        <div className={styles.downloadBox}>
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export const Tabs = () => {
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
};
