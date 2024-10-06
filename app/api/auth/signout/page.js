// Example sign-out and session display (e.g., in a navbar component)
'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <h1>Sales Management System</h1>
      </div>

      <div>
        {session ? (
          <>
            <span>Welcome, {session.user.email}</span>
            <button onClick={() => signOut()} className="ml-4">
              Sign Out
            </button>
          </>
        ) : (
          <a href="/auth/signin">Sign In</a>
        )}
      </div>
    </nav>
  );
}
