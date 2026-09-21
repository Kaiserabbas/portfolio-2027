import { useEffect, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="toast">
      <RiCheckLine size={18} />
      <span>{message}</span>
    </div>
  );
}
