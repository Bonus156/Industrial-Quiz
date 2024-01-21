import { Link } from "react-router-dom";
import { Theme } from "../types/types";
import { MouseEvent } from "react";

type TheEndProps = {
  className: string;
  theme: Theme;
}

function TheEnd(props: TheEndProps) {
  const handleClick = (e: MouseEvent) => {
    const isRealyEnd = confirm('Вы уверены, что хотите закончить попытку?')
    if (isRealyEnd) {
      localStorage.removeItem(props.theme.themeRoute);
    } else {
      e.preventDefault()
    }
  }

  return (
    // <div className={props.className} onClick={handleClick}>
      <Link to='/themes' className={props.className}><span onClick={handleClick}>Закончить попытку...</span></Link>
    // </div>
  )
}

export { TheEnd }