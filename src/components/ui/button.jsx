import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import styles from './Button.module.css';

const buttonVariants = cva(styles.button, {
	variants: {
		variant: {
			default: styles.default,
			destructive: styles.destructive,
			outline: styles.outline,
			secondary: styles.secondary,
			ghost: styles.ghost,
			link: styles.link,
		},
		size: {
			default: styles.defaultSize,
			sm: styles.sm,
			lg: styles.lg,
			icon: styles.icon,
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size }), className)}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };