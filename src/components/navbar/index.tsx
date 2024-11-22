import { AddIcon, HorizontalLogo, MessageIcon, NotificationIcon } from '@components/common/icons';
import { Button, Divider, Layout, Menu } from 'antd';
import Link from 'next/link';
import { UserNavigation } from '@datas/navigation';
import Image from 'next/image';
import { useAuthState } from '@context/auth';
import { useRouter } from 'next/router';
import AuthService from '@services/auth';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelsea.hagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Teams', href: '#', current: false },
  { name: 'Directory', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthState();
  const { Header, Content, Sider } = Layout;
  const router = useRouter();
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Header className="bg-white shadow-sm data-[open]:fixed data-[open]:inset-0 data-[open]:z-40 data-[open]:overflow-y-auto lg:static lg:overflow-y-visible data-[open]:lg:static data-[open]:lg:overflow-y-visible">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
            <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <HorizontalLogo className="h-8 w-auto hover:cursor-pointer" />
                </Link>
              </div>
            </div>
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-unit-md lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex lg:items-center lg:justify-end xl:col-span-4">
              {/* Profile dropdown */}
              {!isAuthenticated ? (
                <Link
                  href="/auth/signin"
                  className="ml-6 inline-flex items-center rounded-md bg-mainColor px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer"
                >
                  Нэвтрэх
                </Link>
              ) : (
                <>
                  <Menu
                    className="relative md:ml-5 shrink-0"
                    items={[
                      {
                        key: 1,
                        label: (
                          <div className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                          </div>
                        ),
                        children: UserNavigation.map((item, index) => ({
                          key: index,
                          label: <Link href={item.href}>{item.name}</Link>,
                          icon: item.icon,
                        })),
                      },
                    ]}
                  />
                  <Link
                    type="button"
                    href="/profile/my-notification"
                    className="relative md:ml-5 shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <NotificationIcon aria-hidden="true" className="size-6" />
                  </Link>
                  <Link
                    type="button"
                    href="/profile/message"
                    className="relative md:ml-5 shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <MessageIcon aria-hidden="true" className="size-6" />
                  </Link>
                  <Link
                    type="button"
                    href="/profile/my-notification"
                    className="relative md:ml-5 shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-offset-2"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Үйлчилгээ байршуулах</span>
                    <AddIcon aria-hidden="true" className="size-6" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* <PopoverPanel as="nav" aria-label="Global" className="lg:hidden">
          <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
            {navigation.map(item => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
              <div className="shrink-0">
                <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
              {userNavigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </PopoverPanel> */}
      </Header>
    </>
  );
};
export default Navbar;
