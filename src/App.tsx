import React, { useState, useEffect } from "react";
import Photo from "./Photo";

const images = [
  "https://webneel.com/wallpaper/sites/default/files/images/08-2018/3-nature-wallpaper-mountain.jpg",
  "https://wallpaperplay.com/walls/full/b/b/e/49261.jpg",
  "https://webneel.com/wallpaper/sites/default/files/images/08-2018/2-nature-wallpaper-grass.jpg"
];
const App: React.FC = () => {
  const [selected, setSelected] = useState("");
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") setSelected("");
    });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      select zoom level
      <select value={zoom} onChange={e => setZoom(Number(e.target.value))}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
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
      {selected && <Photo zoom={zoom} url={selected}></Photo>}
      {!selected && (
        <h1>
          Click on the image to select and click again to zoom. Escape to
          remove.
        </h1>
      )}
    </div>
  );
};

export default App;
