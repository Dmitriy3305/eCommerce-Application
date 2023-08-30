import * as StartToastifyInstance from 'toastify-js';
import 'toastify-js/src/toastify.css';

enum ToastifyCssClasses {
  Error = 'toastify_error',
  Success = 'toastify_success',
}

const BASE_PARAMS = {
  duration: 5000,
  close: true,
  stopOnFocus: true,
  offset: {
    x: 0,
    y: 150,
  },
};

export function showErrorToastify(message: string): void {
  const errorToastify = StartToastifyInstance({
    text: message,
    ...BASE_PARAMS,
    gravity: 'top',
    position: 'right',
    className: ToastifyCssClasses.Error,
  });
  errorToastify.showToast();
}

export function showSuccessToastify(message: string): void {
  const successToastify = StartToastifyInstance({
    text: message,
    ...BASE_PARAMS,
    gravity: 'top',
    position: 'right',
    className: ToastifyCssClasses.Success,
  });
  successToastify.showToast();
}
