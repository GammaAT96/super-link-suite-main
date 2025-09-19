import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BarChart3, Target, Globe, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed insights with real-time click tracking, audience demographics, and performance metrics.",
    details: [
      "Real-time click tracking",
      "Geographic analytics", 
      "Device and browser statistics",
      "Referrer analysis",
      "Custom date ranges"
    ]
  },
  {
    icon: Target,
    title: "Smart Targeting",
    description: "Redirect users to different destinations based on their location, device, or browser preferences.",
    details: [
      "Geographic targeting",
      "Device-specific redirects",
      "Browser detection",
      "Language-based routing",
      "Time-based rules"
    ]
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Use your own domain for shortened links to build trust and reinforce your brand.",
    details: [
      "Custom domain setup",
      "SSL certificates included",
      "Subdomain support",
      "DNS management",
      "Brand consistency"
    ]
  },
  {
    icon: Users,
    title: "Bio Pages",
    description: "Create beautiful landing pages that showcase all your important links in one place.",
    details: [
      "Drag & drop builder",
      "Custom themes",
      "Social media links",
      "Embedded content",
      "Mobile optimized"
    ]
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Global CDN ensures your links redirect instantly anywhere in the world.",
    details: [
      "Global CDN network",
      "99.9% uptime guarantee",
      "Sub-100ms redirects",
      "Auto-scaling infrastructure",
      "Real-time monitoring"
    ]
  },
  {
    icon: TrendingUp,
    title: "Growth Tools",
    description: "Powerful features to help you grow your audience and track campaign performance.",
    details: [
      "UTM parameter support",
      "Campaign tracking",
      "A/B testing",
      "Conversion tracking",
      "API access"
    ]
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="gradient-text">Every User</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            From simple link shortening to advanced marketing analytics, 
            NexusLink has everything you need to succeed.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-glass group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary p-3 mr-4">
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;