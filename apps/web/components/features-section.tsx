import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Code2, Trophy, Users, BarChart3, Clock, Zap } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Vast Problemset",
    description: "Access thousands of algorithmic problems ranging from beginner to grandmaster level.",
  },
  {
    icon: Trophy,
    title: "Rated Contests",
    description: "Participate in regular rated competitions and earn your official rating.",
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with programmers worldwide, share solutions, and learn together.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your growth with detailed statistics and performance analytics.",
  },
  {
    icon: Clock,
    title: "Virtual Contests",
    description: "Practice with past contests in a simulated competitive environment.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate results with our high-performance judge system.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything You Need to Excel</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Powerful tools and resources designed to help you become a better programmer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
