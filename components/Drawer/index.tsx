// components/Drawer.js
import { Button } from '@nextui-org/react';
import { BiSolidRightArrowAlt } from 'react-icons/bi';

const Drawer = ({ children, setIsOpen = (v: boolean) => {}, isOpen = false }) => {
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button radius="none" className="rounded-l-md bg-white border-1" onClick={toggleDrawer}>
        <div className="flex flex-row items-center">
          <span className="font-bold">Бүгд</span>
          <BiSolidRightArrowAlt size={20} />
        </div>
      </Button>

      {/* Mask */}
      <div
        id="maxZindex"
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleDrawer}
      />

      {/* Drawer */}
      <div
        id="maxZindex"
        className={`p-8 fixed inset-y-0 left-0 bg-white  lg:w-[45%] w-[80%] shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
