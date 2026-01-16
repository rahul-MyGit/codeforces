import Link from "next/link"
import { Button } from "@repo/ui/components/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="relative rounded-2xl bg-primary px-8 py-16 md:px-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary-foreground/10 via-transparent to-transparent" />
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
              Ready to Start Your Competitive Programming Journey?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
              Join the community of competitive programmers and take your coding skills to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2 px-8">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
