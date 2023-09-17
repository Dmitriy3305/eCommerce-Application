import * as StartToastifyInstance from 'toastify-js';
import icon from '../assets/images/not-found/info-icon.svg';
import 'toastify-js/src/toastify.css';

enum ToastifyCssClasses {
  Error = 'toastify_error',
  Success = 'toastify_success',
}

const BASE_PARAMS: StartToastifyInstance.Options = {
  duration: 5000,
  close: true,
  stopOnFocus: true,
  offset: {
    x: 0,
    y: 150,
  },
  gravity: 'top',
  position: 'right',
  avatar: icon,
};

export function showErrorToastify(message: string): void {
  const errorToastify = StartToastifyInstance({
    ...BASE_PARAMS,
    text: message,
    className: ToastifyCssClasses.Error,
  });
  errorToastify.showToast();
}

export function showSuccessToastify(message: string): void {
  const successToastify = StartToastifyInstance({
    ...BASE_PARAMS,
    text: message,
    className: ToastifyCssClasses.Success,
  });
  successToastify.showToast();
}
