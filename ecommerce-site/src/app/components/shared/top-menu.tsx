import clsx from "clsx";

interface TopMenuProps{
    isMenuOpen: boolean;
}

export default function TopMenu({isMenuOpen}: TopMenuProps)
{
    return(
        <nav className={clsx(
            "sm:flex sm:justify-center sm:items-center mt-4 hidden",
            {
                'hidden': !isMenuOpen
            }
        )}>
                <div className="flex flex-col sm:flex-row">
                    <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Home</a>
                    <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Shop</a>
                    <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Categories</a>
                    <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">Contact</a>
                    <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="#">About</a>
                </div>
            </nav>
    )
}