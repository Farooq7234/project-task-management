"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4  md:p-6 shadow-md  text-white">
      <div className="container px-5  mx-auto flex cv md:flex-row justify-between items-center">
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.name || user.email}</span>
            <Button onClick={() => signOut()} variant="destructive">
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
