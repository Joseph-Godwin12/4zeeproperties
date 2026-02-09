import Image from 'next/image';
import Link from 'next/link';
import { User as UserType } from '@/app/types/user';
import { APP_NAME } from '@/app/utils/constant';
import { Building2, Bell, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  user?: UserType;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-8">
             <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                <Building2 className="h-6 w-6" />
                <span>{APP_NAME}</span>
            </Link>

            {/* Public Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
               <Link href="/properties" className="text-muted-foreground transition-colors hover:text-foreground">
                 Properties
               </Link>
               <Link href="/realtor/sales" className="text-muted-foreground transition-colors hover:text-foreground">
                 Realtors
               </Link>
               <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                 About
               </Link>
            </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
             {user ? (
                 <div className="flex items-center gap-3 sm:gap-4">
                     <button className="relative text-muted-foreground hover:text-foreground transition-colors p-1">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive border border-background"></span>
                     </button>
                     
                     <div className="hidden sm:block w-px h-6 bg-border"></div>

                     <div className="flex items-center gap-3">
                         <div className="flex flex-col items-end hidden md:flex">
                             <span className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</span>
                             <span className="text-[10px] uppercase text-muted-foreground tracking-wider">{user.role}</span>
                         </div>
                         <div className="h-9 w-9 rounded-full bg-secondary overflow-hidden border border-border flex items-center justify-center relative">
                             {user.profileImage ? (
                                 <Image 
                                    src={user.profileImage} 
                                    alt={user.firstName} 
                                    fill
                                    className="object-cover"
                                    unoptimized
                                 />
                             ) : (
                                 <UserIcon className="h-5 w-5 text-muted-foreground" />
                             )}
                         </div>
                         <Link href="/auth/logout" className="text-muted-foreground hover:text-destructive transition-colors p-1" title="Sign Out">
                            <LogOut className="h-5 w-5" />
                         </Link>
                     </div>
                 </div>
             ) : (
                 <div className="flex items-center gap-3">
                     <Link href="/auth/login">
                        <Button variant="ghost" size="sm" className='hidden sm:inline-flex'>Log In</Button>
                     </Link>
                     <Link href="/auth/signup">
                        <Button size="sm">Get Started</Button>
                     </Link>
                 </div>
             )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
