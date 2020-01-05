import React from "react";

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
const ItemsDisplay = ({items}) => {
  return (
    <div className="w-100 px-4 py-1" style={{background: "rgb(220, 220, 220)"}}>
      <div>Displayed as i: [x, y, w, h, mini]</div>
      {items.map(el => 
        <span className="pr-4" key={el.i}>
          {`${el.i}: [${el.x}, ${el.y}, ${el.w}, ${el.h}, ${el.mini}], `}
        </span>
      )}
    </div>
  );
}

export default ItemsDisplay