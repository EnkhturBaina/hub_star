import { setAccessToken } from '@/service/api.service';
import { AuthService } from '@/service/authentication/authentication.service';
import { Button, Input, Divider } from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { EyeDropperIcon, EyeIcon } from '@heroicons/react/20/solid';

const Signin = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [show, setShow] = useState('password');

  const login = () => {
    if (username == '') {
      toast.error('И-Мэйл эсвэл утас оруулна уу.');
    } else if (password == '') {
      toast.error('Нууц үгээ оруулна уу.');
    } else {
      try {
        AuthService.login({ username, password })
          .then(response => {
            setAccessToken(response.response.accessToken);
            router.push('/');
          })
          .catch(error => {
            if (error.response?.status === 400) {
              toast.error('Нэвтрэх нэр эсвэл нууц үг буруу байна.');
            }
          });
      } catch (error) {
        console.error('catch error :', error);
      }
    }
  };
  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="flex h-[calc(100vh-100px)] flex-wrap">
        <div className="relative flex h-full w-full flex-col justify-center lg:flex-row">
          <div className="relative hidden h-full w-full md:block md:h-1/3 lg:h-full lg:w-1/2">
            <Image
              src="/signin_bg.png"
              loading="eager"
              priority
              alt="Dotted"
              quality={100}
              fill
              sizes="100vh"
              className=""
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
            className="animate_top flex h-2/3 items-center justify-center self-center sm:w-full md:h-full md:w-1/2 lg:h-full lg:w-1/2"
          >
            <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
              <Input
                key="username"
                label={t('emailOrPhone')}
                labelPlacement="outside"
                placeholder={t('emailOrPhone')}
                radius="sm"
                size="lg"
                variant="bordered"
                classNames={{
                  base: 'mb-8',
                  label: 'font-bold',
                  inputWrapper: ['custom-input-wrapper', 'bg-white'],
                }}
                onValueChange={setUsername}
              />
              <div className="w-full h-fit relative flex items-center justify-center">
                <Input
                  key="password"
                  type={show || 'password'}
                  label={t('password')}
                  labelPlacement="outside"
                  placeholder={t('password')}
                  radius="sm"
                  size="lg"
                  variant="bordered"
                  className="w-full"
                  classNames={{
                    label: 'font-bold',
                    inputWrapper: ['custom-input-wrapper', 'bg-white'],
                  }}
                  onValueChange={setPassword}
                />
                <EyeIcon
                  width={16}
                  className="absolute right-5 top-[54%] cursor-pointer"
                  onClick={() => setShow(show === 'password' ? 'show' : 'password')}
                />
              </div>
              <div className="text-right text-sm">
                <Link className="text-primary" href="/auth/forgot-password">
                  {t('forgotPassword')}
                </Link>
              </div>
              <Divider />
              <Button
                radius="full"
                className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                onPress={login}
              >
                {t('login')}
              </Button>
              {/* </Link> */}
              <div className="text-center text-sm">
                {t('doYouHaveAnAccount')}
                <Link className="text-primary" href="/auth/signup">
                  {t('register')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signin;
