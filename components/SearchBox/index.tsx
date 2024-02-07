"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import moduleName from "";
import Image from "next/image";

const SearchBox = () => {
  // Sticky menu
  const [dropdownToggler, setDropdownToggler] = useState(false);

  return (
    <div className="flex w-full flex-row">
      <Button
        radius="none"
        onClick={() => setDropdownToggler(!dropdownToggler)}
        className="rounded-l"
      >
        Бүгд
      </Button>
      <Input
        // type="search"
        label=""
        placeholder="0.00"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small"></span>
          </div>
        }
        radius="none"
        size="sm"
        isClearable
        onClear={() => console.log("input cleared")}
        className="h-10"
      />
      <Button
        radius="none"
        isIconOnly
        aria-label="Like"
        className="h-10 w-10 rounded-r bg-black"
      >
        <Image
          src="/search.svg"
          alt="logo"
          width={20}
          height={20}
          className="block"
        />
      </Button>
    </div>
  );
};

export default SearchBox;
