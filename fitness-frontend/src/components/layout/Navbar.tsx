import Link from 'next/link';

export function Navbar() {
  return (
    <div className="navbar px-4 md:px-8 bg-base-100/80 backdrop-blur border-b border-base-300 sticky top-0 z-20">
      <div className="flex-1">
        <Link href="/" className="text-xl font-black tracking-tight text-primary">
          FitTrack Pro
        </Link>
      </div>
      <div className="hidden md:flex gap-2 mr-4">
        <Link className="btn btn-ghost btn-sm" href="/auth/login">
          Login
        </Link>
        <Link className="btn btn-ghost btn-sm" href="/auth/register">
          Register
        </Link>
        <Link className="btn btn-primary btn-sm" href="/dashboard">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
