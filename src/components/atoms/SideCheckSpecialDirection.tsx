import React, { useEffect, useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { Accordion, AccordionItem } from '@heroui/react';
import { RefDirection, SubDirection } from '@typeDefs/reference';
import ReferenceService from '@services/reference';
import { BiMinus } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import { useRouter } from 'next/router';
import IApiResponse from '@typeDefs/response';
import Checkbox from './checkbox';

type Props = {
  closeFnc?: () => void;
};
const SideCheckSpecialDirection: React.FC<Props> = ({ closeFnc }) => {
  const router = useRouter();
  const [directions, setDirections] = useState<RefDirection[]>([]);

  useEffect(() => {
    const getDirection = async () => {
      try {
        if (router.query?.specialService) {
          const result: IApiResponse = await ReferenceService.getDirection({
            specialService: router.query?.specialService,
          });
          if (result.success) {
            setDirections(result.response);
          }
        }
      } catch (error) {
        console.log('noop error:', error);
      }
    };
    getDirection();
  }, [router.query?.specialService]);

  // Query-оос ID-уудыг авч массив болгож хөрвүүлэх
  const choosedSubDir = router.query.subDirectionIds
    ? Array.isArray(router.query.subDirectionIds)
      ? router.query.subDirectionIds
      : [router.query.subDirectionIds]
    : [];
  const handleCheckboxChange = (value: string) => {
    const newSelection = choosedSubDir.includes(value)
      ? choosedSubDir.filter(item => item !== value)
      : [...choosedSubDir, value];
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          subDirectionIds: newSelection,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className={`shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px]`}>
      <div className="flex flex-row items-center justify-between border-b py-4 pl-1.5 pr-3">
        <strong className="lg:text-lg text-base">Шүүлтүүр</strong>
        <LuSettings2
          className="text-xl"
          onClick={closeFnc == undefined ? null : () => closeFnc()}
        />
      </div>
      <Accordion>
        {directions.map((direction: RefDirection, index: number) => {
          return (
            <AccordionItem
              key={index}
              title={
                <span className="lg:text-sm text-xs text-black leading-normal">
                  {direction.name}
                </span>
              }
              indicator={({ isOpen }) => (isOpen ? <BiMinus className="rotate-90" /> : <BsPlus />)}
            >
              {direction.subDirections.map((subDir: SubDirection, index: number) => {
                return (
                  <Checkbox
                    key={index}
                    label={subDir.name}
                    checked={choosedSubDir.includes(subDir.id.toString())}
                    onChange={() => handleCheckboxChange(subDir.id.toString())}
                  />
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SideCheckSpecialDirection;
