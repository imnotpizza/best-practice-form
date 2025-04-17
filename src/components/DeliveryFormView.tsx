import React, { useEffect, useState } from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { fetchDeliveryListAPI, submitDeliveryAPI } from '@/api';
import DeliveryItemSelect from './DeliveryItemSelect';
import DeliverySenderInputGroup from './DeliverySenderInputGroup';
import DeliveryReceiverInputGroup from './DeliveryReceiverInputGroup';
import { MDeliveryForm } from '@/types/delivery.interface';
import DeliveryEstimatedFee from './DeliveryEstimatedFee';

/**
 * 접수 form 화면
 */
export default function DeliveryFormView() {
  const methods = useFormContext<MDeliveryForm>();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(true);

  // 접수 API 모의
  const submitForm: SubmitHandler<MDeliveryForm> = async (data) => {
    try {
      // submit 관련 처리
      await submitDeliveryAPI(data);
      setSubmitSuccess(true);
    } catch (error) {
      // form 제출 시 실패 관련 처리
      console.error('Error submitting form:', error);
      setSubmitSuccess(false);
    }
  };

  const onSubmitError: SubmitErrorHandler<MDeliveryForm> = (errors) => {
    // validation 실패 관련 처리
    console.error('Form submission error:', errors);
    const errorMsgList = getErrorMessages(errors);
    // 맨 첫번째 에러 메세지 출력
    alert(errorMsgList[0]);
  };

  const onLoadSavedData = async () => {
    const savedData = await fetchDeliveryListAPI();
    if (savedData.data) {
      reset(savedData.data);
    }
  };

  const onSaveData = async () => {
    const savedData = await fetchDeliveryListAPI();
    if (savedData.data) {
      reset(savedData.data);
    }
  };

  const getErrorMessages = (errors: FieldErrors) => {
    const errorMsgList: string[] = [];

    getErrorMsgListFromFieldErrors(errors, errorMsgList);
    return errorMsgList;
  };

  /**
   * react hook from 에러 객체에서 에러 메세지만 추출
   * - 객체는 {key: 필드 변수명, ref: input ref, message: 에러 메세지}의 형태로 들어옴
   * - 여기서 message 프로퍼티만 추출
   * @param errors: RHF errors 객체
   * @param errorMsgList: 에러 메세지 담겨질 배열
   * @returns
   */
  const getErrorMsgListFromFieldErrors = (
    errors: FieldErrors,
    errorMsgList: string[],
  ) => {
    Object.keys(errors).forEach((key) => {
      const error = errors[key];
      if (error && error.hasOwnProperty('message')) {
        errorMsgList.push(error.message as string);
      } else {
        getErrorMsgListFromFieldErrors(error as FieldErrors, errorMsgList); // 재귀 호출
      }
    });
  };

  /**
   * 에러 객체에서 message만 추출
   * - hasOwnProperty 사용해 message가
   */
  const getList = (errors: FieldErrors) => {
    const errorMessages: string[] = [];
    Object.keys(errors).forEach((key) => {
      const error = errors[key];
      if (error && error.hasOwnProperty('message')) {
        errorMessages.push(error.message as string);
      } else {
        getList(error as FieldErrors); // 재귀 호출
      }
    });
    return errorMessages;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm, onSubmitError)}
        className="w-full flex justify-start items-start flex-col gap-4 p-4"
      >
        <DeliveryItemSelect />
        <DeliverySenderInputGroup />
        <DeliveryReceiverInputGroup />
        <DeliveryEstimatedFee
          item={watch('item')}
          senderAddress={watch('sender.address')}
          receiverAddress={watch('receiver.address')}
        />
        <div className="flex justify-between gap-2">
          <Button type="submit" size="default">
            접수하기
          </Button>
          <div className="flex gap-2">
            <Button onClick={onSaveData}>저장</Button>
            <Button
              type="button"
              variant="secondary"
              size="default"
              onClick={onLoadSavedData}
            >
              접수 내용 불러오기
            </Button>
          </div>
        </div>
      </form>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {submitSuccess ? '접수 성공' : '접수 실패'}
            </DialogTitle>
            <p>
              {submitSuccess
                ? '배송이 정상 접수되었습니다.'
                : '문제가 발생했습니다. 다시 시도해주세요.'}
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
