import { classNames } from '@/utils/util';
import Image from 'next/image';
import React from 'react';
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
      <div className={classNames('flex flex-row lg:grid-cols-2 gap-4', props.className)}>
        <div className="bg-slate-400 w-1/3">
          {props.imagePaths.map(item => (
            <Image key={item} src={item} alt={'image'} width={'200'} height={'400'} />
          ))}
        </div>
        <div className="bg-slate-500 w-2/3">
          {props.descriptions.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </section>
  );
};
export default IntroSection;
