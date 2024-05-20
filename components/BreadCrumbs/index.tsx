'use client';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
type Props = {
  items: string[];
};
const BreadCrumbs: React.FC<Props> = ({ items }) => {
  return (
    <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: 'px-2',
      }}
    >
      {items
        ?.filter(el => el !== undefined && el !== null)
        ?.map((item, index) => {
          return <BreadcrumbItem key={index}>{item}</BreadcrumbItem>;
        })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
