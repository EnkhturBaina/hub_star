import Messenger from "./Content/Messenger";
import PostedServices from "./Content/PostedServices";
import Profile from "./Content/Profile";

const MenuList: any[] = [
  {
    id: "1",
    title: "Профайл",
    key: "profile",
    content: <Profile />,
  },
  {
    id: "2",
    title: "Мессенжер",
    key: "messenger",
    content: <Messenger />,
  },
  {
    id: "3",
    title: "Байршуулсан үйлчилгээ",
    key: "posted_services",
    content: <PostedServices />,
  },
  {
    id: "4",
    title: "Хийгдэж буй ажил",
    key: "doing_services",
    content: <Profile />,
  },
  {
    id: "5",
    title: "Хадгалагдсан үйлчилгээнүүд",
    key: "saved_services",
    content: <Profile />,
  },
  {
    id: "6",
    title: "Үйлчилгээний түүх",
    key: "service_history",
    content: <Profile />,
  },
  {
    id: "7",
    title: "Дансны мэдээлэл",
    key: "account",
    content: <Profile />,
  },
  {
    id: "8",
    title: "Баталгаажуулалт",
    key: "confirmation",
    content: <Profile />,
  },
  {
    id: "9",
    title: "Нууц үг",
    key: "password",
    content: <Profile />,
  },
  {
    id: "10",
    title: "Мэдэгдэл",
    key: "notification",
    content: <Profile />,
  },
  {
    id: "11",
    title: "Зөвлөмжүүд",
    key: "advices",
    content: <Profile />,
  },
];

export default MenuList;
