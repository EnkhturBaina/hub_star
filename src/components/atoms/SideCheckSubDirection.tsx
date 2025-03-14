import React, { useState } from 'react';
import { Accordion, AccordionItem } from '@heroui/react';
import { RefDirection, SubDirection } from '@typeDefs/reference';
import { BsPlus } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useMainState } from '@context/main';
import Checkbox from './checkbox';

const SideCheckSubDirection = () => {
  const { mainDirections } = useMainState();
  const router = useRouter();
  const [openParentAccordion, setOpenParentAccordion] = useState<any[]>([]);

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
      <div className="flex flex-row items-center justify-between border-b py-4 pr-2 mb-2">
        <h4 className="ml-1 !font-semibold text-lg text-gray-700">Шүүлтүүр</h4>
      </div>
      {mainDirections.map((mainDirection, index) => (
        <div className="mb-5" key={index}>
          <h4
            className="!my-0 ml-1 pr-2 self-center text-lg font-semibold text-gray-700 cursor-pointer"
            onClick={() => {
              setOpenParentAccordion(prev =>
                prev.some(pp => pp === mainDirection.id)
                  ? prev.filter(pp => pp !== mainDirection.id)
                  : [...prev, mainDirection.id]
              );
            }}
          >
            {mainDirection?.name}
          </h4>

          {!openParentAccordion.includes(mainDirection.id) && (
            <Accordion>
              {mainDirection.directions.map((direction: RefDirection, refIndex: number) => (
                <AccordionItem
                  key={refIndex}
                  indicator={({ isOpen }) =>
                    isOpen ? <BiMinus className="rotate-90" /> : <BsPlus />
                  }
                  title={
                    <span className="text-sm text-black leading-normal ml-1">{direction.name}</span>
                  }
                  className="removeMarginFromH2"
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
              ))}
            </Accordion>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideCheckSubDirection;
