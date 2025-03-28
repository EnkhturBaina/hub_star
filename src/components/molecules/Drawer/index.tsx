// components/Drawer.js
import React from 'react';
import classNames from '@utils/classNames';
import { BiSolidRightArrowAlt } from 'react-icons/bi';
import MyButton from '@components/atoms/button';
interface IProps {
  children: React.ReactNode;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}
const Drawer = ({ children, setIsOpen, isOpen = false }: IProps) => {
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MyButton onClick={toggleDrawer}>
        <div className="flex flex-row items-center">
          <span className="font-bold">Бүгд</span>
          <BiSolidRightArrowAlt size={20} />
        </div>
      </MyButton>

      {/* Mask */}
      <div
        id="maxZindex"
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleDrawer}
      />

      {/* Drawer */}
      <div
        id="maxZindex"
        className={classNames(
          'p-8 fixed inset-y-0 left-0 bg-white w-fit max-w-[90%] md:pr-20 shadow-lg transform transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
