import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/utils/cn'

export function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn('block mb-2.5 text-sm font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      {...props}
    />
  )
}
