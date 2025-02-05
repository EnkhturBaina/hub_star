import { LuSettings2 } from 'react-icons/lu';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Image } from '@heroui/react';
import { RefDirection, SubDirection, SpecialServiceType } from '@/types/reference';
import { useTypedSelector } from '@/app/lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import { useAppContext } from '@/app/app-context';
import { BsPlus } from 'react-icons/bs';
import { useState } from 'react';
import { BiMinus } from 'react-icons/bi';

type Props = {
  closeFnc?: () => void;
};
const SideCheckSubDirection: React.FC<Props> = ({ closeFnc }) => {
  const advParam = useTypedSelector(state => state.advParam);
  const { mainDirections } = useAppContext();
  const dispatch = useDispatch();

  const [openParentAccordion, setOpenParentAccordion] = useState<any[]>([]);

  const onChangeValue = (value: string[]) => {
    const filteredMainDirections = mainDirections
      .map(mainDir => {
        const filteredDirections = mainDir.directions.filter(dir =>
          dir.subDirections.some(subDir => value.includes(subDir.id?.toString()))
        );
        return {
          ...mainDir,
          directions: filteredDirections,
        };
      })
      .filter(mainDir => mainDir.directions.length > 0);
    const mainDirectionIds = filteredMainDirections.map(item => item.id);
    const directionIds = filteredMainDirections.flatMap(item => item.directions.map(dir => dir.id));
    dispatch(
      setAdvParam({
        ...advParam,
        page: 1,
        limit: 10,
        mainDirectionIds,
        directionIds,
        subDirectionIds: value.map(item => parseInt(item)),
      })
    );
  };
  return (
    <div className={`shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px]`}>
      <div className="flex flex-row items-center justify-between border-b py-4 pr-2 mb-2">
        <h4 className="ml-1 !font-semibold text-lg text-gray-700">Шүүлтүүр</h4>
        <LuSettings2 className="text-xl" onClick={closeFnc} />
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
                  <CheckboxGroup
                    key={index}
                    color="warning"
                    onValueChange={onChangeValue}
                    value={(advParam.subDirectionIds || []).map(item => item.toString())}
                  >
                    {direction.subDirections.map((subDir: SubDirection, index: number) => {
                      return (
                        <Checkbox
                          key={index}
                          value={String(subDir.id)}
                          classNames={{
                            label: 'w-full',
                            base: 'w-full max-w-full',
                            wrapper: 'custom-checkbox w-6 h-6',
                          }}
                        >
                          <div className="flex w-full flex-row items-center justify-between">
                            <span className="text-sm leading-4">{subDir.name}</span>
                            <span className="text-sm">{subDir?.advertisements?.length}</span>
                          </div>
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
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
