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
        separator: 'px-1',
        item: '!text-black',
      }}
    >
      {items?.filter(Boolean)?.map((item, index) => {
        return (
          <BreadcrumbItem key={index} className="!text-black">
            {item}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
