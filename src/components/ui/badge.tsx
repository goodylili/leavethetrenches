import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-none border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm bg-clip-padding",
    {
        variants: {
            variant: {
                default:
                    "border-white/25 bg-primary/20 text-primary-foreground hover:bg-primary/30",
                secondary:
                    "border-white/20 bg-secondary/25 text-secondary-foreground hover:bg-secondary/35",
                outline:
                    "text-foreground border-white/30 bg-white/10 hover:bg-white/15",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
