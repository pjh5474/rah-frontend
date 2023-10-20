import { Helmet } from "react-helmet-async";

interface ISetHelmetProps {
  helmetTitle: string;
}

export const SetHelmet: React.FC<ISetHelmetProps> = ({ helmetTitle }) => {
  return (
    <Helmet>
      <title>{`${helmetTitle} | RAH`}</title>
    </Helmet>
  );
};
