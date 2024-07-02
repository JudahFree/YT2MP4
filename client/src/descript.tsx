import styles from "./Descript.module.css";
import { Tabs } from "./downloadPage/dwnMenu";

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
