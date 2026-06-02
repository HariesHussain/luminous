import { useState, useEffect } from "react";

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  const completeLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return {
    isLoading,
    completeLoading,
  };
};
export default usePreloader;
