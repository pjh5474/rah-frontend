import { useMe } from "../hooks/useMe";
import { Logo } from "./logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Header = () => {
  const { data } = useMe();
  return (
    <header className=" py-4 ">
      <div className="w-full px-5 md:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <Logo width="w-24" margin=" " />
        <span className=" text-lg">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className=" text-2xl" />
            {data?.me.email}
          </Link>
        </span>
      </div>
    </header>
  );
};
