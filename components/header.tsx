export default function Header() {
    return <div className="flex flex-row space-x-3 px-3">
        <a>
            {/* place to display the main search bar */}
            Home
        </a>
        <a>
            {/* display the places you have recently been to */}
            Recent Places
        </a>
        <a>
            {/* log into an account */}
            Log In
        </a>

    </div>
}
