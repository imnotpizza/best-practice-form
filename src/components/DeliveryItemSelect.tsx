import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { MDeliveryForm } from '@/types/delivery.interface';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import ErrorText from './ui/ErrorText';
import { DELIVERY_ITEMS } from '@/enums';

const options = Object.values(DELIVERY_ITEMS).map((item) => ({
  key: item,
  value: item,
}));

export default function DeliveryItemSelect() {
  const {
    watch,
    setValue,
    formState: { errors, isSubmitted, isValid },
    setError,
  } = useFormContext<MDeliveryForm>();

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-semibold">배송 물품 선택</h2>
      <Select
        value={watch('item')}
        onValueChange={(value: DELIVERY_ITEMS) => setValue('item', value)}
      >
        <SelectTrigger className={cn(errors.item?.message && 'border-red-500')}>
          <SelectValue placeholder="배송 물품 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>배송 물품 선택</SelectLabel>
            {options.map((item) => (
              <SelectItem key={item.key} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorText errText={errors.item?.message} />
    </div>
  );
}
