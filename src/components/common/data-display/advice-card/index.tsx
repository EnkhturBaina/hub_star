import React from 'react';
import { Card } from 'antd';
// import styles from './advice-card.module.scss';
import Image from 'next/image';
const AdviceCard: React.FC = () => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<Image width={240} height={240} alt="image" src={'/signin_bg.jpg'} />}
    >
      Төсөв гаргах
    </Card>
  );
};
export default AdviceCard;
