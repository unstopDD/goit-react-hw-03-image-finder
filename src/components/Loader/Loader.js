import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import s from "./Loader.module.css";

function Spinner() {
  return (
    <div className={s.Loader}>
      <Loader type="Bars" color="#00BFFF" height={80} width={80} />
    </div>
  );
}

export default Spinner;
