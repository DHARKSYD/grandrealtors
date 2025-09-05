import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import styles from './Slider.module.css';

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(styles.sliderRoot, className)}
    {...props}
  >
    <SliderPrimitive.Track className={styles.sliderTrack}>
      <SliderPrimitive.Range className={styles.sliderRange} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={styles.sliderThumb} />
    {/* If you want only one thumb, remove the second line below */}
    {/* <SliderPrimitive.Thumb className={styles.sliderThumb} /> */}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };