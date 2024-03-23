"use client";

import { motion } from "framer-motion";
import { Button, Input, Textarea } from "@nextui-org/react";
import MainContext from "@/app/context/MainContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserData } from "@/types/userData";
import axiosClient from "@/services/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import ProfileFields from "@/components/Skeleton/ProfileFields";

const Profile = () => {
  const state = useContext(MainContext);
  const client = axiosClient();
  const [profileData, setProfileData] = useState<UserData>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const validateEmail = (value) =>
    value?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  useEffect(() => {
    if (profileData == null) {
      setProfileData(state?.authUserData);
    }
  }, []);

  const isInvalid = useMemo(() => {
    if (profileData?.email === "") return false;

    return validateEmail(profileData?.email) ? false : true;
  }, [profileData?.email]);

  const saveProfile = () => {
    if (!profileData?.lastName) {
      toast.error("Овог оруулна уу.");
    } else if (!profileData?.firstName) {
      toast.error("Нэрээ оруулна уу.");
    } else if (!profileData?.jobPosition) {
      toast.error("Албан тушаал оруулна уу.");
    } else if (profileData?.phone == "") {
      toast.error("Утасны дугаараа оруулна уу.");
    } else if (profileData?.email == "") {
      toast.error("И-Мэйл хаягаа оруулна уу.");
    } else if (isInvalid) {
      toast.error("И-Мэйл хаяг буруу байна.");
    } else if (profileData?.email == "") {
      toast.error("Хаяг оруулна уу.");
    } else {
      setIsSaving(true);
      console.log("profileData", profileData);
      try {
        client
          .patch("users/" + profileData?.id, {
            lastName: profileData?.lastName,
            firstName: profileData?.firstName,
            jobPosition: profileData?.jobPosition,
            phone: profileData?.phone,
            email: profileData?.email,
            address: profileData?.address,
          })
          .then((response) => {
            state?.setAuthUserData(response?.data?.response);
            setIsSaving(false);
            toast.success("Амжилттай хадгаллаа");
          })
          .catch((error) => {
            console.error("Error fetching :", error);
          });
      } catch (error) {
        console.error("catch error :", error);
      }
    }
  };

  return (
    <>
      {profileData == null ? (
        <ProfileFields />
      ) : (
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
          className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden p-2"
        >
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
          <Input
            key="lName"
            type="text"
            label="Овог"
            labelPlacement="outside"
            placeholder="Овог"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={profileData?.lastName || ""}
            onValueChange={(e) => {
              setProfileData((prevState: UserData) => ({
                ...prevState,
                lastName: e,
              }));
            }}
          />
          <Input
            key="fName"
            type="text"
            label="Нэр"
            labelPlacement="outside"
            placeholder="Нэр"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={profileData?.firstName || ""}
            onValueChange={(e) => {
              setProfileData((prevState: UserData) => ({
                ...prevState,
                firstName: e,
              }));
            }}
          />
          <Input
            key="position"
            type="text"
            label="Албан тушаал"
            labelPlacement="outside"
            placeholder="Албан тушаал"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={profileData?.jobPosition || ""}
            onValueChange={(e) => {
              setProfileData((prevState: UserData) => ({
                ...prevState,
                jobPosition: e,
              }));
            }}
          />
          <Input
            key="mobileNumber"
            type="text"
            label="Утасны дугаар"
            labelPlacement="outside"
            placeholder="Утасны дугаар"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={profileData?.phone || ""}
            onValueChange={(e) => {
              setProfileData((prevState: UserData) => ({
                ...prevState,
                phone: e,
              }));
            }}
          />
          <Input
            key="email"
            type="email"
            label="И-мэйл хаяг"
            labelPlacement="outside"
            placeholder="И-мэйл хаяг"
            radius="sm"
            size="lg"
            variant="bordered"
            classNames={{
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            errorMessage={isInvalid && "И-Мэйл хаягаа зөв оруулна уу."}
            value={profileData?.email || ""}
            onValueChange={(e) => {
              setProfileData((prevState: UserData) => ({
                ...prevState,
                email: e,
              }));
            }}
          />
          <Textarea
            variant="bordered"
            label="Хаяг"
            labelPlacement="outside"
            radius="sm"
            placeholder="Хаяг"
            classNames={{
              base: "w-full",
              label: "font-bold",
              inputWrapper: ["custom-input-wrapper", "bg-white"],
            }}
            value={profileData?.address || ""}
            onValueChange={(e) => {
              setProfileData((prevState: UserData) => ({
                ...prevState,
                address: e,
              }));
            }}
          />
          <div className="flex flex-row justify-end">
            <Button
              className="mr-4 bg-mainColor !text-white"
              radius="sm"
              size="md"
              onClick={saveProfile}
              isDisabled={isSaving}
            >
              Хадгалах
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Profile;
