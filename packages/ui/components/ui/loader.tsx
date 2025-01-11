"use client";

import { useEffect, useState } from "react";
import type { JSX } from "react";
import { useLoader } from "@sportycoon/ui/context";
import Icons from "./icons";

export default function Loader(): JSX.Element | null {
  const { isRequestLoading, isTransitionLoading } = useLoader();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isRequestLoading || isTransitionLoading) {
      setIsVisible(true);

      // Встановлюємо таймер мінімальної тривалості
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    } else {
      // При завершенні запитів перевіряємо таймер
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isRequestLoading, isTransitionLoading]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-500 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-center items-center animate-pulse">
        <Icons.RaccoonLogo className="w-32 h-32" />
      </div>
    </div>
  );
}
