import { DELIVERY_ITEMS } from '@/enums';
import { z } from 'zod';
import { createFromObject, createPhoneNumberSchema } from './validations';

export const createNameSchema = (msg?: string) => {
  return z
    .string()
    .min(1)
    .max(40)
    .regex(
      /^[가-힣a-zA-Z0-9\s]+$/,
      msg || '이름은 최대 40자까지 입력 가능합니다.',
    );
};

/**
 * 배송 양식을 검증하기 위한 스키마.
 *
 * @property {string | null} item - 배송되는 항목. 문자열 또는 null일 수 있음.
 * @property {Object} sender - 발신자 정보.
 * @property {string} sender.name - 발신자의 이름. 비어 있지 않은 문자열이어야 함.
 * @property {string} sender.phone - 발신자의 전화번호. 비어 있지 않은 문자열이어야 함.
 * @property {string} sender.address - 발신자의 주소. 비어 있지 않은 문자열이어야 함.
 * @property {Object} receiver - 수신자 정보.
 * @property {string} receiver.name - 수신자의 이름. 비어 있지 않은 문자열이어야 함.
 * @property {string} receiver.phone - 수신자의 전화번호. 비어 있지 않은 문자열이어야 함.
 * @property {string} receiver.address - 수신자의 주소. 비어 있지 않은 문자열이어야 함.
 */
const DeliveryFormSchema = z.object({
  // string or null
  item: z.enum(
    [
      DELIVERY_ITEMS.APPLE,
      DELIVERY_ITEMS.BANANA,
      DELIVERY_ITEMS.BLUEBERRY,
      DELIVERY_ITEMS.GRAPES,
      DELIVERY_ITEMS.PINEAPPLE,
    ],
    {
      message: '배송 항목을 선택해주세요',
    },
  ),
  sender: z.object({
    name: z.string().min(1, '이름을 입력해주세요'),
    phone: z
      .string()
      .min(1, '전화번호를 입력해주세요')
      .max(11, '전화번호를 입력해주세요')
      .regex(/^\d+$/, '-제거 11자리까지 입력 가능합니다'),
    address: z.string().min(1, '주소를 입력해주세요'),
  }),
  receiver: z.object({
    name: z.string().min(1, '이름을 입력해주세요'),
    phone: z
      .string()
      .min(1, '전화번호를 입력해주세요')
      .max(11, '전화번호를 입력해주세요')
      .regex(/^\d+$/, '-제거 11자리까지 입력 가능합니다'),
    address: z.string().min(1, '주소를 입력해주세요'),
  }),
});

export default DeliveryFormSchema;
