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
    <div className="w-full max-w-[260px] rounded-xl bg-white px-1 py-2 dark:border-default-100">
      {/* <Listbox
        ref={navRef}
        variant="flat"
        aria-label="Listbox menu with icons"
        // color="#F7941D"
        className="color-mainColor"
        selectionMode="single"
        selectedKeys={selectedMenu}
        onSelectionChange={setSelectedMenu}
        hideSelectedIcon
        disallowEmptySelection
      >
        <ListboxItem
          key="profile"
          className={`${
            selectedMenu == "profile" ? "!bg-red-600" : "bg-green-600"
          }`}
        >
          New file{selectedMenu}
        </ListboxItem>
        <ListboxItem key="2" className="bg-red-600">
          Copy link
        </ListboxItem>
        <ListboxItem key="3" showDivider>
          Edit file
        </ListboxItem>
        <ListboxItem key="4" className="text-danger" color="danger">
          Delete file
        </ListboxItem>
      </Listbox> */}
      <Menu vertical borderless fluid className="!border-0 !shadow-none">
        {MenuList.map((el, index) => {
          return (
            <MenuItem
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
        <Divider />
        <MenuItem
          name="logout"
          active={selectedMenu === "logout"}
          onClick={handleItemClick}
          className={`!m-2 !rounded-xl ${
            selectedMenu == "logout"
              ? "!bg-mainColor !text-white"
              : "!text-red-600"
          }`}
        >
          <Label className="!bg-transparent">
            <CiLogout className="text-xl !text-red-600" />
          </Label>
          Системээс гарах
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LeftMenu;
