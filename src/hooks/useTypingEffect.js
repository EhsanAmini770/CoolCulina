import { useState, useEffect } from 'react';

const useTypingEffect = (text, delay = 10) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex += 1;
      if (currentIndex === text.length) clearInterval(interval);
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return displayedText;
};

export default useTypingEffect;
