import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";
import { Button } from "./Button";
import { LinkPrimary } from "./LinkPrimary";

export function Header() {
  const session = useSession();
  const { buyCredits } = useBuyCredits();
  const isLoggedIn = !!session.data;

  const credits = api.user.getCredits.useQuery();

  return (
    <header className="z-0 text-white dark:bg-gray-600">
      <div className="container mx-auto flex h-12 items-center justify-between">
        <LinkPrimary href="/">LOGO</LinkPrimary>
        <ul className="flex gap-4">
          <li>
            <Link href="/generate">Generate</Link>
          </li>
          <li>
            <LinkPrimary href="/community">Community</LinkPrimary>
          </li>
          {isLoggedIn && (
            <li>
              <LinkPrimary href="/collection">Collections</LinkPrimary>
            </li>
          )}
        </ul>
        <ul className="flex gap-4">
          {isLoggedIn && (
            <>
              <div className="flex items-center">
                Credits remaining: {credits.data}
              </div>
              <li>
                <Button
                  onClick={() => {
                    buyCredits().catch(console.error);
                  }}
                >
                  Buy Credits
                </Button>
              </li>
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
            </>
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
      </div>
    </header>
  );
}
