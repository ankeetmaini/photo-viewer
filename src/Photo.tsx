import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import "./Photo.scss";
import { cursorTo } from "readline";

interface Props {
  url: string;
  zoom: number;
}

const noop = () => {};

const Photo: FunctionComponent<Props> = ({ url, zoom }) => {
  const [scale, setScale] = useState(false);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);
  const [coords, setCoords] = useState<DOMRect | ClientRect>();
  const image = useRef<HTMLImageElement>(null);

  const getTransform = () => {
    let trans = "";
    trans = `scale(${scale ? zoom : 1})`;

    if (moveX) trans += `translateX(${-1 * moveX}px)`;
    if (moveY) trans += `translateY(${-1 * moveY}px)`;
    return trans;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (coords) {
      const midX = coords.left + coords.width / 2;
      const midY = coords.top + coords.height / 2;
      const deltaX = e.clientX - midX;
      const deltaY = e.clientY - midY;

      setMoveX(deltaX);
      setMoveY(deltaY);

      console.log({ deltaX, deltaY });
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
      <div className="imageContainer">
        <img
          ref={image}
          onLoad={() => {
            if (image && image.current) {
              setCoords(image.current.getBoundingClientRect());
            }
          }}
          style={{
            transform: getTransform(),
            cursor: scale ? "move" : "auto"
          }}
          onClick={onTap}
          onMouseMove={scale ? onMouseMove : noop}
          src={url}
          className="image"
        />
      </div>
    </div>
  );
};

export default Photo;
