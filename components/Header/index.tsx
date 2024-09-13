'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Divider } from '@nextui-org/react';
import SearchBox from '../SearchBox';
import { useAppContext } from '@/app/app-context';
import AuthName from '../Auth/auth-name';
import useSocket from '@/service/socket-client';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { emptyAdvParam, setNotfParam } from '@/app/lib/features/adv-param';
import { useTypedSelector } from '@/app/lib/reducer';
import SpecialTypeMenu from './SpecialTypeMenu';
import UserTypeMenu from './UserTypeMenu';
import { ReferenceService } from '@/service/reference/reference.service';
import AdvicesTypeMenu from './AdvicesTypeMenu';
import { getCookie } from 'cookies-next';

const Header = () => {
  const { user } = useAppContext();
  const advParam = useTypedSelector(state => state.advParam);
  const dispatch = useDispatch();
  const router = useRouter();
  const socket = useSocket();

  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [countNoti, setCountNoti] = useState(advParam.notification || 0);
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
    if (getCookie('access-token')) {
      ReferenceService.getNotification({ receiveBy: user?.id }).then(res => {
        if (res.success) {
          dispatch(
            setNotfParam({
              notification: res.response.reduce((total, item) => total + (item.isSeen ? 0 : 1), 0),
            })
          );
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      console.log('Attempting to connect...');
      socket.on('connect', () => {
        console.log('Connected!');
      });
      const handleNotification = (count: number) => {
        dispatch(
          setNotfParam({
            notification: count,
          })
        );
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
      className={`fixed left-0 top-0 !z-999 w-full bg-white ${
        pathUrl === '/profile' ? 'py-4' : 'pt-0'
      } shadow ${stickyMenu ? 'shadow transition duration-100' : ''}`}
    >
      <div className="pt-4 relative mx-auto flex max-w-screen-xl flex-row items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="w-full mr-4 flex gap-8 items-center justify-between">
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
          <div className="hidden w-full max-w-[80%] h-fit md:block">
            <SearchBox />
          </div>
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
                    src={
                      user.avatarId
                        ? process.env.NEXT_PUBLIC_MEDIA_URL + user.avatarId
                        : '/images/user/user.png'
                    }
                    className="h-12 w-12 text-lg"
                    onClick={() => router.pathname === '/profile/information'}
                  />
                  <div className="hidden md:block">
                    <AuthName user={user} />
                  </div>
                </Link>

                <div className="flex w-30 flex-row justify-around gap-2">
                  <Link href="/profile/notification">
                    <Badge content={advParam.notification || 0}>
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3890_5893)">
                          <path
                            d="M15 13.1508C14.4875 13.1508 14.0625 12.7258 14.0625 12.2133V8.05078C14.0625 7.53828 14.4875 7.11328 15 7.11328C15.5125 7.11328 15.9375 7.53828 15.9375 8.05078V12.2133C15.9375 12.7383 15.5125 13.1508 15 13.1508Z"
                            fill="#212529"
                          />
                          <path
                            d="M15.025 25.4383C11.8 25.4383 8.58746 24.9258 5.52496 23.9008C4.38746 23.5258 3.52496 22.7133 3.14996 21.6883C2.77496 20.6633 2.89996 19.4883 3.51246 18.4633L5.09996 15.8133C5.44996 15.2258 5.76246 14.1258 5.76246 13.4383V10.8133C5.76246 5.70078 9.91246 1.55078 15.025 1.55078C20.1375 1.55078 24.2875 5.70078 24.2875 10.8133V13.4383C24.2875 14.1133 24.6 15.2258 24.95 15.8133L26.5375 18.4633C27.125 19.4383 27.225 20.6008 26.8375 21.6633C26.45 22.7258 25.6 23.5383 24.525 23.9008C21.4625 24.9383 18.25 25.4383 15.025 25.4383ZM15.025 3.43828C10.95 3.43828 7.63746 6.75078 7.63746 10.8258V13.4508C7.63746 14.4633 7.23746 15.9258 6.71246 16.7883L5.12496 19.4508C4.79996 19.9883 4.72496 20.5633 4.91246 21.0633C5.09996 21.5633 5.52496 21.9383 6.12496 22.1383C11.875 24.0508 18.2 24.0508 23.95 22.1383C24.4875 21.9633 24.9 21.5633 25.0875 21.0383C25.2875 20.5133 25.225 19.9383 24.9375 19.4508L23.35 16.8008C22.825 15.9383 22.425 14.4758 22.425 13.4633V10.8383C22.4125 6.75078 19.1 3.43828 15.025 3.43828Z"
                            fill="#212529"
                          />
                          <path
                            d="M15 28.6254C13.6625 28.6254 12.35 28.0754 11.4 27.1254C10.45 26.1754 9.90002 24.8629 9.90002 23.5254H11.775C11.775 24.3754 12.125 25.2004 12.725 25.8004C13.325 26.4004 14.15 26.7504 15 26.7504C16.775 26.7504 18.225 25.3004 18.225 23.5254H20.1C20.1 26.3379 17.8125 28.6254 15 28.6254Z"
                            fill="#212529"
                          />
                        </g>
                        <circle cx="24.5" cy="24.5" r="5.5" fill="#FF2424" />
                        <defs>
                          <clipPath id="clip0_3890_5893">
                            <rect width="30" height="30" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Badge>
                  </Link>
                  <Link href="/profile/messenger">
                    <Badge content={messages.length}>
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3890_5902)">
                          <path
                            d="M12.4875 28.475C11.7375 28.475 11.025 28.1 10.5375 27.4375L9.03751 25.4375C9.03751 25.45 8.975 25.4125 8.95 25.4125H8.48751C4.21251 25.4125 1.5625 24.25 1.5625 18.4875V13.4875C1.5625 8.22501 4.77501 6.85001 7.47501 6.61251C7.77501 6.57501 8.12501 6.5625 8.48751 6.5625H16.4875C21.0125 6.5625 23.4125 8.96251 23.4125 13.4875V18.4875C23.4125 18.85 23.4 19.2 23.35 19.5375C23.125 22.2 21.75 25.4125 16.4875 25.4125H15.9875L14.4375 27.4375C13.95 28.1 13.2375 28.475 12.4875 28.475ZM8.48751 8.4375C8.20001 8.4375 7.92501 8.45 7.66251 8.475C4.76251 8.725 3.4375 10.3125 3.4375 13.4875V18.4875C3.4375 22.775 4.76251 23.5375 8.48751 23.5375H8.9875C9.55 23.5375 10.1875 23.85 10.5375 24.3L12.0375 26.3125C12.3125 26.6875 12.6625 26.6875 12.9375 26.3125L14.4375 24.3125C14.8 23.825 15.375 23.5375 15.9875 23.5375H16.4875C19.6625 23.5375 21.25 22.2 21.4875 19.35C21.525 19.05 21.5375 18.775 21.5375 18.4875V13.4875C21.5375 10 19.975 8.4375 16.4875 8.4375H8.48751Z"
                            fill="#212529"
                          />
                          <path
                            d="M12.4878 17.7383C11.7878 17.7383 11.2378 17.1758 11.2378 16.4883C11.2378 15.8008 11.8003 15.2383 12.4878 15.2383C13.1753 15.2383 13.7378 15.8008 13.7378 16.4883C13.7378 17.1758 13.1878 17.7383 12.4878 17.7383Z"
                            fill="#212529"
                          />
                          <path
                            d="M16.4874 17.7383C15.7874 17.7383 15.2374 17.1758 15.2374 16.4883C15.2374 15.8008 15.7999 15.2383 16.4874 15.2383C17.1749 15.2383 17.7374 15.8008 17.7374 16.4883C17.7374 17.1758 17.1749 17.7383 16.4874 17.7383Z"
                            fill="#212529"
                          />
                          <path
                            d="M8.49976 17.7383C7.79976 17.7383 7.24976 17.1758 7.24976 16.4883C7.24976 15.8008 7.81226 15.2383 8.49976 15.2383C9.18726 15.2383 9.74976 15.8008 9.74976 16.4883C9.74976 17.1758 9.18726 17.7383 8.49976 17.7383Z"
                            fill="#212529"
                          />
                          <path
                            d="M22.4252 20.3625C22.1752 20.3625 21.9252 20.2625 21.7502 20.075C21.5502 19.875 21.4627 19.5875 21.5002 19.3125C21.5377 19.05 21.5502 18.775 21.5502 18.4875V13.4875C21.5502 10 19.9877 8.4375 16.5002 8.4375H8.50015C8.21265 8.4375 7.93769 8.45 7.67518 8.475C7.40018 8.5125 7.11267 8.41248 6.91267 8.22498C6.71267 8.02498 6.60015 7.75001 6.62515 7.47501C6.85015 4.77501 8.23765 1.5625 13.5002 1.5625H21.5002C26.0252 1.5625 28.4252 3.96251 28.4252 8.48751V13.4875C28.4252 18.75 25.2127 20.125 22.5127 20.3625C22.4752 20.3625 22.4502 20.3625 22.4252 20.3625ZM8.65018 6.5625H16.4877C21.0127 6.5625 23.4127 8.96251 23.4127 13.4875V18.325C25.5377 17.8 26.5377 16.2375 26.5377 13.4875V8.48751C26.5377 5.00001 24.9752 3.4375 21.4877 3.4375H13.4877C10.7377 3.4375 9.18768 4.4375 8.65018 6.5625Z"
                            fill="#212529"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3890_5902">
                            <rect width="30" height="30" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Badge>
                  </Link>
                  <Link href="/profile/post-service">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3890_5912)">
                        <path
                          opacity="0.4"
                          d="M15 27.5C21.9036 27.5 27.5 21.9036 27.5 15C27.5 8.09644 21.9036 2.5 15 2.5C8.09644 2.5 2.5 8.09644 2.5 15C2.5 21.9036 8.09644 27.5 15 27.5Z"
                          fill="#0C0507"
                        />
                        <path
                          d="M20 14.0625H15.9375V10C15.9375 9.4875 15.5125 9.0625 15 9.0625C14.4875 9.0625 14.0625 9.4875 14.0625 10V14.0625H10C9.4875 14.0625 9.0625 14.4875 9.0625 15C9.0625 15.5125 9.4875 15.9375 10 15.9375H14.0625V20C14.0625 20.5125 14.4875 20.9375 15 20.9375C15.5125 20.9375 15.9375 20.5125 15.9375 20V15.9375H20C20.5125 15.9375 20.9375 15.5125 20.9375 15C20.9375 14.4875 20.5125 14.0625 20 14.0625Z"
                          fill="#0C0507"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3890_5912">
                          <rect width="30" height="30" fill="white" />
                        </clipPath>
                      </defs>
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
      {/^\/profile\/.*/.test(pathUrl) ||
        /^\/other-profile\.*/.test(pathUrl) ||
        /^\/docs\.*/.test(pathUrl) || (
          <div className="no-scrollbar mt-2 flex overflow-y-scroll md:justify-center">
            <nav className="w-full">
              {advParam?.specialService ? (
                <SpecialTypeMenu />
              ) : router.pathname.includes('advice') ? (
                <AdvicesTypeMenu />
              ) : (
                <UserTypeMenu />
              )}
            </nav>
          </div>
        )}
    </header>
  );
};

// w-full delay-300

export default Header;
