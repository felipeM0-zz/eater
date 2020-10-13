import React from "react";
import { Map, TileLayer } from "react-leaflet";

import logoImg from "../images/icon-eater-white.svg";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

import BusinessIcon from "@material-ui/icons/Business";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import "leaflet/dist/leaflet.css";
import "../styles/pages/main.css";
import { Button, Tooltip } from "@material-ui/core";

const Main = () => {
  return (
    <div id="main-content">
      <div className="box-superior">
        <aside>
          <div className="side-left">
            <header>
              <img src={logoImg} width={200} alt="Eater" />
            </header>

            <div className="middle-box">
              <h2>Nome do estabelecimento</h2>
              <p>Descriçao breve do estabelecimento</p>
            </div>

            <footer>
              <a href="https://youtube.com">
                <YouTubeIcon />
                <span>Youtube</span>
              </a>
              <a href="https://instagram.com">
                <InstagramIcon />
                <span>Instagram</span>
              </a>
              <a href="https://facebook.com">
                <FacebookIcon />
                <span>Facebook</span>
              </a>
            </footer>
          </div>
          <Map
            dragging={false}
            zoomControl={false}
            center={[-2.5214101, -44.2107223]}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </Map>
        </aside>

        <footer>
          <Tooltip placement="top" title="Sobre esta empresa">
            <Button startIcon={<BusinessIcon />}>
              <p>Sobre</p>
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Entrar em contato">
            <Button startIcon={<PermContactCalendarIcon />}>
              <p>Contato</p>
            </Button>
          </Tooltip>
          <Tooltip placement="top" title="Ver cardápio disponível">
            <Button startIcon={<MenuBookIcon />}>
              <p>Cardápio</p>
            </Button>
          </Tooltip>
        </footer>
      </div>
    </div>
  );
};

export default Main;
