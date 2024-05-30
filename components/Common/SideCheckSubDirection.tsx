import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Image } from '@nextui-org/react';
import { RefDirection, SubDirection, SpecialServiceType } from '@/types/reference';
import { useCallback, useEffect, useState } from 'react';
import { ReferenceService } from '@/service/reference/reference.service';
import { useTypedSelector } from '@/app/lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import { useAppContext } from '@/app/app-context';

type Props = {
  closeFnc?: () => void;
};
const SideCheckSubDirection: React.FC<Props> = ({ closeFnc }) => {
  const advParam = useTypedSelector(state => state.advParam);
  const { mainDirections } = useAppContext();
  const dispatch = useDispatch();

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
        subDirectionIds: value.map(item => (parseInt(item))),
      })
    );
  };
  return (
    <div className={`shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px]`}>
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row items-center justify-center">
          <LuSettings2 className="text-xl" />
          <span className="ml-3 font-bold">Шүүлтүүр</span>
        </div>
        <LuChevronLeft
          className="text-2xl"
          onClick={closeFnc == undefined ? null : () => closeFnc()}
        />
      </div>
      {mainDirections.map((mainDirection, index) => (
        <div className="mb-5" key={index}>
          <h4 className="!mt-0 ml-2 self-center text-lg font-semibold text-black">
            {mainDirection?.name}
          </h4>
          <Accordion>
            {mainDirection.directions.map((direction: RefDirection, refIndex: number) => (
              <AccordionItem
                key={refIndex}
                title={<span className="text-sm text-black leading-normal">{direction.name}</span>}
              >
                <CheckboxGroup
                  color="warning"
                  key={index}
                  value={(advParam.subDirectionIds || []).map(item => item.toString())}
                  onValueChange={onChangeValue}
                >
                  {direction.subDirections.map((subDir: SubDirection, index: number) => {
                    return (
                      <Checkbox
                        value={String(subDir.id)}
                        classNames={{
                          base: 'w-full max-w-full',
                          label: 'w-full',
                          wrapper: 'custom-checkbox w-6 h-6',
                        }}
                        key={index}
                      >
                        <div className="flex w-full flex-row items-center justify-between">
                          <span className="text-sm leading-none">{subDir.name}</span>
                          <span className="text-sm">{subDir?.advertisements?.length}</span>
                        </div>
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default SideCheckSubDirection;
