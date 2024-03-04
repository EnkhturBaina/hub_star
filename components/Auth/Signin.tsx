"use client";
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { Divider } from "semantic-ui-react";
import toast, { Toaster } from "react-hot-toast";
import MainContext from "@/app/context/MainContext";
import axiosClient from "@/services/axiosInstance";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Signin = () => {
  const state = useContext(MainContext);
  const client = axiosClient();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string>("");

  const notify = () => toast.error(toastMsg);
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const login = () => {
    if (email == "") {
      notify();
      setToastMsg("И-Мэйл хаягаа оруулна уу.");
    } else if (isInvalid) {
      notify();
      setToastMsg("И-Мэйл хаяг буруу байна.");
    } else if (password == "") {
      notify();
      setToastMsg("Нууц үгээ оруулна уу.");
    } else {
      try {
        client
          .post("authentication/login", { email, password })
          .then((response) => {
            // console.log("response", response);

            state.setAuthUserData(response.data.response.user);
            setCookie("authUserData", response.data.response.user);
            setCookie("accessToken", response.data.response.accessToken);
            setCookie("refreshToken", response.data.response.refreshToken);

            router.push("/");
          })
          .catch((error) => {
            console.error("Error fetching :", error);
            notify();
            setToastMsg("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
          });
      } catch (error) {
        console.error("catch error :", error);
      }
    }
  };
  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 5000,
        }}
      />
      <section className="flex h-[calc(100vh-100px)] flex-wrap">
        <div className="relative flex h-full w-full flex-row">
          <div className="w-1/2">
            <Image
              src="/signin_bg.png"
              alt="Dotted"
              className="h-full w-full"
              height="1000"
              sizes="(max-width: 768px) 100vw, 100vw"
              width="1000"
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
            <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
              <Input
                key="username"
                type="email"
                label="И-Мэйл"
                labelPlacement="outside"
                placeholder="И-Мэйл"
                radius="sm"
                size="lg"
                variant="bordered"
                classNames={{
                  base: "mb-8",
                  label: "font-bold",
                  inputWrapper: ["custom-input-wrapper", "bg-white"],
                }}
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "default"}
                errorMessage={isInvalid && "И-Мэйл хаягаа зөв оруулна уу."}
                onValueChange={setEmail}
              />
              <Input
                key="password"
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
                onValueChange={setPassword}
              />
              {/* <Link className="text-primary" href="/"> */}
              <Button
                radius="full"
                className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                onClick={login}
              >
                Нэвтрэх
              </Button>
              {/* </Link> */}
              <div className="text-center text-sm">
                Та бүртгэлтэй юу?{" "}
                <Link className="text-primary" href="/auth/signup">
                  Бүртгүүлэх
                </Link>
              </div>
              <Divider
                horizontal
                className="!my-6 !text-xs !font-normal !normal-case !text-gray-400"
              >
                Эсвэл
              </Divider>
              <Button
                startContent={
                  <Image
                    src="/facebook.png"
                    alt="google"
                    height="20"
                    width="20"
                  />
                }
                radius="full"
                className="mb-2 flex w-full items-center justify-start rounded-md bg-primary font-bold leading-none text-white"
              >
                Continue with Facebook
              </Button>
              <Button
                startContent={
                  <Image
                    src="/google.png"
                    alt="facebook"
                    height="20"
                    width="20"
                  />
                }
                radius="full"
                className="mb-2 flex w-full justify-start rounded-md bg-white font-bold leading-none text-gray-400 shadow-md"
              >
                Continue with Google
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
