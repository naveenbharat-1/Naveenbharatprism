import { useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import Hero, { HeroData, HeroStat } from "@/components/Landing/Hero";
import Features from "@/components/Landing/Features";
import LeadForm from "@/components/Landing/LeadForm";
import Footer from "@/components/Landing/Footer";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-banner.png";

const defaultHeroData: HeroData = {
  title: "Welcome to Naveen Bharat Prism",
  subtitle: "Quality education for every student",
  cta_text: "Get Started",
};

const defaultStats: HeroStat[] = [
  { stat_key: "students", stat_value: "500+" },
  { stat_key: "courses", stat_value: "50+" },
  { stat_key: "teachers", stat_value: "20+" },
];

const Navigation = memo(({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Naveen Bharat Prism" 
          className="h-10 w-auto max-w-[160px] object-contain"
          loading="eager"
        />
        <span className="font-bold text-xl text-foreground hidden sm:inline">
          Naveen Bharat Prism
        </span>
      </Link>
      <div className="flex items-center gap-2 flex-wrap">
        <Link to="/courses">
          <Button variant="ghost" className="h-11 text-foreground hover:bg-muted transition-colors duration-200">
            Courses
          </Button>
        </Link>
        <Link to="/books">
          <Button variant="ghost" className="h-11 text-foreground hover:bg-muted transition-colors duration-200 hidden sm:inline-flex">
            Books
          </Button>
        </Link>
        {isAuthenticated ? (
          <Link to="/dashboard">
            <Button className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" className="h-11 text-foreground hover:bg-muted transition-colors duration-200">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
));

Navigation.displayName = "Navigation";

const Index = () => {
  const { isAuthenticated } = useAuth();

  const authState = useMemo(() => isAuthenticated, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={authState} />
      
      <main className="pt-20">
        <Hero data={defaultHeroData} stats={defaultStats} />
        <Features />
        <LeadForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
