import classNames from '@utils/classNames';
import Image from 'next/image';
import React from 'react';
interface IProps {
  className: string;
  id: string;
  title: string;
  imagePaths: string[];
  descriptions: string[];
}

const IntroSectionWeb: React.FC<IProps> = props => {
  return (
    <section id={props.id}>
      <h1>{props.title}</h1>
      <div className="flex flex-col gap-4">
        <div className={classNames('block', props.className)}>
          {props.imagePaths.map(item => (
            <Image key={item} src={item} alt={'image'} width={600} height={400} />
          ))}
          <div className="pt-6">
            {props.descriptions.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default IntroSectionWeb;
