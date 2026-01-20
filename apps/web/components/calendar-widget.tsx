"use client"

import { useState } from "react"
import { Calendar } from "@repo/ui/components/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { cn } from "@repo/ui/lib/utils"

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock submission data - dates with submissions
  // highlight some random days in the current month
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const submissionDays = [
    new Date(year, month, 2),
    new Date(year, month, 5),
    new Date(year, month, 8),
    new Date(year, month, 12),
    new Date(year, month, 15),
    new Date(year, month, 18),
    new Date(year, month, 22),
    new Date(year, month, 24),
    new Date(year, month, 28),
  ]

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="pb-2 bg-muted/20 border-b border-border/50">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="h-4 w-4 bg-primary/20 text-primary rounded flex items-center justify-center text-[10px] font-bold">📅</span>
          Daily Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md w-full flex justify-center p-3"
          modifiers={{
            booked: submissionDays,
          }}
          modifiersStyles={{
            booked: {
              fontWeight: "bold",
              textDecoration: "underline",
              backgroundColor: "var(--primary)",
              color: "white",
              borderRadius: "100%"
            }
          }}
          classNames={{
            day_today: "bg-accent/50 text-accent-foreground font-bold",
          }}
        />
        <div className="px-4 pb-4 pt-0 text-xs text-muted-foreground text-center">
          <span className="font-medium text-foreground">12 day</span> streak! Keep it up 🔥
        </div>
      </CardContent>
    </Card>
  )
}
