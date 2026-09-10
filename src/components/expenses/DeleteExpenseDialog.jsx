import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function DeleteExpenseDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Delete this expense?',
  description = 'This action cannot be undone.',
  confirmLabel = 'Delete',
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showClose={false} className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody className="py-2">
          <p className="text-sm text-muted-foreground">
            Deleted expenses are removed from your local history immediately.
          </p>
        </DialogBody>
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="lg" className="w-full flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="w-full flex-1"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
