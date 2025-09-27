import { useState, useEffect } from "react";
import type { FC, ReactNode, Dispatch, SetStateAction, ElementType } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
} from "recharts";
import {
  BarChart,
  Users,
  Settings,
  HelpCircle,
  Wallet,
  FileText,
  Briefcase,
  Lock,
  Layers,
  Home,
  CheckSquare,
  Calendar,
  Inbox,
  Bell,
  MoreHorizontal,
  Plus,
  MessageSquare,
  Star,
  File,
  MonitorPlay,
  X,
  CreditCard,
  LogOut,
  Activity,
  CircleUserRound,
  ChevronRight,
  Check,
  DollarSign,
  ChevronLeft,
  Search,
  PlusSquare,
  UserPlus,
  Clock,
  Filter,
  CalendarDays,
  Menu, // Import Menu icon for mobile
} from "lucide-react";


type ChartData = { uv: number };
type LeadData = { name: string; value: number; color: string };
type SaleData = { name: string; subtitle: string; amount: number; projects: number; icon: string };
type TeamMember = { name: string; role: string; progress: number; img: string; color: string };
type Project = { name: string; subtitle: string; progress: number; icon: string };
type Schedule = { date: string; title: string; time: string; attendees: string[] };
type PaymentData = { name: string; value: number; line: number };
type Notification = { title: string; description: string; time: string; icon: ReactNode };
type Page = 'Dashboard' | 'Analytics' | 'Tasks' | 'Calendar' | 'Inbox' | 'Applications' | 'Proposal' | 'Payment' | 'Customers' | 'Projects' | 'Team' | 'Authentication';
type ThemeOption = 'light' | 'dark';
type TypographyOption = 'Lato' | 'Rubik' | 'Cinzel' | 'Nunito' | 'Roboto' | 'Ubuntu' | 'Poppins' | 'Inter';

type InfoCardData = {
  id: string;
  icon: ElementType;
  value: string;
  title: string;
  progress: number;
  progressLabel: string;
  progressValueText: string;
  color: string;
};

type Lead = {
  name: string;
  email: string;
  avatar: string;
  proposal: 'Sent' | 'New' | 'Returning';
  date: string;
  status: 'Completed' | 'In Progress' | 'Not Interested';
};

type Language = {
    name: string;
    flagUrl: string;
}

type DateRange = {
    from: Date | null;
    to: Date | null;
}

