import { DELIVERY_ITEMS } from '@/enums';
import { z } from 'zod';

export const createPhoneNumberSchema = (msg?: string) => {
  return z.max(11).regex(/^\d+$/, msg || '-제거 11자리까지 입력 가능합니다');
};

export const DeliveryFormSchema = z.object({
  item: z.string().nullable(),
});

const DD = {
  AA: 'AA',
} as const;
export type DD = (typeof DD)[keyof typeof DD];

/**
 *
 */
export function createFromObject<T extends Record<string, string>>(
  obj: T,
) {
  return Object.keys(obj).map((item) => obj[item]) as T[keyof T][];
}