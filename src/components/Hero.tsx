import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link2, Sparkles, BarChart3, Globe, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createShortLink } from "@/lib/links";

const Hero = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleShorten = async () => {
    if (!url.trim()) return;
    setIsLoading(true);
    try {
      const code = await createShortLink(url.trim());
      const origin = window.location.origin;
      setShortUrl(`${origin}/r/${code}`);
    } catch (e) {
      toast({ title: "Failed to shorten", description: "Check Supabase setup.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast({
        title: "Link copied!",
        description: "Your shortened link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/30 border border-primary/20 rounded-full px-4 py-2 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">No Limits • Advanced Analytics • Custom Domains</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The{" "}
              <span className="gradient-text">All-in-One</span>
              <br />
              URL Shortener
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transform your links into powerful marketing tools. Get advanced analytics, 
              custom branding, and geo-targeting - completely free.
            </p>
          </div>

          {/* URL Shortener Form */}
          <div className="max-w-2xl mx-auto space-y-6 animate-scale-in">
            <div className="card-glass p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="Paste your long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input-modern h-14 text-lg"
                  />
                </div>
                <Button
                  onClick={handleShorten}
                  disabled={!url.trim() || isLoading}
                  className="btn-hero h-14 px-8 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Link2 className="h-5 w-5 mr-2" />
                      Shorten It
                    </>
                  )}
                </Button>
              </div>

              {shortUrl && (
                <div className="flex items-center gap-3 p-4 bg-accent/20 rounded-xl border border-success/20 animate-fade-in">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">Your shortened URL:</p>
                    <p className="text-lg font-mono text-success">{shortUrl}</p>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-success/30 hover:bg-success/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              No registration required • Instant shortening • Advanced features available
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-8 animate-fade-in">
            <div className="flex items-center space-x-2 bg-accent/20 border border-primary/20 rounded-full px-4 py-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm">Advanced Analytics</span>
            </div>
            <div className="flex items-center space-x-2 bg-accent/20 border border-secondary/20 rounded-full px-4 py-2">
              <Globe className="h-4 w-4 text-secondary" />
              <span className="text-sm">Geo-Targeting</span>
            </div>
            <div className="flex items-center space-x-2 bg-accent/20 border border-warning/20 rounded-full px-4 py-2">
              <Palette className="h-4 w-4 text-warning" />
              <span className="text-sm">Custom Branding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;