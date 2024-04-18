import { Avatar, Chip, Divider, Input, Textarea } from '@nextui-org/react';
import { CiSearch } from 'react-icons/ci';
import { FaSmile } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { BiSend } from 'react-icons/bi';
import ProfileLayout from '@/layouts/profile.layout';

const Messenger = () => {
  return (
    <ProfileLayout>
      <div className="max-h-[600px] w-full overflow-hidden">
        <div className="flex flex-row gap-4">
          <div className="w-2/3 rounded-md border border-stroke bg-white">
            <div className="flex items-center gap-2 p-4">
              <Avatar
                alt="avatar"
                className="flex-shrink-0"
                size="sm"
                src="/images/user/user-01.png"
              />
              <div className="flex flex-col">
                <span className="text-small font-bold">М.Мөнгөн-Чимэг</span>
                <span className="text-tiny text-default-400">Худалдааны зөвлөх</span>
              </div>
            </div>
            <Divider className="mb-4" />
            <div className="flex h-full max-h-[520px] w-full flex-col overflow-hidden rounded-lg bg-white">
              <div className="flex h-0 flex-grow flex-col overflow-auto p-4">
                <div className="mt-2 flex w-full max-w-xs space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                </div>
                <div className="ml-auto mt-2 flex w-full max-w-xs justify-end space-x-3">
                  <div>
                    <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                      </p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                </div>
                <div className="ml-auto mt-2 flex w-full max-w-xs justify-end space-x-3">
                  <div>
                    <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                      <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                </div>
                <div className="mt-2 flex w-full max-w-xs space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.{' '}
                      </p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                </div>
                <div className="ml-auto mt-2 flex w-full max-w-xs justify-end space-x-3">
                  <div>
                    <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.{' '}
                      </p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                </div>
                <div className="ml-auto mt-2 flex w-full max-w-xs justify-end space-x-3">
                  <div>
                    <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt.
                      </p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                </div>
                <div className="ml-auto mt-2 flex w-full max-w-xs justify-end space-x-3">
                  <div>
                    <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                      <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                </div>
                <div className="mt-2 flex w-full max-w-xs space-x-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.{' '}
                      </p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                </div>
                <div className="ml-auto mt-2 flex w-full max-w-xs justify-end space-x-3">
                  <div>
                    <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                      <p className="text-sm">Lorem ipsum dolor sit.</p>
                    </div>
                    <span className="text-xs leading-none text-gray-500">2 min ago</span>
                  </div>
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 rounded-md border-1 border-mainBgGray px-4">
                <FaSmile className="cursor-pointer text-3xl text-mainBgGray" />
                <Textarea
                  key="flat"
                  variant="flat"
                  label=""
                  labelPlacement="outside"
                  placeholder="Зурвас илгээх"
                  classNames={{
                    base: 'col-span-12 mb-6 md:col-span-6 md:mb-0',
                    inputWrapper: 'rounded-md bg-white shadow-none',
                  }}
                />
                <IoIosAdd className="cursor-pointer text-4xl text-mainBgGray" />
                <BiSend className="cursor-pointer rounded-md bg-mainColor p-1 text-4xl text-white" />
              </div>
            </div>
          </div>
          <div className="flex w-1/3 flex-col rounded-md border border-stroke bg-white p-6">
            <Input
              type="text"
              label=""
              placeholder="Хайх"
              labelPlacement="outside"
              radius="sm"
              size="md"
              variant="bordered"
              classNames={{
                base: 'mb-4',
                label: 'font-bold',
                inputWrapper: ['custom-input-wrapper', 'bg-white'],
              }}
              startContent={
                <CiSearch className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
              }
            />
            <Divider />
            <div className="mt-2 flex h-full max-h-screen flex-grow flex-col gap-y-4 overflow-y-auto py-4 pr-2">
              {[...new Array(36)].map((element, i) => {
                return (
                  <div className="flex cursor-pointer items-center gap-2" key={i}>
                    <Avatar
                      alt={`avatar-${i}`}
                      className="flex-shrink-0"
                      size="sm"
                      src="/images/user/user-01.png"
                    />
                    <div className="flex w-full flex-row items-center justify-between">
                      <span className="text-small font-bold">axaxa - {i}</span>
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: 'bg-mainColor border-small',
                          content: 'drop-shadow shadow-black text-white px-1',
                        }}
                      >
                        {i}
                      </Chip>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Messenger;
