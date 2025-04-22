"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  DollarSignIcon,
  ShieldIcon,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: HomeIcon,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: UserIcon,
  },
  {
    title: "Scheduling",
    href: "/scheduling",
    icon: CalendarIcon,
  },
  {
    title: "Billing & Invoicing",
    href: "/invoicing",
    icon: CreditCardIcon,
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: DollarSignIcon,
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: ShieldIcon,
  },
  {
    title: "Staff Management",
    href: "/staff",
    icon: UsersIcon,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileTextIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsIcon,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <HomeIcon className="h-6 w-6" />
          <span className="text-xl">CareAdmin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto p-2">
        <ul className="grid gap-1">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-md bg-muted p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UserIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@careadmin.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
