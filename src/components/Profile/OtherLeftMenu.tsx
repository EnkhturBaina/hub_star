'use client';
import React from 'react';
import { MenuItem, Menu } from 'semantic-ui-react';
import { OtherProfileMenu } from '@typeDefs/reference';

type Props = {
  menus: OtherProfileMenu[];
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
};
const OtherLeftMenu: React.FC<Props> = ({ menus, currentId, setCurrentId }) => {
  const handleItemClick = (id: string) => {
    return setCurrentId(id);
  };

  return (
    <div className="w-full rounded-xl bg-white px-1 py-2 dark:border-default-100">
      <Menu vertical borderless fluid className="!border-0 !shadow-none">
        {menus.map((item, index) => {
          return (
            <MenuItem
              key={index}
              name={item.id}
              active={currentId == item.id}
              onClick={() => handleItemClick(item.id)}
              className={`!m-2 !rounded-xl ${
                currentId == item.id ? '!bg-mainColor !text-white' : '!text-gray-500'
              }`}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default OtherLeftMenu;