const miniChartData1: ChartData[] = [ { uv: 10 }, { uv: 25 }, { uv: 15 }, { uv: 40 }, { uv: 20 }, { uv: 50 }, { uv: 30 }];
const miniChartData2: ChartData[] = [ { uv: 20 }, { uv: 15 }, { uv: 30 }, { uv: 25 }, { uv: 45 }, { uv: 35 }, { uv: 50 }];
const miniChartData3: ChartData[] = [ { uv: 30 }, { uv: 20 }, { uv: 40 }, { uv: 25 }, { uv: 35 }, { uv: 50 }, { uv: 40 }];
const leadsPieData: LeadData[] = [ { name: "New", value: 20, color: "#2563eb" }, { name: "Contacted", value: 15, color: "#3b82f6" }, { name: "Qualified", value: 10, color: "#60a5fa" }, { name: "Working", value: 18, color: "#93c5fd" }, { name: "Customer", value: 10, color: "#bfdbfe" }, { name: "Proposal", value: 15, color: "#dbeafe" }, { name: "Leads", value: 16, color: "#eff6ff" }, { name: "Progress", value: 14, color: "#60a5fa" }, { name: "Others", value: 10, color: "#93c5fd" }];
const recentSales: SaleData[] = [ { name: "Shopify eCommerce Store", subtitle: "Development", amount: 1200, projects: 6, icon: "https://www.liblogo.com/img-logo/sh282e5d1-shopify-logo-ecommerce-logo-shopify-icon-free-download-on-iconfinder.png" }, { name: "iOS Apps Development", subtitle: "Development", amount: 1450, projects: 3, icon: "https://cdn-icons-png.flaticon.com/512/888/888841.png" }, { name: "Figma Dashboard Design", subtitle: "UI/UX Design", amount: 1250, projects: 5, icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png" }];
const teamProgress: TeamMember[] = [ { name: "Garima Sharma", role: "Frontend Developer", progress: 40, img: "https://media.licdn.com/dms/image/v2/D5603AQFxt207_Q_DeQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945668995?e=1760572800&v=beta&t=m8z5dlQMOiVb5zgndBjYH6b3mCXzmksCoQwEim7EmNw", color: "stroke-red-500" }, { name: "Ankesh kumar", role: "UI/UX Designer", progress: 65, img: "https://media.licdn.com/dms/image/v2/D5603AQEbp3aQ8P7WzQ/profile-displayphoto-shrink_800_800/B56Zbpqn1LH0Ac-/0/1747676987892?e=1760572800&v=beta&t=1Ue93ZlDfX0WuJTFFtJh0qNfeYuvAMbqvS3n3S9mhX8", color: "stroke-blue-500" }, { name: "Malanie Hanvey", role: "Backend Developer", progress: 50, img: "https://i.pravatar.cc/150?img=3", color: "stroke-orange-500" }, { name: "Kenneth Hune", role: "Digital Marketer", progress: 75, img: "https://i.pravatar.cc/150?img=4", color: "stroke-green-500" }];
const projectStatus: Project[] = [ { name: "Apps...", subtitle: "Applications", progress: 54, icon: "https://cdn-icons-png.flaticon.com/512/888/888841.png" }, { name: "Dashboard...", subtitle: "App UI Kit", progress: 86, icon: "https://cdn-icons-png.flaticon.com/512/799/799985.png" }, { name: "Facebook...", subtitle: "Marketing", progress: 90, icon: "https://cdn-icons-png.flaticon.com/512/174/174848.png" }, { name: "React Dash...", subtitle: "Dashboard", progress: 37, icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png" }, { name: "Paypal Paymen...", subtitle: "Payment", progress: 29, icon: "https://cdn-icons-png.flaticon.com/512/196/196565.png" }];
const schedules: Schedule[] = [ { date: "20 DEC", title: "React Dashboard", time: "11:30am - 12:30pm", attendees: ["https://media.licdn.com/dms/image/v2/D5603AQFxt207_Q_DeQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945668995?e=1760572800&v=beta&t=m8z5dlQMOiVb5zgndBjYH6b3mCXzmksCoQwEim7EmNw", "https://i.pravatar.cc/150?img=6", "https://i.pravatar.cc/150?img=7", "https://i.pravatar.cc/150?img=8"] }, { date: "30 DEC", title: "Admin Design", time: "10:00am - 12:00pm", attendees: ["https://i.pravatar.cc/150?img=9", "https://media.licdn.com/dms/image/v2/D5603AQEbp3aQ8P7WzQ/profile-displayphoto-shrink_400_400/B56Zbpqn1LH0Ag-/0/1747676987892?e=1760572800&v=beta&t=royCz4EIPhzC96Wrnp1Z8J88pcR328dgo_o5IE791ac", "https://i.pravatar.cc/150?img=11"] }, { date: "17 DEC", title: "Standup Team", time: "8:00am - 9:00am", attendees: ["https://i.pravatar.cc/150?img=12", "https://i.pravatar.cc/150?img=13", "https://i.pravatar.cc/150?img=14", "https://i.pravatar.cc/150?img=15"] }, { date: "25 DEC", title: "Zoom Team", time: "03:30pm - 05:30pm", attendees: ["https://media.licdn.com/dms/image/v2/D5603AQEbp3aQ8P7WzQ/profile-displayphoto-shrink_400_400/B56Zbpqn1LH0Ag-/0/1747676987892?e=1760572800&v=beta&t=royCz4EIPhzC96Wrnp1Z8J88pcR328dgo_o5IE791ac", "https://media.licdn.com/dms/image/v2/D5603AQFxt207_Q_DeQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945668995?e=1760572800&v=beta&t=m8z5dlQMOiVb5zgndBjYH6b3mCXzmksCoQwEim7EmNw"] }];
const paymentRecordData: PaymentData[] = [ { name: 'JAN/23', value: 23000, line: 44000 }, { name: 'FEB/23', value: 11000, line: 56000 }, { name: 'MAR/23', value: 27000, line: 40000 }, { name: 'APR/23', value: 28000,  line: 65000 }, { name: 'MAY/23', value: 13000, line: 22000 }, { name: 'JUN/23', value: 22000, line: 42000 }, { name: 'JUL/23', value: 37000, line: 22000 }, { name: 'AUG/23', value: 21000, line: 40000 }, { name: 'SEP/23', value: 44000, line: 55000 }, { name: 'OCT/23', value: 22000, line: 42000 }, { name: 'NOV/23', value: 30000, line: 40000 }, { name: 'DEC/23', value: 21000, line: 55000 },];
const totalSalesData: ChartData[] = [ { uv: 4000 }, { uv: 3000 }, { uv: 2000 }, { uv: 2780 }, { uv: 1890 }, { uv: 2390 }, { uv: 3490 }];
const notifications: Notification[] = [ { title: "New user registered", description: "A new user has registered on your platform.", time: "2 hours ago", icon: <Users className="h-5 w-5 text-blue-500" /> }, { title: "Server downtime", description: "Your server is experiencing downtime.", time: "3 hours ago", icon: <Settings className="h-5 w-5 text-red-500" /> }, { title: "New message", description: "You have a new message from a user.", time: "5 hours ago", icon: <MessageSquare className="h-5 w-5 text-green-500" /> }, { title: "Payment received", description: "You have received a new payment.", time: "1 day ago", icon: <Wallet className="h-5 w-5 text-yellow-500" /> }];

const languages: Language[] = [
    {name: 'English', flagUrl: 'https://flagcdn.com/us.svg'},
    {name: 'Arabic', flagUrl: 'https://flagcdn.com/sa.svg'}, 
    {name: 'Bengali', flagUrl: 'https://flagcdn.com/bd.svg'}, 
    {name: 'Chinese', flagUrl: 'https://flagcdn.com/cn.svg'},
    {name: 'Dutch', flagUrl: 'https://flagcdn.com/nl.svg'}, 
    {name: 'French', flagUrl: 'https://flagcdn.com/fr.svg'}, 
    {name: 'German', flagUrl: 'https://flagcdn.com/de.svg'},
    {name: 'Hindi', flagUrl: 'https://flagcdn.com/in.svg'}, 
    {name: 'Russian', flagUrl: 'https://flagcdn.com/ru.svg'}, 
    {name: 'Spanish', flagUrl: 'https://flagcdn.com/es.svg'},
    {name: 'Turkish', flagUrl: 'https://flagcdn.com/tr.svg'}, 
    {name: 'Urdo', flagUrl: 'https://flagcdn.com/pk.svg'}
];

const infoCardsData: InfoCardData[] = [
    { id: 'invoices', icon: DollarSign, value: '45/76', title: 'Invoices Awaiting Payment', progress: 56, progressLabel: 'Invoices Awaiting', progressValueText: '$5,569 (56%)', color: 'bg-blue-500' },
    { id: 'leads', icon: FileText, value: '48/86', title: 'Converted Leads', progress: 63, progressLabel: 'Converted Leads', progressValueText: '52 Completed (63%)', color: 'bg-orange-500' },
    { id: 'projects', icon: Briefcase, value: '16/20', title: 'Projects in Progress', progress: 78, progressLabel: 'Projects in Progress', progressValueText: '16 Completed (78%)', color: 'bg-green-500' },
    { id: 'conversion', icon: Activity, value: '46.59%', title: 'Conversion Rate', progress: 46, progressLabel: 'Conversion Rate', progressValueText: '$2,254 (46%)', color: 'bg-red-500' }
];

const latestLeadsData: Lead[] = [
    { name: 'Garima Sharma', email: 'garima1011sharma@gmail.com', avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFxt207_Q_DeQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945668995?e=1760572800&v=beta&t=m8z5dlQMOiVb5zgndBjYH6b3mCXzmksCoQwEim7EmNw', proposal: 'Sent', date: '11/06/2023 10:53', status: 'Completed' },
    { name: 'Ankesh Kumar', email: 'ankbeg02@gmail.com', avatar: 'https://media.licdn.com/dms/image/v2/D5603AQEbp3aQ8P7WzQ/profile-displayphoto-shrink_400_400/B56Zbpqn1LH0Ag-/0/1747676987892?e=1760572800&v=beta&t=royCz4EIPhzC96Wrnp1Z8J88pcR328dgo_o5IE791ac', proposal: 'New', date: '11/06/2023 10:53', status: 'In Progress' },
    { name: 'Malanie Hanvey', email: 'lanie.nveyn@gmail.com', avatar: 'https://i.pravatar.cc/150?img=3', proposal: 'Sent', date: '11/06/2023 10:53', status: 'Completed' },
    { name: 'Kenneth Hune', email: 'nneth.une@gmail.com', avatar: 'https://i.pravatar.cc/150?img=4', proposal: 'Returning', date: '11/06/2023 10:53', status: 'Not Interested' },
    { name: 'Valentine Maton', email: 'alenine.aton@gmail.com', avatar: 'https://i.pravatar.cc/150?img=17', proposal: 'Sent', date: '11/06/2023 10:53', status: 'Completed' },
    { name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://i.pravatar.cc/150?img=18', proposal: 'New', date: '10/06/2023 09:12', status: 'In Progress' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://i.pravatar.cc/150?img=19', proposal: 'Sent', date: '10/06/2023 08:45', status: 'Completed' },
    { name: 'Peter Jones', email: 'peter.jones@example.com', avatar: 'https://i.pravatar.cc/150?img=20', proposal: 'Returning', date: '09/06/2023 15:30', status: 'Not Interested' },
    { name: 'Mary Johnson', email: 'mary.j@example.com', avatar: 'https://i.pravatar.cc/150?img=21', proposal: 'Sent', date: '09/06/2023 14:00', status: 'Completed' },
];



interface AnimatedWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean; // Add isMobile prop
  onClose?: () => void; // Add onClose for mobile overlay
  activePage: Page;
  setActivePage: Dispatch<SetStateAction<Page>>;
  navTheme: ThemeOption;
}

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
  onNotificationsToggle: () => void;
  headerTheme: ThemeOption;
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
}

interface CardMenuProps {
  options: string[];
}

interface NewStatCardProps {
  cardId: string;
  icon: ElementType;
  title: string;
  subtitle: string;
  value: string;
  chartData: ChartData[];
  chartColor: string;
  percentage: number;
  onGetInsights: (prompt: string, cardId: string) => void;
  insight?: string;
  isLoading?: boolean;
  skinTheme: ThemeOption;
}

interface ProjectStatusCardProps {
  onGenerateSummary: (prompt: string, cardId: string) => void;
  summary: string;
  isLoading: boolean;
  skinTheme: ThemeOption;
}

interface CircularProgressProps {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThemeSettingsProps {
    isSettingsOpen: boolean;
    toggleSettings: () => void;
    navTheme: ThemeOption;
    setNavTheme: Dispatch<SetStateAction<ThemeOption>>;
    headerTheme: ThemeOption;
    setHeaderTheme: Dispatch<SetStateAction<ThemeOption>>;
    skinTheme: ThemeOption;
    setSkinTheme: Dispatch<SetStateAction<ThemeOption>>;
    typography: TypographyOption;
    setTypography: Dispatch<SetStateAction<TypographyOption>>;
}

interface InfoCardProps {
  icon: ElementType;
  value: string;
  title: string;
  progress: number;
  progressLabel: string;
  progressValueText: string;
  color: string;
  skinTheme: ThemeOption;
}

interface LatestLeadsCardProps {
    skinTheme: ThemeOption;
}

interface UpcomingScheduleCardProps {
    skinTheme: ThemeOption;
}

interface TeamProgressCardProps {
    skinTheme: ThemeOption;
}

interface LeadsOverviewCardProps {
    skinTheme: ThemeOption;
}

interface PaymentRecordCardProps {
    skinTheme: ThemeOption;
}

interface TotalSalesCardProps {
    skinTheme: ThemeOption;
}

interface SubHeaderProps {
    activePage: Page;
    skinTheme: ThemeOption;
    dateRange: DateRange;
    setDateRange: Dispatch<SetStateAction<DateRange>>;
}

interface LanguageMenuProps {
    selectedLanguage: string;
    setSelectedLanguage: Dispatch<SetStateAction<string>>;
}




const AnimatedWrapper: FC<AnimatedWrapperProps> = ({ children, delay = 0, className = '' }) => {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`transition-all duration-500 ease-out h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
            {children}
        </div>
    );
};

const Sidebar: FC<SidebarProps> = ({ isOpen, isMobile, onClose, activePage, setActivePage, navTheme }) => {
    const navItems: { name: Page; icon: ElementType }[] = [
        { name: 'Dashboard', icon: Home },
        { name: 'Analytics', icon: BarChart },
        { name: 'Tasks', icon: CheckSquare },
        { name: 'Calendar', icon: Calendar },
        { name: 'Inbox', icon: Inbox },
        { name: 'Applications', icon: Briefcase },
        { name: 'Proposal', icon: FileText },
        { name: 'Payment', icon: Wallet },
        { name: 'Customers', icon: Users },
        { name: 'Projects', icon: Layers },
        { name: 'Team', icon: Users },
        { name: 'Authentication', icon: Lock },
    ];
    
    const isDark = navTheme === 'dark';
    const sidebarBg = isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800';
    const sidebarBorder = isDark ? 'border-gray-700' : 'border-gray-200';
    const titleClasses = isDark ? 'text-white' : 'text-black';
    const linkClasses = (isActive: boolean) => {
        if (isActive) {
            return isDark ? 'bg-gray-700 text-white font-semibold' : 'bg-blue-50 text-blue-600 font-semibold';
        }
        return isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600';
    };
    const settingsLinkClasses = isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600';
    const downloadCardClasses = isDark ? 'bg-gray-700 text-gray-200' : 'bg-blue-50 text-gray-800';

    const handleLinkClick = (page: Page) => {
        setActivePage(page);
        if (isMobile && onClose) {
            onClose();
        }
    };

    const sidebarContent = (
        <div className="flex flex-col justify-between h-full">
            <div>
                {isOpen ? (
                    <div className="flex items-center justify-between mb-8">
                      <h1 className={`text-2xl font-bold whitespace-nowrap ${titleClasses}`}>DURALUX</h1>
                      {isMobile && <Button variant="ghost" size="icon" onClick={onClose}><X/></Button>}
                    </div>
                ) : (
                    <div className="bg-blue-600 h-12 w-12 flex items-center justify-center rounded-lg mx-auto mb-8">
                        <span className="text-white text-2xl font-bold">D</span>
                    </div>
                )}
                
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleLinkClick(item.name)}
                            className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${!isOpen ? 'justify-center' : ''} ${linkClasses(activePage === item.name)}`}
                        >
                            <item.icon size={18} />
                            {isOpen && <span>{item.name}</span>}
                        </button>
                    ))}
                </nav>
            </div>
          
            <div>
                <div className="space-y-2 mb-4">
                    <a href="#" className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${!isOpen ? 'justify-center' : ''} ${settingsLinkClasses}`}>
                        <Settings size={18} />
                        {isOpen && <span>Settings</span>}
                    </a>
                    <a href="#" className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${!isOpen ? 'justify-center' : ''} ${settingsLinkClasses}`}>
                        <HelpCircle size={18} />
                        {isOpen && <span>Help Center</span>}
                    </a>
                </div>
                {isOpen && (
                    <div className={`text-center p-4 rounded-xl ${downloadCardClasses}`}>
                        <h2 className="text-md font-semibold mb-2">Downloading Center</h2>
                        <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Duralux is a production ready CRM to get started easily.</p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Download Now</Button>
                    </div>
                )}
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <aside className={`fixed inset-y-0 left-0 z-50 flex-col justify-between border-r p-4 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 ${sidebarBg} ${sidebarBorder}`}>
                {sidebarContent}
            </aside>
        );
    }
    
    return (
        <aside className={`hidden sm:flex flex-col justify-between border-r transition-all duration-300 ease-in-out ${isOpen ? 'w-64 p-4' : 'w-20 p-4'} shrink-0 ${sidebarBg} ${sidebarBorder}`}>
            {sidebarContent}
        </aside>
    );
};

