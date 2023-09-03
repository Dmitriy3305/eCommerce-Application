export default function throttle(callee: (...args: unknown[]) => unknown, timeout: number) {
  let timer: NodeJS.Timeout | null = null;

  return function perform(...args: unknown[]) {
    if (timer) return;

    timer = setTimeout(() => {
      callee(...args);

      clearTimeout(timer as NodeJS.Timeout);
      timer = null;
    }, timeout);
  };
}
