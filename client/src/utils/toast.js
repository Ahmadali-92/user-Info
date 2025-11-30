import {toast} from 'react-hot-toast';

export const showToastUtils = ({type, message}) => {
  if (type === 'warning') return toast(message, {icon: '⚠️'});

  toast[type](message);
};
