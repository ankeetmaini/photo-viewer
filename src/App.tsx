import React, { useState, useEffect } from "react";
import Photo from "./Photo";

const images = [
  "https://webneel.com/wallpaper/sites/default/files/images/08-2018/3-nature-wallpaper-mountain.jpg",
  "https://wallpaperplay.com/walls/full/b/b/e/49261.jpg",
  "https://webneel.com/wallpaper/sites/default/files/images/08-2018/2-nature-wallpaper-grass.jpg"
];
const App: React.FC = () => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") setSelected("");
    });
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {images.map(u => (
          <img
            key={u}
            src={u}
            width={200}
            style={{ margin: 20 }}
            onClick={() => setSelected(u)}
          ></img>
        ))}
      </div>
      {selected && <Photo zoom={4} url={selected}></Photo>}
    </div>
  );
};

export default App;
