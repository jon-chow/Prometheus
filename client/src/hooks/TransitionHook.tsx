import { useEffect, useState } from 'react';

const useTransition = (isMounted: boolean, delayTime: number) => {
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeout = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeout);
  }, [isMounted, delayTime, showDiv]);

  return showDiv;
};

export default useTransition;
