import { ReactNode, HTMLAttributes, forwardRef, useState, useEffect, useRef, useCallback } from "react";

interface InfiniteScrollProps extends HTMLAttributes<HTMLDivElement> {
  endOfList: () => void;
}

const InfiniteScroll = forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>(
  (
    {
      endOfList,
      children,
      ...props
    },
    ref
  ) => {
    const observerTarget = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) endOfList();
        },
        { threshold: 1 }
      );

      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }

      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div ref={ref} {...props} style={{ overflowAnchor: "none", overflow: "auto", height: '100%' }} >
        {children}
        <div ref={observerTarget} />
      </div>
    );
  }
);

export default InfiniteScroll;