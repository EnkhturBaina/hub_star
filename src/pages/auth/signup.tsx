import React, { useState } from 'react';
import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Signup from '@components/molecules/Auth/Signup';
import Verification from '@components/molecules/Auth/Verification';
import Users from '@typeDefs/user';

export const metadata: Metadata = {
  title: 'Hub star',
  description: 'All at once',
  // other metadata
};
const SignupPage: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [details, setDetails] = useState<string>('');
  const [, setUser] = useState<Users>();
  const [username, setUsername] = useState<string>('');
  const [, setAccessToken] = useState<string>();
  return (
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
          className="animate_top flex h-2/3 items-center justify-center self-center sm:w-full md:h-full md:w-[90%] lg:h-full"
        >
          <div>
            {step == 1 && (
              <Signup
                username={username}
                setUsername={setUsername}
                step={step}
                setStep={setStep}
                setDetails={setDetails}
              />
            )}
            {step == 2 && (
              <Verification
                type="Registration"
                details={details}
                step={step}
                setStep={setStep}
                setUser={setUser}
                setAccessToken={setAccessToken}
                username={username}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default SignupPage;
