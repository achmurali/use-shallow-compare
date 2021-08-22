import { useEffect, useRef } from 'react';
import shallowCompare from './shallowCompare'

type useEffectReturnType = ReturnType<typeof useEffect>;

const compareDependencies = (value: React.DependencyList) => {
  const ref = useRef<React.DependencyList>([]);
  const signalRef = useRef<number>(0);

  if (!shallowCompare(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return [signalRef.current];
}

const useShallowEffect = (cb: () => void, deps: React.DependencyList): useEffectReturnType => {
  useEffect(cb, compareDependencies(deps));
}

export default useShallowEffect;