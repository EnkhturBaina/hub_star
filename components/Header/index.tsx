'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Divider } from '@nextui-org/react';
import SearchBox from '../SearchBox';
import HeaderMenu from './HeaderMenu';
import { useAppContext } from '@/app/app-context';
import AuthName from '../Auth/auth-name';
import useSocket from '@/service/socket-client';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { emptyAdvParam } from '@/app/lib/features/adv-param';

const Header = () => {
  const { user } = useAppContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const socket = useSocket();
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [countNoti, setCountNoti] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  const handleHome = () => {
    dispatch(emptyAdvParam());
    router.push('/');
  };
  useEffect(() => {
    if (socket) {
      console.log('Attempting to connect...');
      socket.on('connect', () => {
        console.log('Connected!');
      });
      const handleNotification = (count: number) => {
        setCountNoti(count);
      };
      socket.on('notification', handleNotification);
      return () => {
        socket.off('notification', handleNotification);
      };
    }
  }, [socket]);
  useEffect(() => {
    window.addEventListener('scroll', handleStickyMenu);
  });
  return (
    <header
      className={`fixed left-0 top-0 z-999 w-full bg-white ${
        pathUrl === '/profile' ? 'py-4' : 'pt-0'
      } shadow ${stickyMenu ? 'shadow transition duration-100' : ''}`}
    >
      <div className="pt-4 relative mx-auto flex max-w-screen-xl flex-row items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="mr-4 flex items-center justify-between">
          {/* <Image
            src="/images/logo/svg_logo.svg"
            alt="logo"
            onClick={() => {
              router.push('/');
              setAdParam(prev => ({ ...prev, userType: undefined }));
            }}
            priority
            className="rounded-md object-contain object-center hover:cursor-pointer h-20 w-50"
            width="0"
            height="0"
            sizes="100vw"
          /> */}
          <div style={{ position: 'relative', width: '170px', height: '50px' }}>
            <Image
              src="/images/logo/svg_logo.svg"
              alt="main_logo"
              className="rounded-t-lg object-cover hover:cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onClick={() => handleHome()}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
        <div className="hidden w-full md:block">
          <SearchBox />
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`visible flex h-auto w-full max-w-fit items-center justify-between ${
            navigationOpen &&
            'navbar !visible mt-4 h-auto max-h-[400px] rounded-md p-7.5 xl:h-auto xl:p-0 xl:shadow-none'
          }`}
        >
          <Divider orientation="vertical" className="mx-5 h-10 sm:mx-1 md:mx-2 xl:mx-5 xl:block" />
          <div className="flex flex-row items-center">
            {!user ? (
              <Link className="text-black hover:text-primary " href="/auth/signin">
                <Button radius="sm" className="h-12">
                  <span className="font-bold">Нэвтрэх</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/profile/information" className="flex flex-row items-center">
                  <Avatar
                    name={user?.firstName}
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + user.avatarId}
                    className="h-12 w-12 text-lg"
                  />
                  <div className="hidden md:block">
                    <AuthName user={user} />
                  </div>
                </Link>
                <div className="flex w-30 flex-row justify-around gap-2">
                  <Link href="/profile/notification">
                    <Badge content={countNoti}>
                      <svg
                        viewBox="0 0 30 30"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 cursor-pointer fill-waterloo group-hover:fill-primary"
                      >
                        <path
                          d="M25.2375 17.575L23.825 15.225C23.5125 14.7125 23.2375 13.725 23.2375 13.125V10.7875C23.2375 6.25 19.55 2.5625 15.025 2.5625C10.4875 2.575 6.80001 6.25 6.80001 10.7875V13.1125C6.80001 13.7125 6.52501 14.7 6.22501 15.2125L4.81251 17.5625C4.27501 18.475 4.15001 19.5125 4.48751 20.4125C4.82501 21.325 5.58751 22.05 6.58751 22.375C7.93751 22.825 9.30001 23.15 10.6875 23.3875C10.825 23.4125 10.9625 23.425 11.1 23.45C11.275 23.475 11.4625 23.5 11.65 23.525C11.975 23.575 12.3 23.6125 12.6375 23.6375C13.425 23.7125 14.225 23.75 15.025 23.75C15.8125 23.75 16.6 23.7125 17.375 23.6375C17.6625 23.6125 17.95 23.5875 18.225 23.55C18.45 23.525 18.675 23.5 18.9 23.4625C19.0375 23.45 19.175 23.425 19.3125 23.4C20.7125 23.175 22.1 22.825 23.45 22.375C24.4125 22.05 25.15 21.325 25.5 20.4C25.85 19.4625 25.75 18.4375 25.2375 17.575ZM15.9375 12.5C15.9375 13.025 15.5125 13.45 14.9875 13.45C14.4625 13.45 14.0375 13.025 14.0375 12.5V8.625C14.0375 8.1 14.4625 7.675 14.9875 7.675C15.5125 7.675 15.9375 8.1 15.9375 8.625V12.5Z"
                          fill="#212529"
                        />
                        <path
                          d="M18.5375 25.0125C18.0125 26.4625 16.625 27.5 15 27.5C14.0125 27.5 13.0375 27.1 12.35 26.3875C11.95 26.0125 11.65 25.5125 11.475 25C11.6375 25.025 11.8 25.0375 11.975 25.0625C12.2625 25.1 12.5625 25.1375 12.8625 25.1625C13.575 25.225 14.3 25.2625 15.025 25.2625C15.7375 25.2625 16.45 25.225 17.15 25.1625C17.4125 25.1375 17.675 25.125 17.925 25.0875C18.125 25.0625 18.325 25.0375 18.5375 25.0125Z"
                          fill="#212529"
                        />
                        {/* <circle cx="24.5" cy="24.5" r="5.5" fill="#FFC824" /> */}
                      </svg>
                    </Badge>
                  </Link>
                  <Link href="/profile/messenger">
                    <Badge content={messages.length}>
                      <svg
                        viewBox="0 0 30 30"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 cursor-pointer fill-waterloo group-hover:fill-primary"
                      >
                        <path
                          d="M16.4875 7.5H8.4875C8.1625 7.5 7.85 7.5125 7.55 7.55C4.1875 7.8375 2.5 9.825 2.5 13.4875V18.4875C2.5 23.4875 4.5 24.475 8.4875 24.475H8.9875C9.2625 24.475 9.625 24.6625 9.7875 24.875L11.2875 26.875C11.95 27.7625 13.025 27.7625 13.6875 26.875L15.1875 24.875C15.375 24.625 15.675 24.475 15.9875 24.475H16.4875C20.15 24.475 22.1375 22.8 22.425 19.425C22.4625 19.125 22.475 18.8125 22.475 18.4875V13.4875C22.475 9.5 20.475 7.5 16.4875 7.5ZM8.125 17.5C7.425 17.5 6.875 16.9375 6.875 16.25C6.875 15.5625 7.4375 15 8.125 15C8.8125 15 9.375 15.5625 9.375 16.25C9.375 16.9375 8.8125 17.5 8.125 17.5ZM12.4875 17.5C11.7875 17.5 11.2375 16.9375 11.2375 16.25C11.2375 15.5625 11.8 15 12.4875 15C13.175 15 13.7375 15.5625 13.7375 16.25C13.7375 16.9375 13.1875 17.5 12.4875 17.5ZM16.8625 17.5C16.1625 17.5 15.6125 16.9375 15.6125 16.25C15.6125 15.5625 16.175 15 16.8625 15C17.55 15 18.1125 15.5625 18.1125 16.25C18.1125 16.9375 17.55 17.5 16.8625 17.5Z"
                          fill="#212529"
                        />
                        <path
                          d="M27.475 8.4875V13.4875C27.475 15.9875 26.7 17.6875 25.15 18.625C24.775 18.85 24.3375 18.55 24.3375 18.1125L24.35 13.4875C24.35 8.4875 21.4875 5.625 16.4875 5.625L8.875 5.6375C8.4375 5.6375 8.1375 5.2 8.3625 4.825C9.3 3.275 11 2.5 13.4875 2.5H21.4875C25.475 2.5 27.475 4.5 27.475 8.4875Z"
                          fill="#0C0507"
                        />
                      </svg>
                    </Badge>
                  </Link>
                  <Link href="/profile/post-service">
                    <svg
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 cursor-pointer fill-waterloo group-hover:fill-primary"
                    >
                      <path
                        d="M15 2.5C8.1125 2.5 2.5 8.1125 2.5 15C2.5 21.8875 8.1125 27.5 15 27.5C21.8875 27.5 27.5 21.8875 27.5 15C27.5 8.1125 21.8875 2.5 15 2.5ZM20 15.9375H15.9375V20C15.9375 20.5125 15.5125 20.9375 15 20.9375C14.4875 20.9375 14.0625 20.5125 14.0625 20V15.9375H10C9.4875 15.9375 9.0625 15.5125 9.0625 15C9.0625 14.4875 9.4875 14.0625 10 14.0625H14.0625V10C14.0625 9.4875 14.4875 9.0625 15 9.0625C15.5125 9.0625 15.9375 9.4875 15.9375 10V14.0625H20C20.5125 14.0625 20.9375 14.4875 20.9375 15C20.9375 15.5125 20.5125 15.9375 20 15.9375Z"
                        fill="#212529"
                      />
                    </svg>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mx-4 mt-2 block md:hidden">
        <SearchBox />
      </div>
      {pathUrl === '/profile/information' ||
        pathUrl === '/profile/messenger' ||
        pathUrl === '/profile/posted-services' ||
        pathUrl === '/profile/doing-services' ||
        pathUrl === '/profile/saved-services' ||
        pathUrl === '/profile/service-history' ||
        pathUrl === '/profile/account' ||
        pathUrl === '/profile/confirmation' ||
        pathUrl === '/profile/password' ||
        pathUrl === '/profile/notification' ||
        pathUrl === '/profile/post-service' ||
        (pathUrl !== '/profile/advices' && (
          <div className="no-scrollbar mt-2 flex overflow-y-scroll md:justify-center">
            <nav>
              <HeaderMenu />
            </nav>
          </div>
        ))}
    </header>
  );
};

// w-full delay-300

export default Header;
