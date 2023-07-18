import CSS from "./loader.module.css";
import icon from "../../assets/spotify.png";
export const Loader = ({height="100vh",width="100vw",zIndex}) => {
  return (
    <>
      <div className={CSS.background} style={{height,width,zIndex}}>
        <img src={icon} alt="icon" className={CSS.iconLoader} />
      </div>
    </>
  );
};
