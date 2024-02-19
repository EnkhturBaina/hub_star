"use client";
import React from "react";
import { MenuItem, Menu, Label } from "semantic-ui-react";
import MenuList from "./MenuList";
import { Divider } from "@nextui-org/react";
import { CiLogout } from "react-icons/ci";

const LeftMenu = ({
  selectedMenu,
  setSelectedMenu,
}: {
  selectedMenu: any;
  setSelectedMenu: any;
}) => {
  const handleItemClick = (e, { name }) => {
    setSelectedMenu(name);
  };

  return (
    <div className="w-full rounded-xl bg-white px-1 py-2 dark:border-default-100">
      <Menu vertical borderless fluid className="!border-0 !shadow-none">
        {MenuList.map((el, index) => {
          return (
            <MenuItem
              key={index}
              name={el.key}
              active={selectedMenu === el.key}
              onClick={handleItemClick}
              className={`!m-2 !rounded-xl ${
                selectedMenu == el.key
                  ? "!bg-mainColor !text-white"
                  : "!text-gray-500"
              }`}
            >
              {el.title}
            </MenuItem>
          );
        })}
        <Divider className="mx-auto w-11/12" />
        <MenuItem
          name="logout"
          active={selectedMenu === "logout"}
          onClick={handleItemClick}
          className={`!m-2 !flex !items-center !justify-between !rounded-xl !py-2 !leading-loose ${
            selectedMenu == "logout"
              ? "!bg-mainColor !text-white"
              : "!text-red-600"
          }`}
        >
          Системээс гарах
          <Label className="!bg-transparent">
            <CiLogout className="text-2xl !text-red-600" />
          </Label>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LeftMenu;
