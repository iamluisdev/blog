import Link from "next/link";

function Header() {
  return (
    <header className="mt-16 mb-8">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/favicon.ico"
            alt="Author avatar image"
            className="w-10 h-10 rounded-full"
          />
          <svg
            height="32"
            width="32"
            viewBox="0 0 32 32"
            className="text-neutral-400"
          >
            <path d="M22 5L9 28" stroke="#374151"></path>
          </svg>
          <h1 className="text-3xl font-semibold">Dev</h1>
        </Link>
      </div>
    </header>
  );
}

export { Header };
export default Header;
