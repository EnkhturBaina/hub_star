'use client';
import { useAppContext } from '@/utils/context/app-context';
import { useTypedSelector } from '@/utils/redux/reducer';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const BreadCrumbs: React.FC = () => {
  const { adParam } = useTypedSelector(state => state);
  const { mainDirections } = useAppContext();
  const [items, setItems] = useState<string[]>([]);

  // const items = [mDir.toString(), "item2", "item3"];
  useEffect(() => {
    const { mainDirectionId, directionIds, subDirectionIds } = adParam;
    const mainDir = mainDirections.find(item => mainDirectionId === item.id);
    const directions = mainDir.directions.filter(item => directionIds.includes(item.id));
    const subDirNames: string[] = [];
    directions.map(direction => {
      subDirNames.push(
        ...direction.subDirections
          .filter(item => subDirectionIds.includes(item.id))
          .map(item => item.name)
      );
    });
    setItems([mainDir.name, String(directions.map(item => item.name)), String(subDirNames)]);
  }, []);
  return (
    // <div className="mt-2">
    //   <span className="font-bold">{"item1"}</span>
    //   <span className="font-bold">
    //     {" / " + "item2"}
    //   </span>
    //   <span className="font-bold">{props.mainDir ? mainDirName : null}</span>
    //   <span className="font-bold">{props.dir ? " / " + dirName : null}</span>
    //   <span className="font-bold">
    //     {props.subDir ? " / " + subDirName : null}
    //   </span>
    // </div>
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