const LanguageMenu: FC<LanguageMenuProps> = ({ selectedLanguage, setSelectedLanguage }) => {

    return (
        <DropdownMenuContent align="end" className="w-80 p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="font-semibold">Select Language</p>
                    <p className="text-xs text-muted-foreground">{languages.length} languages available!</p>
                </div>
                <Button size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {languages.map(lang => (
                    <Button 
                        key={lang.name} 
                        variant={selectedLanguage === lang.name ? "secondary" : "ghost"}
                        className={`justify-start items-center ${selectedLanguage === lang.name ? 'border-2 border-blue-500' : ''}`}
                        onClick={() => setSelectedLanguage(lang.name)}
                    >
                        <img src={lang.flagUrl} alt={`${lang.name} flag`} className="w-5 h-auto mr-2 rounded-sm" />
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.name && <Check className="h-4 w-4 ml-auto text-blue-600"/>}
                    </Button>
                ))}
            </div>
        </DropdownMenuContent>
    )
}

const TimerMenu: FC = () => (
    <DropdownMenuContent align="end" className="w-80 p-0 bg-white/80 backdrop-blur-sm">
        <div className="p-4 flex justify-between items-center border-b">
            <p className="font-semibold">Timesheets</p>
            <div className="flex items-center gap-2 text-green-600 bg-green-100 text-xs font-semibold px-2 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                <span>3 Upcoming</span>
            </div>
        </div>
        <div className="p-8 text-center">
            <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-gray-500" />
            </div>
            <p className="font-semibold mb-1">No started timers found yet!</p>
            <Button className="mt-4">STARTED TIMER</Button>
        </div>
        <div className="p-2 border-t text-center">
            <Button variant="link" className="w-full">Alls Timesheets</Button>
        </div>
    </DropdownMenuContent>
)

