"use client";
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";

const LeftMenu = ({
  selectedMenu,
  setSelectedMenu,
}: {
  selectedMenu: any;
  setSelectedMenu: any;
}) => (
  <div className="w-full max-w-[260px] rounded-xl bg-white px-1 py-2 dark:border-default-100">
    <Listbox
      variant="flat"
      aria-label="Listbox menu with icons"
      // color="#F7941D"
      className="color-mainColor"
      selectionMode="single"
      selectedKeys={selectedMenu}
      onSelectionChange={setSelectedMenu}
      hideSelectedIcon
    >
      <ListboxItem
        key="1"
        className={`${selectedMenu === "1" ? "bg-red-600" : "bg-green-600"}`}
      >
        New file{selectedMenu}
      </ListboxItem>
      <ListboxItem key="2">Copy link</ListboxItem>
      <ListboxItem key="3" showDivider>
        Edit file
      </ListboxItem>
      <ListboxItem key="4" className="text-danger" color="danger">
        Delete file
      </ListboxItem>
    </Listbox>
  </div>
);

export default LeftMenu;
