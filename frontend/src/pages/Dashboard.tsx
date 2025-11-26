import { Link } from "react-router-dom";

const DashboardPage = () => {

    return (
        <div className="dashboard-root">
            <div className="dashboard-card card">
                <div className="dashboard-badge">Community • Discussions • Broadcasts</div>
                <h1 className="dashboard-title">Welcome to ITS Now</h1>
                <p className="dashboard-subtitle">
                    A centralized digital space for university students to connect, explore, and stay
                    informed. Whether you&apos;re looking for academic support, campus events, or casual
                    conversations, everything starts here!
                </p>

                <>
                    <p className="dashboard-body">
                        Share insights, ask questions, post announcements, find lost items, discover
                        opportunities, or just hang out. Join the conversation in a space built for the ITS community.
                    </p>
                    <div className="dashboard-actions">
                        <Link to="/login" className="btn btn-outline-primary">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-primary">
                            Register
                        </Link>
                    </div>
                </>
            </div>
        </div>
    );
};

export default DashboardPage;
