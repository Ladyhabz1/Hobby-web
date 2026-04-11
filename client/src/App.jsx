import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Gallery from "@/pages/Gallery";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
function Router() {
    return (<Switch>
      <Route path={"/"} component={Home}/>
      <Route path={"/blog"} component={Blog}/>
      <Route path={"/gallery"} component={Gallery}/>
      <Route path={"/contact"} component={Contact}/>
      <Route path={"/404"} component={NotFound}/>
      {/* Final fallback route */}
      <Route component={NotFound}/>
    </Switch>);
}
// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook
function App() {
    return (<ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Router />
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>);
}
export default App;
