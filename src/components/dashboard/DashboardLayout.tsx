import { useState, ReactNode } from "react";
import { LayoutDashboard, Map, Briefcase, User, BarChart2, UserPlus, PieChart, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import type { ViewId, UserProfile } from "../../App";

type DashboardLayoutProps = {
    currentView: ViewId;
    onNavigate: (view: ViewId) => void;
    children: ReactNode;
    profile?: UserProfile;
};

export const DashboardLayout = ({ currentView, onNavigate, children, profile }: DashboardLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const NavItem = ({ viewId, icon, label, disabled = false, badge = "" }: any) => {
        const isActive = currentView === viewId;
        return (
            <button
                className={`w-full flex items-center ${collapsed ? "justify-center px-0" : "gap-3 px-3"} py-2 rounded-sm transition-all duration-300 ${disabled ? "text-white/40 cursor-not-allowed" :
                    isActive ? "bg-white text-black font-medium shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-white/70 hover:bg-accent/20 hover:text-accent hover:translate-x-1"
                    }`}
                onClick={() => !disabled && onNavigate(viewId)}
                title={collapsed ? label : undefined}
            >
                <div className="flex-shrink-0">{icon}</div>
                {!collapsed && (
                    <>
                        <span className="tracking-tight whitespace-nowrap">{label}</span>
                        {badge && (
                            <span className="ml-auto text-[10px] uppercase tracking-[0.18em] border border-current px-2 py-0.5 rounded-full">
                                {badge}
                            </span>
                        )}
                    </>
                )}
            </button>
        );
    };

    return (
        <section className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside
                className={`relative hidden md:flex flex-col border-r border-white/10 bg-black/80 backdrop-blur-xl transition-[width] duration-300 ${collapsed ? "w-20" : "w-60"
                    }`}
            >
                <button
                    className="absolute -right-3.5 top-8 hidden md:inline-flex items-center justify-center h-7 w-7 rounded-full border border-white/20 bg-black text-white/80 hover:bg-white/10 hover:text-white z-50 flex-shrink-0 transition-transform"
                    onClick={() => setCollapsed((v) => !v)}
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
                <div className={`py-6 border-b border-white/10 flex items-center justify-between gap-3 ${collapsed ? "px-5" : "px-4"}`}>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("dashboard")}>
                        <div className="h-9 w-9 flex items-center justify-center flex-shrink-0">
                            <img src="/logoside.png" alt="NextStep" className="w-full h-full object-contain" />
                        </div>
                        {!collapsed && (
                            <div className="flex-shrink-0 overflow-hidden">
                                <p className="text-sm font-light tracking-tight whitespace-nowrap">NextStep</p>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 text-sm overflow-hidden hover:overflow-y-auto custom-scrollbar">
                    <NavItem viewId="dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <NavItem viewId="roadmap" icon={<Map size={18} />} label="Roadmap" />
                    <NavItem viewId="careers" icon={<Briefcase size={18} />} label="Careers" />
                    <NavItem viewId="project-chart" icon={<BarChart2 size={18} />} label="Project Chart" />
                    <NavItem viewId="mentor-support" icon={<UserPlus size={18} />} label="Mentor Support" />
                    <NavItem viewId="analysis" icon={<PieChart size={18} />} label="Analysis" />
                </nav>

                <div className={`${collapsed ? "px-2" : "px-4"} pb-4 space-y-3`}>
                    {!collapsed && profile && (
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onNavigate("profile")}>
                            <div className="h-10 w-10 shrink-0 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center font-semibold text-lg overflow-hidden">
                                {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={18} />}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white/90 truncate">{profile.name || "Student"}</p>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider truncate">{profile.careerGoal || profile.major || "Pathfinder"}</p>
                            </div>
                        </div>
                    )}
                    {collapsed && profile && (
                        <div className="flex justify-center mb-3">
                            <div className="h-10 w-10 cursor-pointer rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center font-semibold text-lg hover:bg-white/10 transition-colors" onClick={() => onNavigate("profile")} title={profile.name || "Profile"}>
                                {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={18} />}
                            </div>
                        </div>
                    )}
                    <button
                        className={`w-full flex items-center justify-center gap-2 ${collapsed ? "px-0" : "px-3"} py-2 rounded-full border border-white/20 text-xs text-white/80 hover:bg-accent hover:text-black transition-colors`}
                        onClick={() => onNavigate("landing")}
                        title={collapsed ? "Log out" : undefined}
                    >
                        <LogOut size={14} />
                        {!collapsed && <span>Log out</span>}
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 h-screen overflow-y-auto bg-black relative">
                {children}
            </main>
        </section>
    );
};
