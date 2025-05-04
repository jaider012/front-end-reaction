'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Dialog, Disclosure, Popover } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  FilmIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

const videosMenu = [
  { name: 'Browse Videos', href: '/videos', icon: FilmIcon },
  { name: 'Upload Video', href: '/videos/upload', icon: PlayIcon },
  { name: 'My Videos', href: '/videos/my', icon: UserIcon },
  { name: 'Search', href: '/videos/search', icon: MagnifyingGlassIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Reaction Sync Player</span>
            <span className="text-xl font-bold text-primary">Reaction Sync</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href="/"
            className={cn(
              "text-sm font-semibold leading-6 text-gray-900 hover:text-primary",
              pathname === "/" && "text-primary"
            )}
          >
            Home
          </Link>
          
          <Popover className="relative">
            <Popover.Button className={cn(
              "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-primary outline-none",
              (pathname.startsWith("/videos") || pathname.startsWith("/sync")) && "text-primary"
            )}>
              Videos
              <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
            </Popover.Button>

            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
              {videosMenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50",
                    pathname === item.href && "bg-gray-50 text-primary"
                  )}
                >
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-auto">
                    <span className="block font-semibold text-gray-900">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </Popover.Panel>
          </Popover>

          <Link
            href="/sync"
            className={cn(
              "text-sm font-semibold leading-6 text-gray-900 hover:text-primary",
              pathname.startsWith("/sync") && "text-primary"
            )}
          >
            Sync Sessions
          </Link>
          
          <Link
            href="/about"
            className={cn(
              "text-sm font-semibold leading-6 text-gray-900 hover:text-primary",
              pathname === "/about" && "text-primary"
            )}
          >
            About
          </Link>
        </Popover.Group>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className={cn(
                  "flex items-center text-sm font-semibold leading-6 text-gray-900 hover:text-primary",
                  pathname === "/profile" && "text-primary"
                )}
              >
                <UserCircleIcon className="mr-2 h-5 w-5" />
                {user?.username || 'Profile'}
              </Link>
              <button
                onClick={() => logout()}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-600"
              >
                <ArrowRightOnRectangleIcon className="mr-1 inline-block h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={cn(
                  "text-sm font-semibold leading-6 text-gray-900 hover:text-primary",
                  pathname === "/auth/login" && "text-primary"
                )}
              >
                Log in
              </Link>
              <Link 
                href="/auth/register"
                className="rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-bold text-primary">Reaction Sync</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/"
                  className={cn(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                    pathname === "/" && "bg-gray-50 text-primary"
                  )}
                >
                  Home
                </Link>
                
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className={cn(
                        "flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50",
                        (pathname.startsWith("/videos") || pathname.startsWith("/sync")) && "bg-gray-50 text-primary",
                        open && "bg-gray-50"
                      )}>
                        Videos
                        <ChevronDownIcon
                          className={cn(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {videosMenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              "block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                              pathname === item.href && "bg-gray-50 text-primary"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                
                <Link
                  href="/sync"
                  className={cn(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                    pathname.startsWith("/sync") && "bg-gray-50 text-primary"
                  )}
                >
                  Sync Sessions
                </Link>
                
                <Link
                  href="/about"
                  className={cn(
                    "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                    pathname === "/about" && "bg-gray-50 text-primary"
                  )}
                >
                  About
                </Link>
              </div>
              
              <div className="py-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                        pathname === "/profile" && "bg-gray-50 text-primary"
                      )}
                    >
                      <UserCircleIcon className="mr-2 inline-block h-5 w-5" />
                      {user?.username || 'Profile'}
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-red-600"
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 inline-block h-5 w-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                        pathname === "/auth/login" && "bg-gray-50 text-primary"
                      )}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/auth/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-primary text-white hover:bg-primary-dark"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
} 