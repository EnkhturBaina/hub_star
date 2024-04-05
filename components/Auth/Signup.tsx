'use client';
import { Button, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Divider } from 'semantic-ui-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';

const Signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const validateEmail = value => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const register = () => {
    if (email == '') {
      toast.error('И-Мэйл хаягаа оруулна уу.');
    } else if (isInvalid) {
      toast.error('И-Мэйл хаяг буруу байна.');
    } else if (password == '') {
      toast.error('Нууц үгээ оруулна уу.');
    } else if (password2 == '') {
      toast.error('Нууц үгээ давтан оруулна уу.');
    } else if (password != password2) {
      toast.error('Нууц тохирохгүй байна.');
    } else {
      try {
        AuthService.register({ email, password })
          .then(response => {
            router.push('/auth/signin');
          })
          .catch(error => {
            console.error('Error fetching :', error);
            toast.error(error.response?.data?.message);
          });
      } catch (error) {
        console.error('catch error :', error);
      }
    }
  };

  return (
    <>
      <section className="flex h-[calc(100vh-100px)] flex-wrap">
        <div className="relative flex h-full w-full flex-col justify-center lg:flex-row">
          <div className="relative hidden h-full w-full md:block md:h-1/3 lg:h-full lg:w-1/2">
            <Image
              src="/signup_bg.png"
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
            className="animate_top flex h-2/3 items-center justify-center self-center sm:w-full md:h-full md:w-1/2 lg:h-full lg:w-1/2"
          >
            <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
              <Input
                key="username"
                type="text"
                label="И-Мэйл"
                labelPlacement="outside"
                placeholder="И-Мэйл"
                radius="sm"
                size="lg"
                variant="bordered"
                classNames={{
                  base: 'mb-8',
                  label: 'font-bold',
                  inputWrapper: ['custom-input-wrapper', 'bg-white'],
                }}
                isInvalid={isInvalid}
                color={isInvalid ? 'danger' : 'default'}
                errorMessage={isInvalid && 'И-Мэйл хаягаа зөв оруулна уу.'}
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
                  base: 'mb-8',
                  label: 'font-bold',
                  inputWrapper: ['custom-input-wrapper', 'bg-white'],
                }}
                value={password}
                onValueChange={setPassword}
              />
              <Input
                key="repeatPassword"
                type="password"
                label="Нууц үг давтах"
                labelPlacement="outside"
                placeholder="Нууц үг давтах"
                radius="sm"
                size="lg"
                variant="bordered"
                classNames={{
                  base: 'mb-8',
                  label: 'font-bold',
                  inputWrapper: ['custom-input-wrapper', 'bg-white'],
                }}
                value={password2}
                onValueChange={setPassword2}
              />
              <Button
                radius="full"
                className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                onClick={register}
              >
                Бүртгүүлэх
              </Button>
              <div className="text-center text-sm">
                Та бүртгэлтэй юу?{' '}
                <Link className="text-primary" href="/auth/signin">
                  Нэвтрэх
                </Link>
              </div>
              <Divider
                horizontal
                className="!my-6 !text-xs !font-normal !normal-case !text-gray-400"
              >
                Эсвэл
              </Divider>
              <Button
                startContent={<Image src="/facebook.png" alt="google" height="20" width="20" />}
                radius="full"
                className="mb-2 flex w-full items-center justify-start rounded-md bg-primary font-bold leading-none text-white"
              >
                Continue with Facebook
              </Button>
              <Button
                startContent={<Image src="/google.png" alt="facebook" height="20" width="20" />}
                radius="full"
                className="mb-2 flex w-full justify-start rounded-md bg-white font-bold leading-none text-gray-400 shadow-md"
              >
                Continue with Google
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signup;
