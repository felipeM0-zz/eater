import React, { useEffect, useState } from "react";
import MaskedInput from "react-maskedinput";
import { Button } from "@material-ui/core";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

import "../styles/pages/member.css";

const Partner = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [cel, setCel] = useState("");
  const [tel, setTel] = useState("");
  const [nameProp, setNameProp] = useState("");
  const [celProp, setCelProp] = useState("");
  const [emailProp, setEmailProp] = useState("");

  useEffect(() => {
    console.log(cel);
  }, [cel]);

  return (
    <div id="member-content">
      <form className="main-container">
        <p>Dados</p>
        <div className="fields">
          <div>
            <div>
              <span>
                *Nome{" "}
                {name.trim().indexOf(" ") > 0 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Minímo 2 nomes</span>
            </div>
            <input
              required
              placeholder="Nome do estabelecimento"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div>
              <span>
                *Descrição
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
              required
              placeholder="Fale sobre o estabelecimento"
              onChange={(e) => setAbout(e.target.value)}
              maxLength={200}
              value={about}
            ></textarea>
          </div>
          <div>
            <div>
              <span>
                *Principal comida
                {type.length > 0 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Ex: Pizzas</span>
            </div>
            <input
              required
              placeholder="Principal tipo a venda"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div>
            <div>
              <span>
                *Celular
                {cel.length > 10 && <CheckIcon className="correct" />}
                {cel.length <= 10 && <CloseIcon className="incorrect" />}
              </span>
              <span>Preferência WhatsApp</span>
            </div>
            <MaskedInput
              required
              type="cel"
              placeholderChar=" "
              value={cel}
              onChange={(e) => setCel(e.target.value.replace(/[^0-9]/g, ""))}
              mask="(11) 1 1111-1111"
              placeholder="Celular do estabelecimento"
            />
          </div>
          <div>
            <div>
              <span>
                Telefone
                {tel.length > 7 && <CheckIcon className="correct" />}
                {tel.length >= 1 && tel.length <= 7 && (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Fixo</span>
            </div>
            <MaskedInput
              type="tel"
              placeholderChar=" "
              value={tel}
              onChange={(e) => setTel(e.target.value.replace(/[^0-9]/g, ""))}
              mask="1111-1111"
              placeholder="Telefone do estabelecimento"
            />
          </div>
        </div>
        <p>Proprietário</p>
        <div className="fields">
          <div>
            <div>
              <span>
                *Nome
                {nameProp.trim().indexOf(" ") > 0 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Minímo 2 nomes</span>
            </div>
            <input
              required
              placeholder="Nome do proprietário"
              type="text"
              value={nameProp}
              onChange={(e) => setNameProp(e.target.value)}
            />
          </div>
          <div>
            <div>
              <span>
                *Celular
                {celProp.length > 10 && <CheckIcon className="correct" />}
                {celProp.length <= 10 && <CloseIcon className="incorrect" />}
              </span>
              <span>Preferência WhatsApp</span>
            </div>
            <MaskedInput
              required
              placeholderChar=" "
              value={celProp}
              onChange={(e) => setCelProp(e.target.value.replace(/[^0-9]/g, ""))}
              mask="(11) 1 1111-1111"
              placeholder="Celular do estabelecimento"
            />
          </div>
          <div>
            <div>
              <span>
                Email
                {emailProp.length > 0 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <input
              type="email"
              placeholderChar=" "
              value={emailProp}
              onChange={(e) => setEmailProp(e.target.value)}
              placeholder="Email pessoal"
            />
          </div>
        </div>

        <Button type="submit" endIcon={<SendIcon />}>
          <p>Confirmar</p>
        </Button>
      </form>
    </div>
  );
};

export default Partner;
