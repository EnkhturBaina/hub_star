"use client";
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Divider } from "semantic-ui-react";

const Signin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="flex h-[calc(100vh-90px)] flex-wrap">
        <div className="relative flex h-full w-full flex-row">
          <div className="w-1/2">
            <Image
              src="/signin_bg.png"
              alt="Dotted"
              className="h-full w-full"
              height="800"
              sizes="(max-width: 768px) 100vw, 33vw"
              width="800"
              objectFit="contain"
            />
          </div>
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top flex w-1/2 items-center justify-center"
          >
            <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-white p-6 shadow-solid-13">
              <Input
                key="username"
                type="text"
                label="И-Мэйл эсвэл утасны дугаар"
                labelPlacement="outside"
                placeholder="И-Мэйл эсвэл утасны дугаар"
                radius="sm"
                size="lg"
                variant="bordered"
                classNames={{
                  base: "mb-8",
                  label: "font-bold",
                  inputWrapper: ["custom-input-wrapper", "bg-white"],
                }}
              />
              <Input
                key="username"
                type="password"
                label="Нууц үг"
                labelPlacement="outside"
                placeholder="Нууц үг"
                radius="sm"
                size="lg"
                variant="bordered"
                classNames={{
                  base: "mb-8",
                  label: "font-bold",
                  inputWrapper: ["custom-input-wrapper", "bg-white"],
                }}
              />
              <Button
                radius="full"
                className="mb-2 w-full rounded-md bg-mainColor font-bold text-white"
              >
                Нэвтрэх
              </Button>
              <div className="text-center text-sm">
                Та бүртгэлтэй юу?{" "}
                <Link className="text-primary" href="/auth/signup">
                  Бүртгүүлэх
                </Link>
              </div>
              <Divider
                horizontal
                className="!font-normal !normal-case !text-gray-400"
              >
                Эсвэл
              </Divider>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
