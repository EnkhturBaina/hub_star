'use client';
import { useAppContext } from '@/app/app-context';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const BreadCrumbs: React.FC = () => {
  const { mainDirections, adParam } = useAppContext();
  const [items, setItems] = useState<string[]>([]);

  // const items = [mDir.toString(), "item2", "item3"];
  useEffect(() => {
    const { mainDirectionId, directionIds, subDirectionIds } = adParam;
    const mainDir = mainDirections.find(item => mainDirectionId === item.id);
    if (mainDir) {
      setItems([mainDir.name]);
      const directions = mainDir.directions.filter(item => directionIds.includes(item.id));
      if (directions && directions.length > 0) {
        setItems(prevItems => prevItems.concat(String(directions.map(item => item.name))));
      }
      const subDirNames: string[] = [];
      directions.map(direction => {
        subDirNames.push(
          ...direction.subDirections
            .filter(item => subDirectionIds.includes(item.id))
            .map(item => item.name)
        );
      });
      if (subDirNames && subDirNames.length > 0) {
        setItems(prevItems => prevItems.concat(String(subDirNames)));
      }
    }
  }, [adParam]);
  return (
    <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: 'px-2',
      }}
    >
      {items?.map((item, index) => {
        return <BreadcrumbItem key={index}>{item}</BreadcrumbItem>;
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
