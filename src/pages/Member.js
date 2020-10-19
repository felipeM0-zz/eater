import React, { useState } from "react";
import MaskedInput from "react-maskedinput";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";

import { cpf, cnpj } from "cpf-cnpj-validator";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import Swal from "sweetalert2";

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
  const [emailPropVal, setEmailPropVal] = useState("");
  const [emailProp, setEmailProp] = useState(false);

  const [cpfCnpjLocal, setCpfCnpjLocal] = useState(false);
  const [cpfCnpjLocalVal, setCpfCnpjLocalVal] = useState("");

  const [cpfPropVal, setCpfPropVal] = useState("");
  const [cpfProp, setCpfProp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputs = Array.from(document.querySelectorAll("input, textarea"));
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("error")) {
        inputs[i].focus();
        Swal.fire({
          title: "Aviso",
          text: `${inputs[i].name} inválido(a)`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
    }
  };

  return (
    <div id="member-content">
      <form onSubmit={handleSubmit} className="main-container">
        <p>Dados</p>
        <div className="fields">
          {/* NOME DO LOCAL */}
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
              name="Nome do local"
              className={`${name.trim().indexOf(" ") <= 0 ? "error" : ""}`}
              // required
              placeholder="Nome do local"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* DESCRIÇÃO DO LOCAL */}
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
              name="Descrição do local"
              className={`${about.length > 0 && about.length <= 200 ? "" : "error"}`}
              // required
              placeholder="Fale sobre o local"
              onChange={(e) => setAbout(e.target.value)}
              maxLength={200}
              value={about}
            ></textarea>
          </div>
          {/* PRIINCIPAL VENDA */}
          <div>
            <div>
              <span>
                *Principal venda
                {type.length > 0 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Ex: Pizzas</span>
            </div>
            <input
              name="Principal comida do local"
              className={`${type.length > 0 ? "" : "error"}`}
              // required
              placeholder="Principal tipo de venda"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          {/* CELULAR DO LOCAL */}
          <div>
            <div>
              <span>
                *Celular
                {cel.length > 10 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Preferência WhatsApp</span>
            </div>
            <MaskedInput
              name="Celular do local"
              className={`${cel.length <= 10 ? "error" : ""}`}
              // required
              type="cel"
              placeholderChar=" "
              value={cel}
              onChange={(e) => setCel(e.target.value.replace(/[^0-9]/g, ""))}
              mask="(11) 1 1111-1111"
              placeholder="Celular do local"
            />
          </div>
          {/* TELEFONE DO LOCAL */}
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
              name="Telefone do local"
              className={`${tel.length >= 1 && tel.length <= 7 ? "error" : ""}`}
              type="tel"
              placeholderChar=" "
              value={tel}
              onChange={(e) => setTel(e.target.value.replace(/[^0-9]/g, ""))}
              mask="1111-1111"
              placeholder="Telefone do local"
            />
          </div>
          {/* CPF OU CNPJ DO LOCAL */}
          <div>
            <div>
              <span>
                *CPF ou CNPJ
                {(cpfCnpjLocalVal.length === 11 || cpfCnpjLocalVal.length === 14) &&
                cpfCnpjLocal ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <CpfCnpj
              name="CPF ou CNPJ do local"
              value={cpfCnpjLocalVal}
              placeholder="CPF ou CNPJ do local"
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, "");
                setCpfCnpjLocal(
                  val.length === 11
                    ? cpf.isValid(val)
                    : val.length === 14
                    ? cnpj.isValid(val)
                    : false
                );
                setCpfCnpjLocalVal(val);
              }}
              className={`${
                (cpfCnpjLocalVal.length === 11 || cpfCnpjLocalVal.length === 14) &&
                cpfCnpjLocal
                  ? ""
                  : "error"
              }`}
            />
          </div>
        </div>
        <p>Proprietário</p>
        <div className="fields">
          {/* NOME DO PROPRIETÁRIO */}
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
              name="Nome do proprietário"
              className={`${nameProp.trim().indexOf(" ") <= 0 ? "error" : ""}`}
              // required
              placeholder="Nome do proprietário"
              type="text"
              value={nameProp}
              onChange={(e) => setNameProp(e.target.value)}
            />
          </div>
          {/* CELULAR DO PROPRIETÁRIO */}
          <div>
            <div>
              <span>
                *Celular
                {celProp.length > 10 ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Preferência WhatsApp</span>
            </div>
            <MaskedInput
              name="Celular do proprietário"
              className={`${celProp.length > 10 ? "" : "error"}`}
              // required
              placeholderChar=" "
              value={celProp}
              onChange={(e) => setCelProp(e.target.value.replace(/[^0-9]/g, ""))}
              mask="(11) 1 1111-1111"
              placeholder="Celular do local"
            />
          </div>
          {/* CPF DO PROPRIETÁRIO */}
          <div>
            <div>
              <span>
                *CPF
                {cpfPropVal.length > 10 && cpfProp ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <MaskedInput
              name="CPF do proprietário"
              className={`${cpfPropVal.length > 10 && cpfProp ? "" : "error"}`}
              // required
              placeholderChar=" "
              value={cpfPropVal}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, "");
                setCpfProp(cpf.isValid(val));
                setCpfPropVal(val);
              }}
              mask="111.111.111-11"
              placeholder="CPF do proprietário"
            />
          </div>
          {/* EMAIL DO PROPRIETÁRIO */}
          <div>
            <div>
              <span>
                *Email
                {emailProp ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <input
              name="Email do proprietário"
              className={`${emailProp ? "" : "error"}`}
              type="email"
              value={emailPropVal}
              onChange={(e) => {
                let email = e.target.value;
                setEmailPropVal(email);
                setEmailProp(EmailValidator.validate(email));
              }}
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