const SearchMenu: FC = () => {
    const searchCategories = ["Projects", "Leads", "Contacts", "Inbox", "Invoices", "Tasks", "Customers", "Notes", "Affiliate", "Storage", "Calendar"];
    const recentResults = [
        { icon: MonitorPlay, title: "CRM dashboard redesign", path: "Home / project / crm", shortcut: "/" },
        { icon: PlusSquare, title: "Create new document", path: "Home / tasks / docs", shortcut: "N" },
        { icon: UserPlus, title: "Invite project colleagues", path: "Home / project / invite", shortcut: "P" },
    ];
    const userResults = [
        { avatar: 'https://i.pravatar.cc/150?img=2', name: 'Archie Cantones' },
        { avatar: 'https://i.pravatar.cc/150?img=16', name: 'Holmes Cherryman' },
        { avatar: 'https://i.pravatar.cc/150?img=3', name: 'Malanie Hanvey' },
    ];
    
    return (
        <DropdownMenuContent align="start" className="w-[500px] max-w-[90vw] p-0 bg-white/80 backdrop-blur-sm">
             <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search..." className="w-full pl-10 pr-16 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 border px-2 py-1 rounded">ESC</span>
                    </div>
                </div>
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <p className="text-sm font-semibold text-gray-600 mb-3">I'm searching for...</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {searchCategories.map(cat => <Button key={cat} variant="outline" size="sm" className="text-gray-600">{cat}</Button>)}
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Recent</h3>
                            <span className="ml-2 bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                        </div>
                        <div className="space-y-2">
                           {recentResults.map(item => (
                               <div key={item.title} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                                   <div className="flex items-center gap-3">
                                       <div className="p-2 bg-gray-100 rounded-md"><item.icon size={20} className="text-gray-600"/></div>
                                       <div>
                                           <p className="font-semibold text-sm">{item.title}</p>
                                           <p className="text-xs text-gray-500">{item.path}</p>
                                       </div>
                                   </div>
                                   <div className="flex items-center gap-2">
                                       <span className="text-xs font-mono text-gray-500 border px-2 py-1 rounded">{item.shortcut}</span>
                                       <span className="text-xs font-mono text-gray-500 border p-1 rounded">⌘</span>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>
                    
                    <div>
                        <div className="flex items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Users</h3>
                            <span className="ml-2 bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">5</span>
                        </div>
                         <div className="space-y-2">
                           {userResults.map(user => (
                               <div key={user.name} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                                   <div className="flex items-center gap-3">
                                       <Avatar className="h-9 w-9"><AvatarImage src={user.avatar} /><AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback></Avatar>
                                       <p className="font-semibold text-sm">{user.name}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
        </DropdownMenuContent>
    );
};


const Header: FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen, isMobileSidebarOpen, setIsMobileSidebarOpen, onNotificationsToggle, headerTheme, selectedLanguage, setSelectedLanguage }) => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);

    const isDark = headerTheme === 'dark';
    const headerClasses = isDark ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-white text-gray-800 border-b';
    const iconColor = isDark ? 'text-gray-400' : 'text-gray-500';

    const currentFlag = languages.find(lang => lang.name === selectedLanguage)?.flagUrl || '';
    
    return (
      <header className={`flex items-center justify-between p-4 sm:p-6 sticky top-0 z-20 ${headerClasses}`}>
        <div className="flex items-center">
            {/* Mobile menu button */}
            <Button onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} variant="ghost" size="icon" className="sm:hidden mr-2">
                <Menu />
            </Button>
            {/* Desktop sidebar toggle button */}
             <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-8 w-8 p-0 flex-shrink-0 mr-4 hidden sm:flex items-center justify-center">
                <ChevronLeft className={`transition-transform duration-300 h-5 w-5 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
            </Button>
            <Button variant="outline" className={`hidden md:block transition-all duration-300 ${isDark ? 'text-gray-300 border-gray-600 hover:bg-gray-700':''}`}>
                MEGA MENU
            </Button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={`${iconColor} hover:bg-gray-700`}>
                        <Search className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <SearchMenu />
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={`${iconColor} hover:bg-gray-700`}>
                        <img src={currentFlag} className="w-6 h-auto rounded-sm" alt={`${selectedLanguage} Flag`} />
                    </Button>
                </DropdownMenuTrigger>
                <LanguageMenu selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className={`relative ${iconColor} hover:bg-gray-700`}>
                        <Clock className="h-5 w-5" />
                         <span className={`absolute top-1 right-1 h-4 w-4 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center border-2 ${isDark ? 'border-gray-800' : 'border-white'}`}>2</span>
                    </Button>
                </DropdownMenuTrigger>
                <TimerMenu />
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={onNotificationsToggle} className={`relative ${iconColor} hover:bg-gray-700`}>
                <Bell className="transition-transform duration-200 hover:scale-110" />
                <span className={`absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center border-2 ${isDark ? 'border-gray-800' : 'border-white'}`}>1</span>
            </Button>
          <DropdownMenu open={isProfileDropdownOpen} onOpenChange={setProfileDropdownOpen}>
              <DropdownMenuTrigger asChild>
                  <div onMouseEnter={() => setProfileDropdownOpen(true)} className="cursor-pointer">
                      <Avatar className="h-9 w-9 transition-transform duration-200 hover:scale-110">
                          <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQFxt207_Q_DeQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945668995?e=1760572800&v=beta&t=m8z5dlQMOiVb5zgndBjYH6b3mCXzmksCoQwEim7EmNw" alt="User Avatar" />
                          <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                  </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                  align="end" 
                  className="w-64 bg-white/80 backdrop-blur-sm" 
                  onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                  <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center space-x-3 p-2">
                          <Avatar>
                              <AvatarImage src="https://media.licdn.com/dms/image/v2/D5603AQFxt207_Q_DeQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729945668995?e=1760572800&v=beta&t=m8z5dlQMOiVb5zgndBjYH6b3mCXzmksCoQwEim7EmNw" alt="User Avatar" />
                              <AvatarFallback>GM</AvatarFallback>
                          </Avatar>
                          <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-800">Garima Sharma</p>
                                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">PRO</span>
                              </div>
                              <p className="text-xs text-muted-foreground">garima1011sharma@gmail.com</p>
                          </div>
                      </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="py-2 cursor-pointer text-gray-700">
                      <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              Active
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 cursor-pointer text-gray-700">
                       <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                              <Wallet className="mr-2 h-4 w-4" />
                              <span>Subscriptions</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="text-gray-700">
                      <DropdownMenuItem className="py-2 cursor-pointer"><CircleUserRound className="mr-2 h-4 w-4" /><span>Profile Details</span></DropdownMenuItem>
                      <DropdownMenuItem className="py-2 cursor-pointer"><Activity className="mr-2 h-4 w-4" /><span>Activity Feed</span></DropdownMenuItem>
                      <DropdownMenuItem className="py-2 cursor-pointer"><CreditCard className="mr-2 h-4 w-4" /><span>Billing Details</span></DropdownMenuItem>
                      <DropdownMenuItem className="py-2 cursor-pointer"><Bell className="mr-2 h-4 w-4" /><span>Notifications</span></DropdownMenuItem>
                      <DropdownMenuItem className="py-2 cursor-pointer"><Settings className="mr-2 h-4 w-4" /><span>Account Settings</span></DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-2 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
};

const SubHeader: FC<SubHeaderProps> = ({ activePage, skinTheme, dateRange }) => {
    const isDark = skinTheme === 'dark';
    const containerClasses = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-b';
    const titleClasses = isDark ? 'text-white' : 'text-gray-800';
    const breadcrumbClasses = isDark ? 'text-gray-400' : 'text-gray-500';
    const buttonClasses = isDark ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white';

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: '2-digit' };
        return date.toLocaleDateString('en-US', options).replace(',', '');
    };
    
    const formatDateRange = () => {
        if (dateRange.from && dateRange.to) {
            return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
        }
        return "Select Date Range";
    };

    return (
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b ${containerClasses}`}>
            <div>
                <h2 className={`text-xl font-bold ${titleClasses}`}>{activePage}</h2>
                <p className={`text-sm ${breadcrumbClasses}`}>
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>{activePage}</span>
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={`w-1/2 sm:w-auto ${buttonClasses}`}>
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {formatDateRange()}
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={`w-1/2 sm:w-auto ${buttonClasses}`}>
                            <Filter className="mr-2 h-4 w-4" />
                            FILTER
                        </Button>
                    </DropdownMenuTrigger>
                </DropdownMenu>
            </div>
        </div>
    )
}

const CardMenu: FC<CardMenuProps> = ({ options }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/80 backdrop-blur-sm">
            {options.map((option: string) => (
                <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

const NewStatCard: FC<NewStatCardProps> = ({ cardId, icon: Icon, title, subtitle, value, chartData, chartColor, percentage, onGetInsights, insight, isLoading, skinTheme }) => {
    const handleInsightsClick = (): void => {
        const prompt = `Analyze the metric "${title}" which is currently at "${value}". The trend shows it is ${percentage}% more than the last period. Provide a brief, actionable insight based on this data.`;
        if (onGetInsights) onGetInsights(prompt, cardId);
    };
    
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const textClasses = isDark ? 'text-white' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';
    const iconContainerClasses = isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200';
    const iconClasses = isDark ? 'text-gray-300' : 'text-gray-600';
    const insightClasses = isDark ? 'text-gray-400 border-gray-600' : 'text-muted-foreground border-gray-200';

    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardClasses}`}>
            <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`p-3 border rounded-full ${iconContainerClasses}`}><Icon className={`h-5 w-5 ${iconClasses}`} /></div>
                    <div>
                        <p className={`text-sm ${mutedClasses}`}>{title}</p>
                        <p className={`text-xs ${mutedClasses}`}>{subtitle}</p>
                    </div>
                </div>
                <p className={`text-2xl font-bold ${textClasses}`}>{value}</p>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs><linearGradient id={`gradient-${chartColor}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={chartColor} stopOpacity={0.1}/><stop offset="95%" stopColor={chartColor} stopOpacity={0}/></linearGradient></defs>
                        <Area type="monotone" dataKey="uv" stroke={chartColor} strokeWidth={2} fill={`url(#gradient-${chartColor})`} />
                    </AreaChart>
                </ResponsiveContainer>
                 <div className="flex justify-between items-center mt-2">
                     <Button onClick={handleInsightsClick} size="sm" variant="link" className="text-xs p-0 h-auto" disabled={isLoading}>
                         {isLoading ? 'Analyzing...' : '✨ Get AI Insights'}
                     </Button>
                     <p className="text-sm font-semibold" style={{ color: chartColor }}>{percentage}% more</p>
                 </div>
                 {insight && <p className={`text-xs italic mt-2 border-t pt-2 ${insightClasses}`}>{insight}</p>}
            </CardContent>
        </Card>
    );
};

const UpcomingScheduleCard: FC<UpcomingScheduleCardProps> = ({ skinTheme }) => {
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const textClasses = isDark ? 'text-gray-300' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-gray-500';
    const itemBg = isDark ? 'bg-gray-700' : 'bg-gray-50';

    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={titleClasses}>Upcoming Schedule</CardTitle>
                <CardMenu options={["Add Event", "View Calendar", "Share Schedule"]} />
            </CardHeader>
            <CardContent className="space-y-4">
                {schedules.map((s: Schedule, i: number) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${itemBg}`}>
                        <div className="flex items-center space-x-4">
                            <div className="text-center bg-blue-100 text-blue-800 font-bold p-3 rounded-md">
                                <p className="text-xl">{s.date.split(' ')[0]}</p>
                                <p className="text-xs">{s.date.split(' ')[1]}</p>
                            </div>
                            <div>
                                <p className={`font-semibold ${textClasses}`}>{s.title}</p>
                                <p className={`text-sm ${mutedClasses}`}>{s.time}</p>
                            </div>
                        </div>
                        <div className="flex -space-x-2 overflow-hidden">
                            {s.attendees.map((att: string, index: number) => (
                                 <img key={index} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={att} alt={`attendee ${index+1}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const ProjectStatusCard: FC<ProjectStatusCardProps> = ({ onGenerateSummary, summary, isLoading, skinTheme }) => {
    const handleSummaryClick = (): void => {
        const projectData = projectStatus.map(p => `${p.name} (${p.subtitle}) is at ${p.progress}% completion.`).join('\n');
        const prompt = `Generate a concise, professional summary of the following project statuses for a stakeholder update. Keep it under 70 words:\n\n${projectData}`;
        onGenerateSummary(prompt, 'projectStatus');
    };
    
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const textClasses = isDark ? 'text-gray-300' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-gray-500';
    const iconContainerClasses = isDark ? 'bg-gray-700' : 'bg-gray-100';
    const insightClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';


    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={titleClasses}>Project Status</CardTitle>
                <CardMenu options={["Add Project", "View All Projects", "Export List"]} />
            </CardHeader>
            <CardContent className="space-y-6">
                {projectStatus.map((p: Project, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-md ${iconContainerClasses}`}><img src={p.icon} alt={p.name} className="w-6 h-6" /></div>
                            <div>
                                <p className={`font-semibold ${textClasses}`}>{p.name}</p>
                                <p className={`text-sm ${mutedClasses}`}>{p.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 w-1/3">
                            <Progress value={p.progress} className="h-2" />
                            <span className={`text-sm font-semibold ${textClasses}`}>{p.progress}%</span>
                        </div>
                    </div>
                ))}
            </CardContent>
             <CardFooter className="flex flex-col items-start gap-2">
                 <Button onClick={handleSummaryClick} size="sm" variant="outline" disabled={isLoading} className={isDark ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : ''}>
                     {isLoading ? 'Generating...' : '✨ Get AI Insights'}
                 </Button>
                 {summary && <p className={`text-xs italic whitespace-pre-wrap ${insightClasses}`}>{summary}</p>}
             </CardFooter>
        </Card>
    );
};

const CircularProgress: FC<CircularProgressProps> = ({ progress, color, size = 60, strokeWidth = 6 }) => {
    const radius: number = (size - strokeWidth) / 2;
    const circumference: number = 2 * Math.PI * radius;
    const offset: number = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle className="stroke-gray-200" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
                <circle className={`transition-all duration-500 ease-in-out ${color}`} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
            </svg>
            <span className="absolute text-sm font-semibold text-gray-700">{progress}%</span>
        </div>
    );
};

const TeamProgressCard: FC<TeamProgressCardProps> = ({ skinTheme }) => {
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const memberItemClasses = isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border shadow-sm';
    const nameClasses = isDark ? 'text-gray-200' : 'text-gray-800';
    const roleClasses = isDark ? 'text-gray-400' : 'text-gray-500';
    
    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={titleClasses}>Team Progress</CardTitle>
                <CardMenu options={["Add Member", "View Team Page", "Manage Roles"]} />
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
                {teamProgress.map((member: TeamMember, i: number) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${memberItemClasses}`}>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10"><AvatarImage src={member.img} alt={member.name} /><AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback></Avatar>
                            <div>
                                <p className={`font-semibold ${nameClasses}`}>{member.name}</p>
                                <p className={`text-sm ${roleClasses}`}>{member.role}</p>
                            </div>
                        </div>
                        <CircularProgress progress={member.progress} color={member.color} />
                    </div>
                ))}
            </CardContent>
            <CardFooter className="justify-center"><p className="text-xs text-gray-500 font-semibold tracking-wider">UPDATE 30 MIN AGO</p></CardFooter>
        </Card>
    );
};

const LeadsOverviewCard: FC<LeadsOverviewCardProps> = ({ skinTheme }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const onPieEnter = (_: any, index: number): void => setActiveIndex(index);
    const onPieLeave = (): void => setActiveIndex(null);
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';

    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={titleClasses}>Leads Overview</CardTitle>
                 <CardMenu options={["Refresh", "Share", "Export PDF"]} />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={leadsPieData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} onMouseEnter={onPieEnter} onMouseLeave={onPieLeave}>
                            {leadsPieData.map((entry: LeadData, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} style={{ transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)', transformOrigin: 'center center', transition: 'transform 0.2s ease-in-out', cursor: 'pointer' }} />
                            ))}
                        </Pie>
                          <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number, name: string) => [`${value}K`, name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 mt-4">
                    {leadsPieData.map((entry: LeadData) => (
                        <div key={entry.name} className="flex items-center space-x-2">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                            <span className={`text-xs ${mutedClasses}`}>{entry.name} ({entry.value}K)</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

const PaymentRecordCard: FC<PaymentRecordCardProps> = ({ skinTheme }) => {
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';
    const axisColor = isDark ? '#a1a1aa' : '#94a3b8';
    const gridColor = isDark ? '#3f3f46' : '#f1f5f9';

    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={titleClasses}>Payment Record</CardTitle>
                <CardMenu options={["View Full Report", "Download CSV", "Print"]} />
            </CardHeader>
            <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={paymentRecordData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                         <defs><linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#eef2ff" stopOpacity={0.8}/><stop offset="95%" stopColor="#eef2ff" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid stroke={gridColor} strokeDasharray="0" vertical={false} />
                        <XAxis dataKey="name" tick={{fill: axisColor, fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fill: axisColor, fontSize: 12}} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="line" stroke="#a5b4fc" strokeWidth={2} fillOpacity={0.5} fill="url(#colorUv)" />
                        <Bar dataKey="value" barSize={10} fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </ComposedChart>
                </ResponsiveContainer>
            </CardContent>
             <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                    <p className={`text-sm ${mutedClasses}`}>Awaiting</p>
                    <p className={`text-lg font-bold ${titleClasses}`}>$5,486</p>
                    <Progress value={60} className="h-1 mt-1" />
                </div>
                 <div>
                    <p className={`text-sm ${mutedClasses}`}>Completed</p>
                    <p className={`text-lg font-bold ${titleClasses}`}>$9,275</p>
                    <Progress value={80} className="h-1 mt-1 [&>div]:bg-green-500" />
                </div>
                 <div>
                    <p className={`text-sm ${mutedClasses}`}>Rejected</p>
                    <p className={`text-lg font-bold ${titleClasses}`}>$3,868</p>
                    <Progress value={30} className="h-1 mt-1 [&>div]:bg-red-500" />
                </div>
                 <div>
                    <p className={`text-sm ${mutedClasses}`}>Revenue</p>
                    <p className={`text-lg font-bold ${titleClasses}`}>$50,668</p>
                    <Progress value={95} className="h-1 mt-1 [&>div]:bg-sky-500" />
                </div>
            </CardFooter>
        </Card>
    );
};

const TotalSalesCard: FC<TotalSalesCardProps> = ({ skinTheme }) => {
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const textClasses = isDark ? 'text-gray-300' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-gray-500';
    const iconContainerClasses = isDark ? 'bg-gray-700' : 'bg-gray-100';

    return (
        <Card className={`flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full ${cardClasses}`}>
            <div className="bg-indigo-600 text-white rounded-t-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                         <CardTitle className="text-3xl font-bold">30,569</CardTitle>
                         <p className="text-sm text-indigo-200">Total Sales</p>
                    </div>
                    <CardMenu options={["View Sales Report", "Set New Goal"]} />
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={80}>
                         <AreaChart data={totalSalesData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                             <defs><linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a5b4fc" stopOpacity={0.4}/><stop offset="95%" stopColor="#a5b4fc" stopOpacity={0}/></linearGradient></defs>
                             <Area type="monotone" dataKey="uv" stroke="#c7d2fe" strokeWidth={2} fill="url(#salesGradient)" />
                         </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                     {recentSales.map((sale: SaleData, i: number) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-md ${iconContainerClasses}`}><img src={sale.icon} alt={sale.name} className="w-6 h-6" /></div>
                                <div>
                                    <p className={`font-semibold text-sm ${textClasses}`}>{sale.name}</p>
                                    <p className={`text-xs ${mutedClasses}`}>{sale.subtitle}</p>
                                </div>
                            </div>
                              <div>
                                <p className={`font-semibold text-sm ${textClasses}`}>${sale.amount}</p>
                                <p className={`text-xs text-right ${mutedClasses}`}>{sale.projects} Projects</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="outline" className={`w-full mt-6 ${isDark ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : ''}`}>FULL DETAILS</Button>
            </div>
        </Card>
    );
};

const NotificationPanel: FC<NotificationPanelProps> = ({ isOpen, onClose }) => (
    <div className={`fixed top-0 right-0 h-full bg-white/80 backdrop-blur-sm shadow-lg z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-80 border-l`}>
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {notifications.map((notification: Notification, index: number) => (
                    <div key={index} className="flex items-start p-4 border-b hover:bg-gray-50">
                        <div className="p-2 bg-gray-100 rounded-full mr-4">{notification.icon}</div>
                        <div>
                            <p className="font-semibold text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t">
                <Button variant="outline" className="w-full">View All Notifications</Button>
            </div>
        </div>
    </div>
);


const ThemeSettings: FC<ThemeSettingsProps> = ({ 
    isSettingsOpen, 
    toggleSettings,
    navTheme, setNavTheme,
    headerTheme, setHeaderTheme,
    skinTheme, setSkinTheme,
    typography, setTypography,
}) => {

    const fonts: TypographyOption[] = ['Lato', 'Rubik', 'Cinzel', 'Nunito', 'Roboto', 'Ubuntu', 'Poppins', 'Inter'];

    const handleReset = () => {
        setNavTheme('light');
        setHeaderTheme('light');
        setSkinTheme('light');
        setTypography('Nunito');
    };

    const renderThemeOption = (title: string, value: ThemeOption, setter: Dispatch<SetStateAction<ThemeOption>>) => (
        <div className="p-4 border rounded-lg relative">
            <span className="text-xs font-semibold text-gray-400 bg-white px-1 -mt-6 absolute">{title}</span>
            <div className="flex gap-2 mt-2">
                <Button
                    onClick={() => setter('light')}
                    variant={value === 'light' ? 'default' : 'outline'}
                    className={`flex-1 justify-center ${value === 'light' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-gray-300'}`}
                >
                    {value === 'light' ? <Check className="h-4 w-4" /> : 'LIGHT'}
                </Button>
                <Button 
                    onClick={() => setter('dark')} 
                    variant={value === 'dark' ? 'default' : 'outline'} 
                    className={`flex-1 justify-center ${value === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-gray-300'}`}
                >
                    {value === 'dark' ? <Check className="h-4 w-4" /> : 'DARK'}
                </Button>
            </div>
        </div>
    );
    
    return (
        <>
            <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Button
                    size="icon"
                    className="rounded-l-md rounded-r-none h-12 w-12 bg-blue-600 hover:bg-blue-700 shadow-lg"
                    onClick={toggleSettings}
                >
                    <Settings className="h-6 w-6 animate-spin" style={{ animationDuration: '5s' }} />
                </Button>
            </div>

            <div className={`fixed top-0 right-0 h-full bg-white/80 backdrop-blur-sm shadow-xl z-40 transition-transform duration-300 ease-in-out ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-80 border-l flex flex-col`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">Theme Settings</h2>
                    <Button variant="ghost" size="icon" onClick={toggleSettings}><X className="h-5 w-5" /></Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {renderThemeOption('NAVIGATION', navTheme, setNavTheme)}
                    {renderThemeOption('HEADER', headerTheme, setHeaderTheme)}
                    {renderThemeOption('SKINS', skinTheme, setSkinTheme)}
                    
                    <div className="p-4 border rounded-lg relative">
                        <span className="text-xs font-semibold text-gray-400 bg-white px-1 -mt-6 absolute">TYPOGRAPHY</span>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {fonts.map(font => (
                                <Button
                                    key={font}
                                    onClick={() => setTypography(font)}
                                    variant={typography === font ? 'default' : 'outline'}
                                    className={`w-full ${typography === font ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-gray-300'}`}
                                >
                                    {typography === font && <Check className="h-4 w-4 mr-2" />}
                                    {font}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t grid grid-cols-2 gap-4">
                    <Button onClick={handleReset} variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">RESET</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">DOWNLOAD</Button>
                </div>
            </div>
        </>
    );
};

const InfoCard: FC<InfoCardProps> = ({ icon: Icon, value, title, progress, progressLabel, progressValueText, color, skinTheme }) => {
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const valueClasses = isDark ? 'text-white' : '';
    const titleClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';
    const iconContainerClasses = isDark ? 'bg-gray-700' : 'bg-gray-100';
    const iconClasses = isDark ? 'text-gray-300' : 'text-gray-600';

    const getProgressColorClass = () => {
        switch (color) {
            case 'bg-blue-500': return '[&>div]:bg-blue-500';
            case 'bg-orange-500': return '[&>div]:bg-orange-500';
            case 'bg-green-500': return '[&>div]:bg-green-500';
            case 'bg-red-500': return '[&>div]:bg-red-500';
            default: return '';
        }
    };

    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className={`p-3 rounded-full ${iconContainerClasses}`}>
                    <Icon className={`h-5 w-5 ${iconClasses}`} />
                </div>
                <div className="text-right">
                    <p className={`text-2xl font-bold ${valueClasses}`}>{value}</p>
                    <p className={`text-sm ${titleClasses}`}>{title}</p>
                </div>
                <div className="self-start -mt-2 -mr-2">
                     <CardMenu options={["View Details", "Export"]} />
                </div>
            </CardHeader>
            <CardContent>
                <div className={`flex justify-between items-center text-xs mb-1 ${titleClasses}`}>
                    <p>{progressLabel}</p>
                    <p>{progressValueText}</p>
                </div>
                <Progress value={progress} className={`h-2 ${getProgressColorClass()}`} />
            </CardContent>
        </Card>
    );
};


const LatestLeadsCard: FC<LatestLeadsCardProps> = ({ skinTheme }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const headerClasses = isDark ? 'text-gray-400 border-gray-700' : 'text-muted-foreground border-b';
    const rowClasses = isDark ? 'border-gray-700' : 'border-b';
    const textClasses = isDark ? 'text-gray-300' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';
    const proposalBg = isDark ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-600';
    const footerClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';
    const mobileCardBg = isDark ? 'bg-gray-700/50' : 'bg-gray-50';

    const totalPages = Math.ceil(latestLeadsData.length / itemsPerPage);
    const paginatedLeads = latestLeadsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    const getStatusClasses = (status: Lead['status']) => {
      switch (status) {
        case 'Completed': return 'bg-green-100 text-green-700';
        case 'In Progress': return 'bg-blue-100 text-blue-700';
        case 'Not Interested': return 'bg-orange-100 text-orange-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };
    
    return (
        <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${cardClasses}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={titleClasses}>Latest Leads</CardTitle>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    </div>
                    <CardMenu options={["Refresh", "Export"]} />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                {/* Desktop Table View */}
                <div className="overflow-x-auto hidden md:block">
                    <div className="min-w-[700px]">
                        <div className={`grid grid-cols-12 gap-4 text-xs font-semibold px-6 py-3 ${headerClasses}`}>
                            <div className="col-span-4">USERS</div>
                            <div className="col-span-2">PROPOSAL</div>
                            <div className="col-span-2">DATE</div>
                            <div className="col-span-2">STATUS</div>
                            <div className="col-span-2 text-right">ACTIONS</div>
                        </div>
                        <div>
                            {paginatedLeads.map((lead, index) => (
                                <div key={index} className={`grid grid-cols-12 gap-4 items-center px-6 py-3 last:border-b-0 ${rowClasses}`}>
                                    <div className="col-span-4 flex items-center gap-3">
                                        <Avatar className="h-8 w-8"><AvatarImage src={lead.avatar} /><AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className={`font-semibold text-sm ${textClasses}`}>{lead.name}</p>
                                            <p className={`text-xs ${mutedClasses}`}>{lead.email}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2"><span className={`text-xs font-medium px-2 py-1 rounded ${proposalBg}`}>{lead.proposal}</span></div>
                                    <div className={`col-span-2 text-sm ${mutedClasses}`}>{lead.date}</div>
                                    <div className="col-span-2"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClasses(lead.status)}`}>{lead.status}</span></div>
                                    <div className="col-span-2 flex justify-end"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                    {paginatedLeads.map((lead, index) => (
                        <div key={index} className={`p-4 rounded-lg ${mobileCardBg} ${rowClasses} border`}>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar className="h-10 w-10"><AvatarImage src={lead.avatar} /><AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback></Avatar>
                                    <div>
                                        <p className={`font-semibold text-sm ${textClasses}`}>{lead.name}</p>
                                        <p className={`text-xs ${mutedClasses}`}>{lead.email}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2"><MoreHorizontal className="h-4 w-4" /></Button>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className={mutedClasses}>Proposal:</span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${proposalBg}`}>{lead.proposal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={mutedClasses}>Date:</span>
                                    <span className={textClasses}>{lead.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={mutedClasses}>Status:</span>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClasses(lead.status)}`}>{lead.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center pt-4">
                <p className={`text-xs mb-2 sm:mb-0 ${footerClasses}`}>{`Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, latestLeadsData.length)} of ${latestLeadsData.length} entries`}</p>
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrev} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </Button>
                    ))}
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNext} disabled={currentPage === totalPages}><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const Footer: FC<{ skinTheme: ThemeOption }> = ({ skinTheme }) => (
    <footer className={`p-4 text-center text-sm ${skinTheme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>
        © {new Date().getFullYear()} Garima Sharma. All Rights Reserved.
    </footer>
);



const PlaceholderPage: FC<{ title: string, skinTheme: ThemeOption }> = ({ title, skinTheme }) => {
    const isDark = skinTheme === 'dark';
    const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : '';
    const titleClasses = isDark ? 'text-white' : '';
    const textClasses = isDark ? 'text-gray-300' : '';
    const mutedClasses = isDark ? 'text-gray-400' : 'text-muted-foreground';
    
    return (
        <div className="flex items-center justify-center h-full">
            <Card className={`w-full max-w-md text-center ${cardClasses}`}>
                <CardHeader>
                    <CardTitle className={`text-2xl ${titleClasses}`}>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={textClasses}>This is a placeholder page for the {title} section.</p>
                    <p className={`text-sm mt-2 ${mutedClasses}`}>Content for this page can be built out here.</p>
                </CardContent>
            </Card>
        </div>
    );
};

const AnalyticsPage: FC<{ 
    callGeminiAPI: (prompt: string, cardId: string) => Promise<void>; 
    insights: Record<string, string>; 
    insightsLoading: Record<string, boolean>;
    skinTheme: ThemeOption;
}> = ({ callGeminiAPI, insights, insightsLoading, skinTheme }) => (
    <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCardsData.map((card, index) => (
                <AnimatedWrapper key={card.id} delay={index * 100}>
                    <InfoCard 
                        skinTheme={skinTheme}
                        icon={card.icon}
                        value={card.value}
                        title={card.title}
                        progress={card.progress}
                        progressLabel={card.progressLabel}
                        progressValueText={card.progressValueText}
                        color={card.color}
                    />
                </AnimatedWrapper>
            ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <AnimatedWrapper delay={400}><NewStatCard skinTheme={skinTheme} cardId="tasksCompleted" icon={Star} title="Tasks Completed" subtitle="22/35 completed" value="22/35" chartData={miniChartData1} chartColor="#3b82f6" percentage={28} onGetInsights={callGeminiAPI} insight={insights['tasksCompleted']} isLoading={insightsLoading['tasksCompleted']} /></AnimatedWrapper>
             <AnimatedWrapper delay={500}><NewStatCard skinTheme={skinTheme} cardId="newTasks" icon={File} title="New Tasks" subtitle="0/20 tasks" value="5/20" chartData={miniChartData2} chartColor="#22c55e" percentage={34} onGetInsights={callGeminiAPI} insight={insights['newTasks']} isLoading={insightsLoading['newTasks']} /></AnimatedWrapper>
             <AnimatedWrapper delay={600}><NewStatCard skinTheme={skinTheme} cardId="projectDone" icon={MonitorPlay} title="Project Done" subtitle="20/30 project" value="20/30" chartData={miniChartData3} chartColor="#ef4444" percentage={42} onGetInsights={callGeminiAPI} insight={insights['projectDone']} isLoading={insightsLoading['projectDone']} /></AnimatedWrapper>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
             <AnimatedWrapper delay={700} className="lg:col-span-2"><LeadsOverviewCard skinTheme={skinTheme} /></AnimatedWrapper>
             <AnimatedWrapper delay={800} className="lg:col-span-3"><TeamProgressCard skinTheme={skinTheme} /></AnimatedWrapper>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedWrapper delay={900}><UpcomingScheduleCard skinTheme={skinTheme} /></AnimatedWrapper>
            <AnimatedWrapper delay={1000}><ProjectStatusCard skinTheme={skinTheme} onGenerateSummary={callGeminiAPI} summary={insights['projectStatus']} isLoading={insightsLoading['projectStatus']} /></AnimatedWrapper>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <AnimatedWrapper delay={1100} className="lg:col-span-3"><PaymentRecordCard skinTheme={skinTheme} /></AnimatedWrapper>
            <AnimatedWrapper delay={1200} className="lg:col-span-2"><TotalSalesCard skinTheme={skinTheme} /></AnimatedWrapper>
        </div>
        <AnimatedWrapper delay={1300}>
            <LatestLeadsCard skinTheme={skinTheme} />
        </AnimatedWrapper>
    </div>
);

const App: FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [insights, setInsights] = useState<Record<string, string>>({});
    const [insightsLoading, setInsightsLoading] = useState<Record<string, boolean>>({});
    const [activePage, setActivePage] = useState<Page>('Analytics');
    
    const [navTheme, setNavTheme] = useState<ThemeOption>('light');
    const [headerTheme, setHeaderTheme] = useState<ThemeOption>('light');
    const [skinTheme, setSkinTheme] = useState<ThemeOption>('light');
    const [typography, setTypography] = useState<TypographyOption>('Nunito');
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [dateRange, setDateRange] = useState<DateRange>({ from: new Date(2025, 7, 15), to: new Date(2025, 8, 13) });

    useEffect(() => {
        document.body.style.fontFamily = `${typography}, sans-serif`;
        const existingLink = document.getElementById('google-fonts-link');
        if (existingLink) {
            existingLink.remove();
        }
        const link = document.createElement('link');
        link.id = 'google-fonts-link';
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${typography.replace(' ', '+')}:wght@400;600;700&display=swap`;
        document.head.appendChild(link);
    }, [typography]);


    const callGeminiAPI = async (prompt: string, cardId: string): Promise<void> => {
        setInsightsLoading(prev => ({ ...prev, [cardId]: true }));
        setInsights(prev => ({ ...prev, [cardId]: '' }));
        
        const apiKey = ""; // IMPORTANT: Add your API key here
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        
        const payload = { contents: [{ parts: [{ text: prompt }] }] };
        let response: Response | undefined;
        try {
            for (let i = 0; i < 4; i++) {
                try {
                    response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (response.ok) break;
                } catch (e) {
                    if (i === 3) throw e;
                    await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
                }
            }

            if (response && response.ok) {
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                setInsights(prev => ({ ...prev, [cardId]: text || "Sorry, couldn't get a response." }));
            } else {
                 const errorText = response ? `API responded with status: ${response.status}` : 'API request failed after multiple retries.';
                 setInsights(prev => ({ ...prev, [cardId]: `Error: ${errorText}` }));
                 console.error("API Error:", response);
            }
        } catch (error)
        {
            console.error("Fetch Error:", error);
            setInsights(prev => ({ ...prev, [cardId]: "Error: Unable to fetch insights from the API." }));
        } finally {
            setInsightsLoading(prev => ({ ...prev, [cardId]: false }));
        }
    };

    const renderPage = () => {
        switch (activePage) {
            case 'Analytics':
                return <AnalyticsPage callGeminiAPI={callGeminiAPI} insights={insights} insightsLoading={insightsLoading} skinTheme={skinTheme} />;
            default:
                return <PlaceholderPage title={activePage} skinTheme={skinTheme} />;
        }
    };
    
    const mainBgClass = skinTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';

    return (
        <div className={`flex h-screen overflow-hidden ${mainBgClass}`}>
            {/* Mobile sidebar with overlay */}
            <Sidebar 
                isOpen={isMobileSidebarOpen} 
              isMobile={true}
              onClose={() => setIsMobileSidebarOpen(false)}
                activePage={activePage} 
                setActivePage={setActivePage}
                navTheme={navTheme} 
            />
            {isMobileSidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 sm:hidden" onClick={() => setIsMobileSidebarOpen(false)}></div>}

            {/* Desktop sidebar */}
            <Sidebar 
                isOpen={isSidebarOpen} 
              isMobile={false}
                activePage={activePage} 
                setActivePage={setActivePage}
                navTheme={navTheme} 
            />
            <div className="flex-1 flex flex-col">
                <Header 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen}
                  isMobileSidebarOpen={isMobileSidebarOpen}
                  setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    onNotificationsToggle={() => setIsNotificationsOpen(!isNotificationsOpen)} 
                    headerTheme={headerTheme}
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                />
                <SubHeader activePage={activePage} skinTheme={skinTheme} dateRange={dateRange} setDateRange={setDateRange} />
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                   {renderPage()}
                </main>
                <Footer skinTheme={skinTheme} />
            </div>
             <NotificationPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
             <ThemeSettings 
                isSettingsOpen={isSettingsOpen} 
                toggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
                navTheme={navTheme} setNavTheme={setNavTheme}
                headerTheme={headerTheme} setHeaderTheme={setHeaderTheme}
                skinTheme={skinTheme} setSkinTheme={setSkinTheme}
                typography={typography} setTypography={setTypography}
             />
        </div>
    );
};

export default App;