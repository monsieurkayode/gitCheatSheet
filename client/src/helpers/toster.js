import { toast } from 'react-toastify';

export const toastSuccess = (message) => {
  toast.dismiss();
  toast.success(message, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export const toastError = (message) => {
  toast.dismiss();
  toast.error(message, {
    position: toast.POSITION.BOTTOM_LEFT
  });
};

export const toastInfo = (message) => {
  toast.dismiss();
  toast.info(message, {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};

export const toastWarning = (message) => {
  toast.dismiss();
  toast.warning(message, {
    position: toast.POSITION.BOTTOM_LEFT
  });
};
