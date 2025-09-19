import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BarChart as BarChartIcon, Globe, Users, Clock, TrendingUp, MousePointer, Copy, ExternalLink } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Create a client
const queryClient = new QueryClient();

// --- Mock Components and Hooks ---
const Navigation = () => (
  <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b z-50">
    <div className="container mx-auto h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
        <span className="font-bold text-lg">NexusLink</span>
      </div>
      <nav className="flex items-center gap-4">
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Dashboard</a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Settings</a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t">
    <div className="container mx-auto py-6 px-4 text-center text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()} NexusLink. All Rights Reserved.
    </div>
  </footer>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`border bg-card text-card-foreground rounded-lg shadow-sm ${className}`}>{children}</div>;
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>{children}</div>;
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Button = ({ children, onClick, variant = 'default', size = 'default', className = '' }: { children: React.ReactNode, onClick?: () => void, variant?: string, size?: string, className?: string }) => (
    <button onClick={onClick} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${variant === 'outline' ? 'border border-input hover:bg-accent hover:text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'} ${size === 'sm' ? 'h-9 px-3' : 'h-10 py-2 px-4'} ${className}`}>
        {children}
    </button>
);

const useToast = () => {
    return {
        toast: ({ title, description }: { title: string, description: string }) => {
            console.log(`Toast: ${title} - ${description}`);
            alert(`${title}\n${description}`);
        }
    };
};

// --- Mock Supabase Client and Data ---
const mockSupabase = {
  from: (...args: any[]) => ({
    select: (...args: any[]) => ({
      gte: (...args: any[]) => ({
        order: (...args: any[]) => ({
          limit: async (...args: any[]) => {
            const since = new Date();
            since.setDate(since.getDate() - 7);
            const mockEvents = Array.from({ length: 150 }).map((_, i) => {
                const eventDate = new Date(since.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
                const userAgentPool = ['Chrome mobile', 'Safari desktop', 'Firefox desktop', 'Edge mobile', 'Chrome desktop'];
                const referrerPool = ['google.com', 'facebook.com', 'Direct', 'twitter.com', 'Direct', 'Direct'];
                return {
                    id: i,
                    occurred_at: eventDate.toISOString(),
                    event_type: 'link_clicked',
                    payload: {
                        link_id: (i % 5 + 1).toString(),
                        userAgent: userAgentPool[i % userAgentPool.length],
                        referrer: referrerPool[i % referrerPool.length],
                    }
                }
            });
            return { data: mockEvents, error: null };
          }
        })
      }),
      order: async (...args: any[]) => {
          const mockLinks = Array.from({length: 5}).map((_, i) => ({
              id: i + 1,
              code: `demo${i+1}`,
              destination: `https://example.com/long-url-destination-${i+1}`,
              created_at: new Date().toISOString(),
          }));
          return { data: mockLinks, error: null };
      }
    })
  })
};

const supabase = mockSupabase;


// --- Original Component Logic ---

type EventRow = {
  id: number;
  occurred_at: string;
  event_type: string;
  payload: any;
};

type LinkRow = {
  id: number;
  code: string;
  destination: string;
  created_at: string;
};

function groupEventsByDay(rows: EventRow[]) {
  const byDay = new Map<string, number>();
  for (const row of rows) {
    const day = new Date(row.occurred_at).toISOString().slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
  }
  const data = Array.from(byDay.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  return data;
}

function getDeviceData(rows: EventRow[]) {
  const devices = new Map<string, number>();
  rows.forEach(row => {
    if (row.payload?.userAgent) {
      const ua = row.payload.userAgent.toLowerCase();
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        devices.set('Mobile', (devices.get('Mobile') || 0) + 1);
      } else if (ua.includes('tablet') || ua.includes('ipad')) {
        devices.set('Tablet', (devices.get('Tablet') || 0) + 1);
      } else {
        devices.set('Desktop', (devices.get('Desktop') || 0) + 1);
      }
    }
  });
  return Array.from(devices.entries()).map(([device, count]) => ({ device, count }));
}

function getBrowserData(rows: EventRow[]) {
  const browsers = new Map<string, number>();
  rows.forEach(row => {
    if (row.payload?.userAgent) {
      const ua = row.payload.userAgent.toLowerCase();
      if (ua.includes('chrome')) browsers.set('Chrome', (browsers.get('Chrome') || 0) + 1);
      else if (ua.includes('firefox')) browsers.set('Firefox', (browsers.get('Firefox') || 0) + 1);
      else if (ua.includes('safari')) browsers.set('Safari', (browsers.get('Safari') || 0) + 1);
      else if (ua.includes('edge')) browsers.set('Edge', (browsers.get('Edge') || 0) + 1);
      else browsers.set('Other', (browsers.get('Other') || 0) + 1);
    }
  });
  return Array.from(browsers.entries()).map(([browser, count]) => ({ browser, count }));
}

function getReferrerData(rows: EventRow[]) {
  const referrers = new Map<string, number>();
  rows.forEach(row => {
    const referrer = row.payload?.referrer || 'Direct';
    const domain = referrer === 'Direct' ? 'Direct' :
      referrer.includes('google') ? 'Google' :
      referrer.includes('facebook') ? 'Facebook' :
      referrer.includes('twitter') ? 'Twitter' :
      referrer.includes('linkedin') ? 'LinkedIn' :
      'Other';
    referrers.set(domain, (referrers.get(domain) || 0) + 1);
  });
  return Array.from(referrers.entries()).map(([source, count]) => ({ source, count }));
}

