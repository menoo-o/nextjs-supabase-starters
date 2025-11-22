import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
    {/* GO TO LOGIN */}
      <Link
        href="/account/login"
        className="rounded-full bg-blue-600 px-6 py-6 text-white hover:bg-blue-700"
      >
        <h1 className="text-xl ">Go to Login</h1>
      </Link>

    </div>
  );
}
