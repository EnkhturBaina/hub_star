"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

const SearchBox = () => {
  // Sticky menu
  const [dropdownToggler, setDropdownToggler] = useState(false);

  return (
    <div className="">
      <Button onClick={() => setDropdownToggler(!dropdownToggler)}>Бүгд</Button>
      <Input
        type="number"
        label=""
        placeholder="0.00"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small"></span>
          </div>
        }
      />
    </div>
  );
};

export default SearchBox;
