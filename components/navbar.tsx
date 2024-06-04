"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { SessionProvider, useSession } from "next-auth/react";
import SignInButton from "./SignInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const Navbar = () => {
  // const session = await getServerSession(authOptions);
  const { data: session } = useSession();

  const navItems = session
    ? session.user.idTipa.idTipa == 1
      ? siteConfig.candidatItems
      : session.user.idTipa.idTipa == 3
        ? siteConfig.workerItems
        : siteConfig.adminItems
    : siteConfig.homeItem;

  let currentUser = session?.user;

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {/* Always render the home link */}
          <NavbarItem key="home">
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              href="/"
            >
              Home
            </NextLink>
          </NavbarItem>
          {/* Render other navigation items based on session */}
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={
                  currentUser?.idKorisnika && item.href == "/user/" ?
                    item.href + currentUser.idKorisnika
                    : item.href
                }
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <SignInButton />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
