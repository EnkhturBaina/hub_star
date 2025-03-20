'use client';
import React, { useState } from 'react';
import MyButton from '@components/atoms/button';
import TextAreaField from '@components/atoms/textAreaField';
import TextField from '@components/atoms/textField';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ReferenceService from '@services/reference';
import IApiResponse from '@typeDefs/response';
import toast from 'react-hot-toast';

const Feedback = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const t = useTranslations();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  const handleSubmit = async () => {
    const result: IApiResponse = await ReferenceService.newFeedback({
      name,
      email,
      phone,
      description: feedback,
    });
    if (result.success) {
      toast.success('Амжилттай санал хүсэлт илгээлээ.');
    }
  };
  return (
    <div className="relative mx-auto max-w-screen-xl px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
      <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
      <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
        <Image
          src="/images/shape/shape-dotted-light.svg"
          alt="Dotted"
          className="dark:hidden"
          fill
        />
        <Image
          src="/images/shape/shape-dotted-dark.svg"
          alt="Dotted"
          className="hidden dark:block"
          fill
        />
      </div>

      <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
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
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
        >
          <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
            Санал хүсэлт илгээх
          </h2>

          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
              <TextField label="Нэр" value={name} handleChange={setName} />
              <TextField label="И-мэйл" value={email} handleChange={setEmail} />
            </div>

            <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
              <TextField label="Гарчиг" value={title} handleChange={setTitle} />
              <TextField label="Утас" value={phone} handleChange={setPhone} />
            </div>

            <div className="mb-11.5 flex">
              <TextAreaField label="Санал хүсэлт" value={feedback} onChange={setFeedback} />
            </div>

            <div className="flex flex-wrap gap-4 xl:justify-between ">
              <MyButton className="inline-flex items-center gap-2.5" onClick={handleSubmit}>
                Хүсэлт илгээх
                <svg
                  className="fill-white"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                    fill=""
                  />
                </svg>
              </MyButton>
            </div>
          </form>
        </motion.div>

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
          transition={{ duration: 2, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
        >
          <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
            {t('contact')}
          </h2>

          <div className="5 mb-7">
            <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Хаяг</h3>
            <p>Улаанбаатар 14192, Сүхбаатар, 7-р хороо, Orient Center оффис 5 давхар</p>
          </div>
          <div className="5 mb-7">
            <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">Имэйл</h3>
            <p>
              <a href="mailto:info@hubstar.mn">info@hubstar.mn</a>
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
              Phone Number
            </h4>
            <p>
              <a href="tel:+976 9999 4698">99994698</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
