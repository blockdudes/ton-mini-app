import { useNavigate, useParams } from "react-router-dom";

const ResturantCard = ({ name, image }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-32 h-32  shadow-xl border-4  rounded-md cursor-pointer"
      onClick={() => navigate(`/menu/${name}`)}
    >
      <div className="w-full h-[75%]">
        <img
          src={image}
          alt="rest-img"
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <div className="bg-secondary h-[25%] flex justify-center items-center rounded-b-md">
        <h1 className="text-sm text-tertiary  truncate">{name}</h1>
      </div>
    </div>
  );
};

export default ResturantCard;
