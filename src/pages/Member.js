import React, { useState } from "react";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import "../styles/pages/member.css";

const Partner = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div id="member-content">
      <div className="main-container">
        <p>Dados</p>
        <div className="fields">
          <div>
            <div>
              <span>
                Nome{" "}
                {name.trim().indexOf(" ") > 0 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Minímo 2 nomes</span>
            </div>
            <input
              placeholder="Nome do estabelecimento"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div>
              <span>
                Descrição
                {about.length > 0 && about.length <= 200 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>
                Máximo 200 caracteres {about.length <= 0 ? "" : " | " + about.length}
              </span>
            </div>
            <textarea
              placeholder="Fale sobre o estabelecimento"
              onChange={(e) => setAbout(e.target.value)}
              maxLength={200}
              value={about}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
