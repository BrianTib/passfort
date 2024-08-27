import React from "react";

import LogoSVG from "/public/rook.svg";

export default function Navbar() {
    return (
        <div className="flex flex-col p-4 gap-2">
            <div className="flex items-center gap-2">
                <LogoSVG className="w-12 h-12" />
                <h1 className="text-2xl font-bold">PassFort</h1>
            </div>
            <ul className="text-lg">
                <li>Home</li>
                <li>Services</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
    );
}
