import React, { useState } from 'react';
import { AuthService } from '@services/authentication/authentication.service';
import { OtpType } from '@typeDefs/reference';
import Users from '@typeDefs/user';
import { Button } from '@heroui/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import ExpiredTimer from '@components/atoms/expiredTimer';
import { OtpField } from '@components/atoms/otpField';

type Props = {
  details: string;
  type: OtpType;
  step: number;
  username: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setUser?: (user: Users) => void;
  setAccessToken?: (accessToken: string) => void;
};
const Verification: React.FC<Props> = ({
  details,
  type,
  step,
  username,
  setStep,
  setAccessToken,
}) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');

  const verification = () => {
    AuthService.otpVerify({
      otp,
      details: details,
      type,
    })
      .then(res => {
        if (res.success) {
          if (type === 'Registration') {
            router.push('/auth/signin');
          } else if (type === 'Forget') {
            setAccessToken(res.response.accessToken);
            setStep(step + 1);
          }
        }
      })
      .catch(error => {
        if (error.response?.status === 400) {
          toast.error('Баталгаажуулах код буруу байна.');
        }
      });
  };

  const handleResend = () => {
    try {
      AuthService.sendOtp({ username, type: 'Forget' })
        .then(response => {
          if (response.success) {
            details = response.response.details;
          }
        })
        .catch(error => {
          console.error('Error fetching :', error);
          toast.error(error.response?.data?.message);
        });
    } catch (error) {
      console.error('catch error :', error);
    }
  };
  return (
    <div className="mx-auto mb-10 grid w-[350px] grid-cols-1 rounded-md border border-stroke bg-gray-50 p-6 shadow-md">
      <div className="otp-wrapper">
        <OtpField length={6} onComplete={setOtp} />
        <ExpiredTimer secound={60} handleClick={handleResend} />
      </div>
      <Button
        radius="full"
        className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
        onPress={verification}
      >
        Баталгаажуулах
      </Button>
      <Button
        radius="full"
        className="mb-2 w-full rounded-md font-bold leading-none"
        onPress={() => {
          setStep(step - 1);
        }}
      >
        Буцах
      </Button>
    </div>
  );
};
export default Verification;
