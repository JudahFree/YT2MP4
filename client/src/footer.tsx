import styles from "./footer.module.css";

export function Footer() {
  return (
    <div>
      <div>
        <svg height="6" width="800px" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="6" x2="800" y2="6" id="break" />
        </svg>
      </div>
      <p id={styles.footer} className="fixed-bottom">
        &copy; YT2MP4: YouTube to MP4 Converter - Made with Typescript, React,
        Vite, and the yt-dlp github repo
      </p>
    </div>
  );
}
