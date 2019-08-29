import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import "./Photo.scss";

interface Props {
  url: string;
  zoom: number;
}

const noop = () => {};

const Photo: FunctionComponent<Props> = ({ url, zoom }) => {
  const [scale, setScale] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [coords, setCoords] = useState<DOMRect | ClientRect>();
  const image = useRef<HTMLImageElement>(null);
  const turnLeft = () => {
    setRotation((rotation - 90) % 360);
  };
  const turnRight = () => setRotation((rotation + 90) % 360);

  const getTransform = () => {
    let trans = "";
    trans = `scale(${scale ? zoom : 1})`;

    if (moveX) trans += `translateX(${-1 * moveX}px)`;
    if (moveY) trans += `translateY(${-1 * moveY}px)`;

    if (rotation) trans += `rotate(${rotation}deg)`;
    return trans;
  };

  const isLandscape = () => rotation === 0 || rotation === 180;

  const onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (coords) {
      const midX = coords.left + coords.width / 2;
      const midY = coords.top + coords.height / 2;
      const deltaX = e.clientX - midX;
      const deltaY = e.clientY - midY;
      const maxDeltaX =
        ((isLandscape() ? coords.width : coords.height) * zoom) / 10;
      const minDeltaX = -maxDeltaX;

      const maxDeltaY =
        ((isLandscape() ? coords.height : coords.width) * zoom) / 10;
      const minDeltaY = -maxDeltaY;
      const dx =
        deltaX > maxDeltaX
          ? maxDeltaX
          : deltaX < minDeltaX
          ? minDeltaX
          : deltaX;
      setMoveX(dx);
      const dy =
        deltaY > maxDeltaY
          ? maxDeltaY
          : deltaY < minDeltaY
          ? minDeltaY
          : deltaY;
      setMoveY(dy);
    }
  };

  const onTap = () => {
    const finalScale = !scale;
    !finalScale && setMoveX(0);
    !finalScale && setMoveY(0);
    setScale(finalScale);
  };

  return (
    <div className="container">
      <div className="imageContainer" onMouseMove={scale ? onMouseMove : noop}>
        <img
          ref={image}
          onClick={onTap}
          onLoad={() => {
            if (image && image.current) {
              setCoords(image.current.getBoundingClientRect());
            }
          }}
          style={{
            transform: getTransform(),
            cursor: scale ? "move" : "zoom-in"
          }}
          src={url}
          className="image"
        />
      </div>
      <div className="controls">
        <button onClick={turnLeft}>left</button>
        <button onClick={turnRight}>right</button>
      </div>
    </div>
  );
};

export default Photo;
