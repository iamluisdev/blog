import Link from "next/link";

function Header() {
  return (
    <header className="mt-16 mb-8">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-semibold">Hugo Lin</h1>
        </Link>
      </div>
    </header>
  );
}

export { Header };
export default Header;
