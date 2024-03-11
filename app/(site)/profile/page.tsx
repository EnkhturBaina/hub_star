"use client";
import LeftMenu from "@/components/Profile/LeftMenu";
import { Button } from "@nextui-org/react";
import { useContext, useLayoutEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import MenuList from "@/components/Profile/MenuList";
import {
  SidebarPusher,
  SidebarPushable,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { LuChevronLeft, LuLayoutGrid, LuMenu } from "react-icons/lu";
import MainContext from "@/app/context/MainContext";
import { redirect } from "next/navigation";

const Profile = () => {
  const state = useContext(MainContext);
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("profile");
  useLayoutEffect(() => {
    if (!state.authUserData) {
      redirect("/");
    }
  }, []);
  if (!state.authUserData) {
    return null;
  } else {
    return (
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl md:px-4 xl:px-0">
          <div
            className="relative flex flex-col rounded-xl bg-white"
            style={{ height: 330 }}
          >
            <div className="relative">
              <div
                style={{
                  backgroundImage: `url("/images/profile_bg.jpg")`,
                  backgroundSize: "100% 100%",
                }}
                className="relative h-64 w-full bg-cover bg-center"
              />
              <Button
                color="default"
                radius="full"
                variant="faded"
                startContent={<FaCamera className="text-lg" />}
                className="absolute bottom-8 right-10 bg-gray-300 text-base text-white"
              >
                Дэвсгэр зураг солих
              </Button>
              <div className="absolute -bottom-12 left-2 flex flex-row justify-between md:-bottom-28 md:left-30">
                <div className="relative md:mr-6">
                  <img
                    className="h-28 w-28 rounded-full border-5 border-white md:h-60 md:w-60"
                    src="https://i.ibb.co/6YbS9ff/avatar11.png"
                    alt=""
                  />
                  <div className="bottom-2 right-2 hidden cursor-pointer rounded-full bg-gray-100 p-3 text-black md:absolute">
                    <FaCamera className="text-3xl" />
                  </div>
                </div>
                <div className="-mb-12 flex flex-col justify-end md:mb-2">
                  <p className="mb-0 text-2xl font-bold text-black md:mb-2">
                    Б.Батзаяа
                  </p>
                  <p className="text-xl">
                    “Таван-Орд” ХХК - Маркетингийн менежер
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SidebarPushable
          as={Segment}
          className="custom-sidebar-base mx-auto mt-2 flex max-w-screen-xl flex-col gap-5 rounded-xl bg-mainProfileCardBg p-4 md:mt-6 lg:w-3/4 lg:flex-row"
        >
          <div
            className="ml-4 mt-2 w-fit rounded-xl bg-white p-4 md:hidden"
            onClick={() => setVisible(true)}
          >
            <LuMenu className="text-2xl" />
          </div>
          <div className="hidden md:block md:w-1/4">
            <LeftMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
          <Sidebar
            animation="overlay"
            icon="labeled"
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width="wide"
            className="!bg-white"
          >
            <div className="flex flex-row items-center justify-between border-b p-4">
              <div className="flex flex-row items-center justify-center">
                <LuLayoutGrid className="text-2xl" />
                <span className="ml-3 font-bold">Меню</span>
              </div>
              <LuChevronLeft
                className="text-2xl"
                onClick={() => setVisible(false)}
              />
            </div>
            <LeftMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </Sidebar>
          <SidebarPusher className="!w-full">
            <Segment className="!rounded-xl !border-0">
              {MenuList.map((el, index) => {
                if (el.key === selectedMenu) {
                  return <div key={index}>{el.content}</div>;
                }
              })}
            </Segment>
          </SidebarPusher>
        </SidebarPushable>
      </section>
    );
  }
};

export default Profile;
