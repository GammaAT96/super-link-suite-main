import { BarChart3, Globe, Palette, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Beyond the Short Link",
    subtitle: "Free Advanced Analytics",
    description: "Get detailed insights into your link performance with real-time analytics, click tracking, and audience demographics.",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: Palette,
    title: "Your Brand, Your Link", 
    subtitle: "Free Custom Domains",
    description: "Use your own domain for shortened links. Build trust and reinforce your brand with every click.",
    gradient: "from-secondary to-secondary-glow"
  },
  {
    icon: Globe,
    title: "The Right Link for the Right Person",
    subtitle: "Free Geo & Device Targeting", 
    description: "Redirect users to different destinations based on their location, device, or browser. Perfect for global campaigns.",
    gradient: "from-warning to-yellow-400"
  },
  {
    icon: Users,
    title: "Your 'Link-in-Bio', Perfected",
    subtitle: "Free Bio Pages",
    description: "Create beautiful, customizable landing pages that showcase all your important links in one place.",
    gradient: "from-success to-emerald-400"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    subtitle: "Instant Redirects",
    description: "Global CDN ensures your links redirect instantly, anywhere in the world. No delays, no downtime.",
    gradient: "from-primary to-secondary"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    subtitle: "Free Protection",
    description: "Advanced security features including malware detection, spam protection, and HTTPS encryption for all links.",
    gradient: "from-destructive to-red-400"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why Choose{" "}
            <span className="gradient-text">NexusLink?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe powerful tools shouldn't cost a fortune. That's why all our advanced features are completely free, forever.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-glass group hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {feature.subtitle}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 space-y-6">
          <div className="card-glass p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Links?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who trust NexusLink for their link management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero px-8 py-3">
                Get Started
              </button>
              <button className="px-8 py-3 border border-border rounded-xl hover:bg-accent/50 transition-colors">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;