import React from 'react';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
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
          <BreadcrumbItem
            key={index}
            className="!text-black sm:text-sm text-xs !text-wrap"
            id="spanTextWrap"
          >
            {item}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
