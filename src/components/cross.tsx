import { FC } from "react";
import { IconProps } from "../types/types";

const SVGCross: FC<IconProps> = ({
    size = 24,
    active = false,
    onClick,
  }) => {
    const isActive = active ? "#292D32" : "#343a40"
    return (
    <span
      className="cursor-pointer"
      onClick={onClick}
    >
      <svg
        width={`${size}`}
        height={`${size}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 19L19 5"
          stroke={isActive}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 19L5 5"
          stroke={isActive}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
};
export default SVGCross;