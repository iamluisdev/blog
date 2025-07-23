import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function Anchor({ href, children, ...props }: AnchorProps) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a href={href} {...props}>{children}</a>;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

export { Anchor };
export type { AnchorProps };
export default Anchor;
