import Carousel from "react-bootstrap/Carousel";
import packageInfo from "../package.json";
import { useTranslation } from "react-i18next";

export default function Footer({ data }) {
  const { t, i18n } = useTranslation();
  switch (data.L3) {
    case 1: // DRIVE IN
      return (
        <footer className="monitor-footer">
          <Carousel
            controls={false}
            indicators={false}
            interval={3000}
            className="carousel-font-size font-bold"
          >
            <Carousel.Item>{t("drive-in-mesg-1")}</Carousel.Item>
          </Carousel>
        </footer>
      );
    case 2: // DRIVE BACK
      return (
        <footer className="monitor-footer">
          <Carousel
            controls={false}
            indicators={false}
            interval={3000}
            className="carousel-font-size font-bold"
          >
            <Carousel.Item>{t("drive-back-mesg-1")}</Carousel.Item>
          </Carousel>
        </footer>
      );
    case 3: // STOP
      return (
        <footer className="monitor-footer">
          <Carousel
            controls={false}
            indicators={false}
            interval={3000}
            className="carousel-font-size font-bold"
          >
            <Carousel.Item>{t("stop-mesg-1")}</Carousel.Item>
            <Carousel.Item>{t("stop-mesg-2")}</Carousel.Item>
            <Carousel.Item>{t("stop-mesg-3")}</Carousel.Item>
          </Carousel>
        </footer>
      );
    default:
      return (
        <footer className="monitor-footer">
          <span className="font-bold">D</span>igital{" "}
          <span className="font-bold">S</span>ignage{" "}
          <span className="font-bold">S</span>ystem v{packageInfo.version}
        </footer>
      );
  }
}
