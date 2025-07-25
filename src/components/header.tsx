import Link from "next/link";
import { FadeUp } from "@/components/animations";

function Header() {
  return (
    <header className="mt-24 mb-8">
      <FadeUp delay={0.3 * 2}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-extrabold">Luis Barragan</h1>
          </Link>
        </div>
      </FadeUp>
    </header>
  );
}

export { Header };
export default Header;
