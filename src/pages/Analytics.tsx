import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BarChart, Globe, Users, Clock, TrendingUp, MousePointer } from "lucide-react";
import { recordAnalyticsEvent } from "@/lib/analytics";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Analytics</span> That Matter
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get deep insights into your link performance with real-time analytics, 
            geographic data, and audience behavior tracking.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-glass">
              <BarChart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Real-Time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor clicks as they happen with live analytics and instant notifications.
              </p>
            </div>

            <div className="card-glass">
              <Globe className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Geographic Insights</h3>
              <p className="text-muted-foreground">
                See exactly where your clicks are coming from with detailed country and city data.
              </p>
            </div>

            <div className="card-glass">
              <Users className="w-12 h-12 text-warning mb-4" />
              <h3 className="text-xl font-semibold mb-3">Audience Analysis</h3>
              <p className="text-muted-foreground">
                Understand your audience with device, browser, and referrer analytics.
              </p>
            </div>

            <div className="card-glass">
              <Clock className="w-12 h-12 text-success mb-4" />
              <h3 className="text-xl font-semibold mb-3">Time-Based Data</h3>
              <p className="text-muted-foreground">
                Track performance over time with hourly, daily, and monthly breakdowns.
              </p>
            </div>

            <div className="card-glass">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Performance Trends</h3>
              <p className="text-muted-foreground">
                Identify patterns and trends to optimize your link sharing strategy.
              </p>
            </div>

            <div className="card-glass">
              <MousePointer className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Click Heatmaps</h3>
              <p className="text-muted-foreground">
                Visualize click patterns and peak activity periods with interactive charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card-glass p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">See Analytics in Action</h2>
            <p className="text-muted-foreground mb-6">
              Experience the power of detailed link analytics with our interactive demo.
            </p>
            <a
              className="btn-hero px-8 py-3 inline-block"
              href="/dashboard"
              onClick={async () => {
                try {
                  await recordAnalyticsEvent({
                    eventType: "demo_dashboard_clicked",
                    payload: {
                      source: "analytics_page_cta",
                      timestamp: new Date().toISOString(),
                    },
                  });
                } catch {}
              }}
            >
              Link Analytics Dashboard
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Analytics;