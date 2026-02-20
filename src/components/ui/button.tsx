import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-md bg-clip-padding",
    {
        variants: {
            variant: {
                default:
                    "border border-white/20 bg-primary/15 text-primary-foreground hover:bg-primary/25 shadow-[0_18px_45px_rgba(15,23,42,0.75)]",
                destructive:
                    "border border-destructive/40 bg-destructive/20 text-destructive-foreground hover:bg-destructive/30 shadow-[0_18px_45px_rgba(127,29,29,0.9)]",
                outline:
                    "border border-white/18 bg-white/5 text-foreground hover:bg-white/10 shadow-[0_18px_45px_rgba(15,23,42,0.7)]",
                secondary:
                    "border border-secondary/40 bg-secondary/25 text-secondary-foreground hover:bg-secondary/35 shadow-[0_18px_45px_rgba(15,23,42,0.8)]",
                ghost:
                    "border border-transparent bg-transparent hover:bg-white/5 hover:border-white/10",
                link: "border-none bg-transparent text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-none px-3",
                lg: "h-11 rounded-none px-8",
                icon: "h-10 w-10",
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
