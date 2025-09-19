import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Heart, Users, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About{" "}
            <span className="gradient-text">NexusLink</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We believe powerful tools shouldn't cost a fortune. That's why we built 
            the most advanced URL shortener and made it completely free.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card-glass p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              To democratize access to professional link management tools. Every creator, 
              marketer, and business should have access to powerful analytics and 
              customization features without breaking the bank.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-glass text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-muted-foreground">
                Built by the community, for the community. Your feedback shapes our roadmap.
              </p>
            </div>

            <div className="card-glass text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">User-Centric</h3>
              <p className="text-muted-foreground">
                Every feature is designed with real user needs in mind, not profit margins.
              </p>
            </div>

            <div className="card-glass text-center">
              <Zap className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Constantly pushing the boundaries of what's possible with link management.
              </p>
            </div>

            <div className="card-glass text-center">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your data is yours. We never sell your information or compromise your privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="card-glass p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Free?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We believe that powerful tools should be accessible to everyone, regardless of 
                budget constraints. Too many innovative projects never see the light of day 
                because creators can't afford expensive analytics and link management tools.
              </p>
              <p>
                By making NexusLink completely free, we're leveling the playing field. Whether 
                you're a solo creator just starting out or a growing business, you get access 
                to the same enterprise-grade features.
              </p>
              <p>
                Our sustainable model focuses on optional premium services for enterprises 
                that need dedicated support and custom integrations, while keeping the core 
                platform free for everyone else.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;