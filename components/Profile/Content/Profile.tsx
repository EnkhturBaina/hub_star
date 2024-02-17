"use client";

import { Input } from "@nextui-org/react";

const Profile = () => {
  return (
    <div className="mb-4 w-full overflow-hidden">
      <Input
        key="outside"
        type="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        radius="sm"
        size="lg"
        variant="bordered"
        classNames={{
          label: "font-bold",
          inputWrapper:
            "bg-white !focus:outline-none !focus-visible:ring-2 !focus-visible:ring-rose-500",
        }}
      />
    </div>
  );
};

export default Profile;
