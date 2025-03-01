import styles from "../styles/Thumbnail.module.css";
import { useEffect, useRef } from "react";
export default function CenterThumbnail({ children }) {
  const colors = [
    "#FA95A3",
    "#F0E77C",
    "#A392E0",
    "#A0DCFA",
    "#95F3A3",
    "#87B0A9",
    "#E4EDED",
    "#D48A8E",
    "#FFB952",
    "#FF829E",
    "#A59ADF",
    "#64FAF2",
    "#A7FA66",
  ];

  const ref = useRef(null);
  useEffect(() => {
    const color_index = Math.floor(Math.random() * colors.length);

    ref.current.style.backgroundColor = colors[color_index];
  }, []);
  return (
    <div ref={ref} className={styles.center_thumbnail}>
      {children}
    </div>
  );
}
