import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore, useUIStore } from '../store';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Menu,
    Sun,
    Moon,
    Activity,
    ShieldCheck
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Layout = () => {
    const { user, logout } = useAuthStore();
    const { theme, toggleTheme, isSidebarOpen, toggleSidebar } = useUIStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/', roles: ['Worker', 'Supervisor', 'Admin'] },
        { label: 'Team', icon: Users, path: '/team', roles: ['Supervisor', 'Admin'] },
        { label: 'Analytics', icon: Activity, path: '/analytics', roles: ['Supervisor', 'Admin'] },
        { label: 'Admin', icon: ShieldCheck, path: '/admin', roles: ['Admin'] },
        { label: 'Settings', icon: Settings, path: '/settings', roles: ['Worker', 'Supervisor', 'Admin'] },
    ];

    return (
        <div className={cn("min-h-screen transition-colors duration-300", theme)}>
            <div className="bg-background text-foreground min-h-screen flex">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 transform lg:translate-x-0 lg:static",
                        !isSidebarOpen && "-translate-x-full"
                    )}
                >
                    <div className="h-full flex flex-col p-4">
                        <div className="flex items-center gap-3 mb-10 px-2 leading-none">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                                <Activity size={18} />
                            </div>
                            <span className="text-xl font-bold tracking-tight">OpsDash</span>
                        </div>

                        <nav className="flex-1 space-y-1">
                            {navItems
                                .filter(item => !item.roles || (user && item.roles.includes(user.role)))
                                .map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={({ isActive }) => cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                        </nav>

                        <div className="pt-4 border-t border-border mt-auto">
                            <div className="px-4 py-3 flex items-center gap-3 mb-4">
                                <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-primary/20" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{user?.role}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-muted-foreground hover:text-error hover:bg-error/5 transition-colors"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleSidebar}
                                className="p-2 hover:bg-secondary rounded-lg lg:hidden"
                            >
                                <Menu size={20} />
                            </button>
                            <h2 className="text-lg font-semibold lg:block hidden">Operations Dashboard</h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 hover:bg-secondary rounded-xl transition-colors"
                                title="Toggle Theme"
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-border lg:hidden">
                                <img src={user?.avatar} alt="User" />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
