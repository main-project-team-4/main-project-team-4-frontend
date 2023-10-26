import { useState, ChangeEvent } from 'react';

export const useInput = (initialValue: string) => {
  const [input, setInput] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return [input, setInput, handleChange] as const;
};

export const usePriceInput = () => {
  const [price, setPrice] = useState<any>('');
  const [viewPrice, setViewPrice] = useState<string>('');
  const [notice, setNotice] = useState(false);

  const priceHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && isNaN(Number(e.target.value.replace(/,/g, '')))) {
      setNotice(true);

      setTimeout(() => {
        setNotice(false);
      }, 10000);
      return;
    }

    setPrice(e.target.value.replace(/,/g, ''));
    setNotice(false);

    const formattedPrice = e.target.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setViewPrice(formattedPrice);
  };

  return [price, setPrice, viewPrice, setViewPrice, notice, priceHandleChange];
};
