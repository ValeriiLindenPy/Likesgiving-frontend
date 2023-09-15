import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const NavLink = ({ children, href }) => {
    const child = React.Children.only(children);
    const pathname = usePathname();

    return (
        <Link href={href}>
            {React.cloneElement(child, {
                "aria-current": pathname === href ? "page" : null
            })}
        </Link>
    );
};

export default NavLink;