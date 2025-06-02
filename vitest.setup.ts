import { startMsw } from '@/components/atoms/MSWProvider';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { beforeAll, afterEach, afterAll } from 'vitest';

// MSW 서버 시작
beforeAll(() => {
  // startMsw(server);
});
