import { MDeliveryForm } from '@/types/delivery.interface';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from './ui/input';
import ErrorText from './ui/ErrorText';
import { cn } from '@/lib/utils';

export default function DeliveryReceiverInputGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MDeliveryForm>();
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-semibold">도착지 정보</h2>
      <Input
        {...register(`receiver.name`)}
        placeholder="이름"
        className={cn(errors.receiver?.name?.message && 'border-red-500')}
      />
      <ErrorText errText={errors.receiver?.name?.message} />
      <Input
        {...register(`receiver.phone`)}
        placeholder="전화번호"
        className={cn(errors.receiver?.phone?.message && 'border-red-500')}
      />
      <ErrorText errText={errors.receiver?.phone?.message} />
      <Input
        {...register(`receiver.address`)}
        placeholder="주소"
        className={cn(errors.receiver?.address?.message && 'border-red-500')}
      />
      <ErrorText errText={errors.receiver?.address?.message} />
    </div>
  );
}
