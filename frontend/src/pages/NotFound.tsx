import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-3 fw-bold text-primary">404</h1>
            <h3 className="fw-semibold mb-4">This page wandered off the campus...</h3>
            <p className="text-muted mb-4">
                The page you're looking for doesn't exist, was moved, or maybe got lost
                like half the freshmen on the first week of class.
            </p>

            <Link to="/" className="btn btn-primary px-4 py-2">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
