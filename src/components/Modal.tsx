import { MouseEvent, ReactNode } from "react";
import SVGCross from "./cross"

export type ModalProps = {
  children: ReactNode
  onClose: () => void
}

function Modal({onClose, children}: ModalProps) {

  return (
    <div className='flex justify-center items-center w-screen h-screen fixed backdrop-blur inset-0 z-50 p-5'
        onClick={onClose}
    >
      <div className='relative bg-white border border-gray-300 rounded' 
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div
          className="inline-block absolute right-0 hover:scale-105 p-2"
        >
          <SVGCross onClick={onClose} />
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  )
}

export { Modal }