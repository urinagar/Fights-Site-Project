import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <div>
                <h1>obserVacation</h1>
                <h2 className="Quote">A journey of a thousand miles begins with a single step <span>– Lao Tzu</span></h2>
            </div>
        </div>
    );
}

export default Header;
