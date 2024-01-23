import { MouseEvent, ReactNode } from "react";
import SVGCross from "./cross"

export type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

function Modal(props: ModalProps) {

  return (
    <div className={
      props.isOpen
        ? 'flex justify-center items-center w-screen h-screen fixed backdrop-blur inset-0 z-50 p-5'
        : 'hidden'}
        onClick={props.onClose}
    >
      <div className='relative bg-white border border-gray-300 rounded' 
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div
          className="inline-block absolute right-0 hover:scale-105 p-2"
        >
          <SVGCross onClick={props.onClose} />
        </div>
        <div className="pt-5">{props.children}</div>
      </div>
    </div>
  )
}

export { Modal }