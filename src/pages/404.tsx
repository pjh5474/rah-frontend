import { Link } from "react-router-dom";
import { SetHelmet } from "../components/helmet";

export const NotFound = () => (
  <div className=" h-screen flex flex-col items-center justify-center">
    <SetHelmet helmetTitle="404 Not Found" />
    <h2 className=" font-semibold text-2xl mb-3">Page Not Found</h2>
    <h4 className=" font-medium text-base mb-5">
      The page you're looking for does not exist or has moved.
    </h4>
    <Link to="/" className="link">
      Go Back Home &rarr;
    </Link>
  </div>
);
