"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ExitWarningDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  score?: number
}

export function ExitWarningDialog({ open, onOpenChange, onConfirm, score = 0 }: ExitWarningDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">⚠️ Wait! Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-3">
          <div className="font-semibold text-foreground">If you leave now, you'll lose all your progress!</div>
          {score > 0 && (
            <div className="text-muted-foreground">
              You've earned <span className="font-bold text-accent">{score} points</span> so far. Don't give up!
            </div>
          )}
          <div className="text-muted-foreground">
            We believe in commitment! Finish what you started to earn your XP and keep your streak
            alive.
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-base">Keep Playing</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90 text-base">
            Leave Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
