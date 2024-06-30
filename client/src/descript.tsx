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
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="mp4-tab"
            data-bs-toggle="tab"
            data-bs-target="#mp4-tab-pane"
            type="button"
            role="tab"
            aria-controls="mp4-tab-pane"
            aria-selected="true"
          >
            MP4
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="mp3-tab"
            data-bs-toggle="tab"
            data-bs-target="#mp3-tab-pane"
            type="button"
            role="tab"
            aria-controls="mp3-tab-pane"
            aria-selected="false"
          >
            MP3
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="mp4-tab-pane"
          role="tabpanel"
          aria-labelledby="mp4-tab"
          tabIndex={0}
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="mp3-tab-pane"
          role="tabpanel"
          aria-labelledby="mp3-tab"
          tabIndex={0}
        >
          ...
        </div>
      </div>
    </div>
  );
};
