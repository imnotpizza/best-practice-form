import React from 'react';

/** 에러 문구 출력 */
export default function ErrorText({ errText }: { errText: string }) {
  if (!errText) return null;
  return <p className="text-red-500 text-xs">{errText}</p>;
}
