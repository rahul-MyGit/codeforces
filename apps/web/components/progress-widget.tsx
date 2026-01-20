"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { cn } from "@repo/ui/lib/utils"

export function ProgressWidget() {
    // Mock data
    const stats = {
        easy: { count: 45, total: 150, color: "#10b981" },   // emerald-500
        medium: { count: 28, total: 300, color: "#f59e0b" }, // amber-500
        hard: { count: 8, total: 100, color: "#ef4444" }     // red-500
    }

    const totalSolved = stats.easy.count + stats.medium.count + stats.hard.count
    const totalProblems = stats.easy.total + stats.medium.total + stats.hard.total

    // Calculate stroke dasharrays for the donut
    // Circumference = 2 * pi * r
    const radius = 50
    const circumference = 2 * Math.PI * radius

    // Start angles for segments (simple approximation for visual flair)
    // Real implementation would calculate exact arc lengths based on percentage of total PROBLEMS or total SOLVED?
    // LeetCode shows "Solved" vs "Total" for each category?
    // Let's do a simple donut where we show relative proportions of solved types

    const easyRatio = stats.easy.count / totalSolved
    const mediumRatio = stats.medium.count / totalSolved
    const hardRatio = stats.hard.count / totalSolved

    // SVG adjustments
    const size = 120
    const strokeWidth = 8
    const center = size / 2

    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2 bg-muted/20 border-b border-border/50">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <span className="h-4 w-4 bg-primary/20 text-primary rounded flex items-center justify-center text-[10px] font-bold">⚡</span>
                    Progress
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                    {/* Donut Chart */}
                    <div className="relative flex-shrink-0">
                        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                            {/* Background Circle */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth={strokeWidth}
                                className="text-muted/30"
                            />

                            {/* Easy Segment */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke={stats.easy.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${circumference * easyRatio} ${circumference}`}
                                strokeDashoffset={0}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />

                            {/* Medium Segment */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke={stats.medium.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${circumference * mediumRatio} ${circumference}`}
                                strokeDashoffset={-1 * circumference * easyRatio}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />

                            {/* Hard Segment */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="transparent"
                                stroke={stats.hard.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${circumference * hardRatio} ${circumference}`}
                                strokeDashoffset={-1 * circumference * (easyRatio + mediumRatio)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-bold tracking-tighter">{totalSolved}</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Solved</span>
                        </div>
                    </div>

                    {/* Legend / Stats */}
                    <div className="flex-1 space-y-3 min-w-0">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Easy</span>
                                <span className="font-medium text-foreground">{stats.easy.count}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(stats.easy.count / stats.easy.total) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Medium</span>
                                <span className="font-medium text-foreground">{stats.medium.count}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(stats.medium.count / stats.medium.total) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Hard</span>
                                <span className="font-medium text-foreground">{stats.hard.count}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 rounded-full" style={{ width: `${(stats.hard.count / stats.hard.total) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
