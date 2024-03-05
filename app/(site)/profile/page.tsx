"use client";
import LeftMenu from "@/components/Profile/LeftMenu";
import { Badge, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import MenuList from "@/components/Profile/MenuList";
import {
  SidebarPusher,
  SidebarPushable,
  MenuItem,
  GridColumn,
  Checkbox,
  Grid,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("profile");
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="bg-gray-100 py-18 lg:py-18 xl:py-18">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8 xl:px-0">
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
              <div className="absolute -bottom-12 left-2 flex flex-row justify-between md:-bottom-28 md:bottom-12 md:left-30">
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
        <div className="mx-auto mt-2 flex max-w-screen-xl flex-col-reverse gap-5 md:mt-6 lg:flex-row">
          <div className="md:w-1/4">
            <Checkbox
              checked={visible}
              label="visible"
              onChange={(e, data) => setVisible(data.checked)}
            />
            <LeftMenu
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
          <SidebarPushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <LeftMenu
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
              />
            </Sidebar>
            <SidebarPusher>
              <Segment basic>
                <div className="rounded-xl bg-mainProfileCardBg p-4 lg:w-3/4">
                  {MenuList.map((el, index) => {
                    if (el.key === selectedMenu) {
                      return <div key={index}>{el.content}</div>;
                    }
                  })}
                </div>
                <Header as="h3">Application Content</Header>
              </Segment>
            </SidebarPusher>
          </SidebarPushable>
        </div>
      </section>
    </>
  );
};

export default Profile;
