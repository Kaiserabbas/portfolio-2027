import { useState, useEffect, useRef } from 'react';

export function useTypewriter(words, { speed = 100, deleteSpeed = 60, pause = 2000 } = {}) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pause);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        } else {
          setIsDeleting(false);
          setWordIndex(i => i + 1);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, wordIndex, words, speed, deleteSpeed, pause]);

  return displayed;
}
