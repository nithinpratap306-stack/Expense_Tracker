import { cn } from '@/utils/cn'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-2xl border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-1.5 p-5 sm:p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold tracking-tight text-foreground', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5 pt-0 sm:p-6 sm:pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center p-5 pt-0 sm:p-6 sm:pt-0', className)} {...props} />
}
