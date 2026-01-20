"use client"

import { CalendarWidget } from "./calendar-widget"
import { ProgressWidget } from "./progress-widget"

export function ProblemsSidebar() {
    return (
        <div className="space-y-6">
            <CalendarWidget />
            <ProgressWidget />
        </div>
    )
}
