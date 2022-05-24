import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  // faCircleArrowUp,
  // faCircleArrowDown,
  // faCircleArrowLeft,
  // faCircleArrowRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import "./Monitor.css";

const Content = ({ online, data }) => (
  <React.Fragment>
    {data.L1 && (
      <div className="max up blink">
        <FontAwesomeIcon icon={faChevronUp} size="2xl" fixedWidth />
      </div>
    )}
    {data.L2 && (
      <div className="max down blink">
        <FontAwesomeIcon icon={faChevronDown} size="2xl" fixedWidth />
      </div>
    )}
    {data.L4 && (
      <div className="max left blink">
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" fixedWidth />
      </div>
    )}
    {data.L5 && (
      <div className="max right blink">
        <FontAwesomeIcon icon={faChevronRight} size="2xl" fixedWidth />
      </div>
    )}

    <Header online={online} name={data.name} />
    <Main data={data} />
    <Footer data={data} />
  </React.Fragment>
);

const Loading = () => (
  <div className="monitor-loading">
    <FontAwesomeIcon icon={faSpinner} className="fa-spin" size="1x" />
  </div>
);

const Monitor = ({ online, monitor }) => (
  <div className="main text-center">
    {monitor !== undefined ? (
      <Content online={online} data={monitor} />
    ) : (
      <Loading />
    )}
  </div>
);

export default Monitor;
