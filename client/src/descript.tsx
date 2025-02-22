import styles from "./Descript.module.css";
import { Tabs } from "./dwnMenu";

export const jsonToXml = (json: any) => {
  const { thumbnail, title, uploader, like_count, duration_string } = json;
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.videoBox}>
          <h1>{title}</h1>
          <img src={thumbnail}></img>
          <h1>Uploader: {uploader}</h1>
          <p>Likes:{like_count}</p>
          <p>Duration:{duration_string}</p>
        </div>
        <div className={styles.downloadBox}>
          <Tabs />
        </div>
      </div>
    </div>
  );
};
