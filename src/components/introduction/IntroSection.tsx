import React from 'react';
import { classNames } from '@/utils';
import Image from 'next/image';
interface IProps {
  className: string;
  id: string;
  title: string;
  imagePaths: string[];
  descriptions: string[];
}

const IntroSection: React.FC<IProps> = props => {
  return (
    <section id={props.id}>
      <h1>{props.title}</h1>
      <div className="flex flex-col gap-4">
        <div className={classNames('lg:flex lg:flex-row gap-4 py-2', props.className)}>
          {props.imagePaths.map(item => (
            <Image
              key={item}
              src={item}
              alt={'image'}
              width={200}
              height={400}
              style={{ width: '200px', height: '400px', objectFit: 'cover' }}
            />
          ))}
          {props.imagePaths.length < 3 ? (
            <div>
              {props.descriptions.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          ) : null}
        </div>
        {props.imagePaths.length >= 3 ? (
          <div>
            {props.descriptions.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
export default IntroSection;
