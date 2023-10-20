import { Link } from "react-router-dom";
import rahLogo from "../images/rahodes.svg";

interface ILogoProps {
  width?: string;
  margin?: string;
  extra?: string;
}

export const Logo: React.FC<ILogoProps> = ({ width, margin, extra }) => {
  return (
    <Link to="/">
      <img
        src={rahLogo}
        alt="rahLogo"
        className={`${width ? width : "w-52"} ${
          margin ? margin : "mb-10"
        } ${extra} `}
      />
    </Link>
  );
};
