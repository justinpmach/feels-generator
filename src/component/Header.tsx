import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";
import { LinkPrimary } from "./LinkPrimary";

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="container mx-auto flex justify-between px-4 dark:bg-gray-800 2xl:px-0">
      <LinkPrimary href="/">LOGO</LinkPrimary>
      <ul>
        <li>
          <Link href="/generate">Generate</Link>
        </li>
      </ul>
      <ul>
        {isLoggedIn && (
          <li>
            <Button
              variant="secondary"
              onClick={() => {
                signOut().catch(console.error);
              }}
            >
              Logout
            </Button>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            {" "}
            <Button
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Login
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
}
