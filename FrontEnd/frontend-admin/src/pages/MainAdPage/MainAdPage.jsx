import "./MainAdPage.css"

export default function MainAdPage(){
    return(
        <div id="mainPage">
            <aside id="sideBar">
                <h2 className="logo">Admin Panel</h2>
                <ul>
                    <li className="active">Dashboard</li>
                    <li>Users</li>
                    <li>Products</li>
                    <li>Orders</li>
                    <li>Settings</li>
                </ul>
            </aside>

            <main id="mainContent">
                <header className="header">
                    <input type="text" placeholder="Search..." className="searchBox" />
                    <div className="user">
                        <img src="/avatar.png" alt="User" className="avatar" />
                        <span>Admin</span>
                    </div>
                </header>

                <section className="content">
                    <h1>Dashboard Overview</h1>
                    <div className="stats">
                        <div className="card">Users: 240</div>
                        <div className="card">Orders: 120</div>
                        <div className="card">Revenue: $8,430</div>
                    </div>
                </section>
            </main>
        </div>
    )
}
