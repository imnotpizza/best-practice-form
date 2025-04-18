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
import { useController, useFormContext } from 'react-hook-form';
import ErrorText from './ui/ErrorText';
import { DELIVERY_ITEMS } from '@/enums';

const options = Object.values(DELIVERY_ITEMS).map((item) => ({
  key: item,
  value: item,
}));

export default function DeliveryItemSelect() {
  const { control } = useFormContext<MDeliveryForm>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'item',
    control,
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-semibold">배송 물품 선택</h2>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className={cn(error && 'border-red-500')}>
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
      <ErrorText errText={error?.message} />
    </div>
  );
}
