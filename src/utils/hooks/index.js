import { createRef, useEffect, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { fetchOrUpdateHotels } from '../functions';

export function useFetchOrUpdateHotels() {
  const store = useStore();

  useEffect(() => {
    fetchOrUpdateHotels(store);
  }, [store]);
}

export function useScrollingAnimation(
  options = { root: null, rootMargin: '0px', threshold: 0.2 }
) {
  const refs = [];

  const newRef = () => {
    const ref = createRef();

    refs.push(ref);

    return ref;
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = function (entries) {
    const [entry] = entries;
    if (entry.intersectionRatio > options.threshold) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, options);

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [refs]);

  return [newRef(), isVisible];
}
