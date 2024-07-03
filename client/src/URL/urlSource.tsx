import { useState } from "react";

export const urlSource = () => {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  return { url, setUrl };
};