function getHourlyData(rows: EventRow[]) {
  const hours = new Map<number, number>();
  rows.forEach(row => {
    const hour = new Date(row.occurred_at).getHours();
    hours.set(hour, (hours.get(hour) || 0) + 1);
  });
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    count: hours.get(i) || 0
  }));
  return data;
}

const Dashboard = () => {
  const { toast } = useToast();

  const { data, isLoading, isError } = useQuery<EventRow[]>({
    queryKey: ["events", "recent"],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - 7);
      const { data, error } = await supabase
        .from("events")
        .select("id, occurred_at, event_type, payload")
        .gte("occurred_at", since.toISOString())
        .order("occurred_at", { ascending: true })
        .limit(500);
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: linksData, isLoading: linksLoading } = useQuery<LinkRow[]>({
    queryKey: ["links", "user"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("links")
        .select("id, code, destination, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const chartData = groupEventsByDay(data ?? []);
  const deviceData = getDeviceData(data ?? []);
  const browserData = getBrowserData(data ?? []);
  const referrerData = getReferrerData(data ?? []);
  const hourlyData = getHourlyData(data ?? []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      toast({
        title: "Copied!",
        description: "Link copied to clipboard.",
      });
    } catch (error) {
      console.error('Copy failed', error);
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
      });
    }
  };

  const getClickCount = (linkId: number) => {
    return data?.filter(event =>
      event.payload?.link_id === linkId.toString() &&
      event.event_type === 'link_clicked'
    ).length || 0;
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{'--background': '0 0% 3.9%', '--foreground': '0 0% 98%', '--card': '0 0% 3.9%', '--card-foreground': '0 0% 98%', '--popover': '0 0% 3.9%', '--popover-foreground': '0 0% 98%', '--primary': '0 0% 98%', '--primary-foreground': '0 0% 9%', '--secondary': '0 0% 14.9%', '--secondary-foreground': '0 0% 98%', '--muted': '0 0% 14.9%', '--muted-foreground': '0 0% 63.9%', '--accent': '0 0% 14.9%', '--accent-foreground': '0 0% 98%', '--destructive': '0 84.2% 60.2%', '--destructive-foreground': '0 0% 98%', '--border': '0 0% 14.9%', '--input': '0 0% 14.9%', '--ring': '0 0% 83.1%'} as React.CSSProperties}>
      <Navigation />
      <main>
        <section className="pt-24 pb-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <BarChartIcon className="w-8 h-8 text-primary" />
              <span className="gradient-text" style={{background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Analytics Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Last 7 days of recorded events</p>
          </div>
        </section>

        <section className="py-8 px-4">
          <div className="container mx-auto max-w-7xl space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                  <MousePointer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data?.length ?? 0}</div>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unique Devices</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{deviceData.length}</div>
                  <p className="text-xs text-muted-foreground">Device types</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{referrerData.length}</div>
                  <p className="text-xs text-muted-foreground">Referrer types</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {hourlyData.length > 0 ?
                      hourlyData.reduce((max, item) => item.count > max.count ? item : max, hourlyData[0]).hour
                      : 'N/A'
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">Most active time</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Clicks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Daily Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">Loading…</div>
                  ) : isError ? (
                    <div className="flex items-center justify-center h-full text-destructive">Failed to load data</div>
                  ) : chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No clicks yet. Create and share some links!
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                        <YAxis allowDecimals={false} stroke="var(--muted-foreground)" />
                        <RechartTooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                        <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Device Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Device Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  {deviceData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No device data yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {deviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                         <RechartTooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Browser Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Browser Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  {browserData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No browser data yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={browserData}>
                        <XAxis dataKey="browser" stroke="var(--muted-foreground)" />
                        <YAxis allowDecimals={false} stroke="var(--muted-foreground)" />
                         <RechartTooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" />
                    Traffic Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  {referrerData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No referrer data yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={referrerData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {referrerData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                         <RechartTooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Hourly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Hourly Activity Pattern
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                {hourlyData.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No hourly data yet
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <XAxis dataKey="hour" stroke="var(--muted-foreground)" />
                      <YAxis allowDecimals={false} stroke="var(--muted-foreground)" />
                       <RechartTooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }} />
                      <Bar dataKey="count" fill="hsl(var(--secondary))" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* My Links Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  My Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                {linksLoading ? (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    Loading your links...
                  </div>
                ) : linksData && linksData.length > 0 ? (
                  <div className="space-y-4">
                    {linksData.map((link) => {
                      const shortUrl = `${window.location.origin}/r/${link.code}`;
                      const clickCount = getClickCount(link.id);

                      return (
                        <div
                          key={link.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1 min-w-0 mb-4 sm:mb-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                {link.code}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {clickCount} clicks
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium truncate" title={link.destination}>
                                {link.destination}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {shortUrl}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Created: {new Date(link.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(shortUrl)}
                              className="w-full sm:w-auto"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(link.destination, '_blank')}
                               className="w-full sm:w-auto"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ExternalLink className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No links yet</p>
                    <p className="text-sm">Create your first shortened link on the homepage!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <Dashboard />
  </QueryClientProvider>
);

export default App;