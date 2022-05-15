import React from "react";
import { Layer, Line, Stage } from "react-konva";
import URLImage from "./URLImage";

/*
    This module is used for testing stuff
    modules can be copy+pasted to other components
    
    @Terran
*/
const HomeScreen = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const [tool, setTool] = React.useState("pen");
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setImages([...images, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = images[images.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    images.splice(images.length - 1, 1, lastLine);
    setImages(images.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);
    setImages([
      ...images,
      {
        ...stageRef.current.getPointerPosition(),
        src: dragUrl.current,
      },
    ]);
    // setImages(
    //     images.concat([
    //       {
    //         ...stageRef.current.getPointerPosition(),
    //         src: dragUrl.current
    //       }
    //     ])
    //   );
  };

  const wwidth = window.innerWidth;
  const wheight = window.innerHeight;

  return (
    <div>
      Try to trag and image into the stage:
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        crossOrigin="Anonymous"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={handleOnDrop}
        onDragOver={(e) => e.preventDefault()}
        width={"600px"}
        height={"600px"}
      >
        <Stage
          width={wwidth}
          height={wheight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              console.log(image);
              if (image.tool === "pen" || image.tool === "eraser") {
                return (
                  <Line
                    //key={i}
                    points={image.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      image.tool === "eraser"
                        ? "destination-out"
                        : "source-over"
                    }
                  />
                );
              } else {
                return <URLImage image={image} />;
              }
            })}
          </Layer>
        </Stage>
      </div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default HomeScreen;
