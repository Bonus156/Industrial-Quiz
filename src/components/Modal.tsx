import { useState, MouseEvent } from "react";
import SVGCross from "./cross"

function Modal() {
  const [isVisible, setIsVisible] = useState(true)
  const handleClick = () => {
    setIsVisible(false);
  };
  return (
    <div className={
      isVisible
        ? 'flex justify-center items-center w-screen h-screen fixed backdrop-blur inset-0 z-50'
        : 'hidden'}
        onClick={handleClick}
    >
      <div className='relative w-32 h-32 bg-white border border-black' 
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div
          className="inline-block absolute right-0 hover:scale-105"
        >
          <SVGCross onClick={handleClick} />
        </div>
      </div>
    </div>
  )
}

export { Modal }