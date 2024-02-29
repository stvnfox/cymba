import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
    {
        variants: {
            variant: {
                default:
                    "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
                navigation:
                    "relative gap-3 text-sm font-light bg-transparent text-neutral-200 hover:bg-neutral-700 hover:text-neutral-50 dark:text-neutral-50 dark:hover:bg-neutral-800",
                outline: "border border-neutral-600 text-neutral-200 hover:bg-neutral-700",
                ghost: "group flex items-center gap-3 rounded-md text-left text-sm text-neutral-200 transition-colors duration-200 ease-in-out hover:bg-neutral-600 focus:bg-neutral-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none active:bg-transparent",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                navigation: "h-12 w-full text-left px-6",
                icon: "h-12 w-12",
                ghost: "h-fit w-[101%] -ml-1.5 -mr-3 py-1.5 pl-1.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
