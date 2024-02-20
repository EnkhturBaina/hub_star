"use client";
import LeftMenu from "@/components/Profile/LeftMenu";
import { Badge, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import MenuList from "@/components/Profile/MenuList";

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 xl:px-0">
          <div
            className="relative flex flex-col rounded-xl bg-white"
            style={{ height: 480 }}
          >
            <div className="relative">
              {/* <img
                alt="p_bg"
                src={"/images/profile_bg.jpg"}
                className="relative h-96 w-full"
              /> */}
              <div
                style={{
                  backgroundImage: `url("/images/profile_bg.jpg")`,
                  backgroundSize: "100% 100%",
                }}
                className="relative h-96 w-full bg-cover bg-center"
              ></div>
              <Button
                color="default"
                radius="full"
                variant="faded"
                startContent={<FaCamera className="text-lg" />}
                className="absolute bottom-8 right-10 bg-gray-300 text-base text-white"
              >
                Дэвсгэр зураг солих
              </Button>
            </div>
            <div className="absolute bottom-12 left-30 flex flex-row ">
              <div className="relative">
                <img
                  className="h-60 w-60 rounded-full border-5 border-white"
                  src="https://i.ibb.co/6YbS9ff/avatar11.png"
                  alt=""
                />
                <div className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-gray-100 p-3 text-black">
                  <FaCamera className="text-3xl" />
                </div>
              </div>
              <div className="mb-2 ml-14 flex flex-col justify-end">
                <p className="text-2xl font-bold text-black">Б.Батзаяа</p>
                <p className="text-xl">
                  “Таван-Орд” ХХК - Маркетингийн менежер
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-screen-xl flex-col-reverse gap-5 lg:flex-row">
          <div className="md:w-1/4">
            <LeftMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
          <div className="rounded-xl bg-mainProfileCardBg p-4 lg:w-3/4">
            {MenuList.map((el, index) => {
              if (el.key === selectedMenu) {
                return <div key={index}>{el.content}</div>;
              }
            })}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default Profile;
