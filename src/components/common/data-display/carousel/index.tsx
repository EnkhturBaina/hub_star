import React from 'react';
import { Carousel } from 'antd';
import styles from './carousel.module.scss';
import Image from 'next/image';

const MyCarousel: React.FC = () => {
  return (
    <Carousel arrows infinite={false} autoplay>
      <div className={styles.slide}>
        <Image alt="Norway view 1" width={500} height={500} src={'/signin_bg.jpg'} />
        <div className={styles.overlayText}>
          BEST PLACE TO TRAVEL
          <br />
          <strong>NORWAY</strong>
        </div>
      </div>
      <div className={styles.slide}>
        <Image alt="Norway view 1" width={500} height={500} src={'/signin_bg.jpg'} />
        <div className={styles.overlayText}>
          EXPLORE BEAUTY
          <br />
          <strong>NORWAY</strong>
        </div>
      </div>
      <div className={styles.slide}>
        <Image alt="Norway view 2" width={500} height={500} src={'/signup_bg.png'} />
        <div className={styles.overlayText}>
          NATURE AT ITS BEST
          <br />
          <strong>NORWAY</strong>
        </div>
      </div>
    </Carousel>
  );
};
export default MyCarousel;
