import { Theme } from "../types/types";
import { MouseEvent, useState } from "react";
import { Modal } from "./Modal";

type TheEndProps = {
  className: string;
  theme: Theme;
}

function TheEnd(props: TheEndProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleClick = (e: MouseEvent) => {
    setIsModalOpen(true);
    e.preventDefault();
  }

  const onConfirm = () => {
    localStorage.removeItem(props.theme.themeRoute);
    location.pathname = '/themes';
  }

  const onCancel = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <span className={props.className} onClick={handleClick}>Закончить попытку...</span>
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <>
          <div className='p-4 font-medium'>Вы уверены, что хотите закончить попытку?</div>
          <div className='flex justify-around p-4'>
            <button className="cursor-pointer bg-primary p-2 hover:bg-primhover text-white w-28" onClick={onConfirm}>Закончить</button>
            <button className="cursor-pointer bg-secondary p-2 hover:bg-sechover text-prev w-28" onClick={onCancel}>Отмена</button>
          </div>
        </>
      </ Modal>
    </>
  )
}

export { TheEnd }