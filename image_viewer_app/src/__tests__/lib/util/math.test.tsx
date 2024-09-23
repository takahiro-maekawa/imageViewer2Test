import { add3 } from "@/lib/util/math";
import { expect, test } from "@jest/globals";

// これをピンポイントで実行したければ、以下のコマンドを実行する
// npm run test ./src/__tests__/lib/util/math.test.tsx
test('adds 1 + 3 to equal4_ ', () => {
  expect(add3(1)).toBe(4);
});