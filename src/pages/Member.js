import React, { useState } from "react";
import MaskedInput from "react-maskedinput";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import { useHistory } from "react-router-dom";

import { cpf, cnpj } from "cpf-cnpj-validator";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import Swal from "sweetalert2";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

import "../styles/pages/member.css";

const Partner = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [cel, setCel] = useState("");
  const [tel, setTel] = useState("");
  const [nameProp, setNameProp] = useState("");
  const [celProp, setCelProp] = useState("");
  const [emailPropVal, setEmailPropVal] = useState("");
  const [emailProp, setEmailProp] = useState(false);

  const [ccLocal, setCcLocal] = useState(false);
  const [ccLocalVal, setCcLocalVal] = useState("");

  const [cpfPropVal, setCpfPropVal] = useState("");
  const [cpfProp, setCpfProp] = useState(false);

  const msgSwal = (title, text, icon, showConfirm, timer) => {
    Swal.fire({
      title: title,
      html: text,
      icon: icon,
      showConfirmButton: showConfirm,
      timer: timer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let inputs = Array.from(document.querySelectorAll("input, textarea"));

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].classList.contains("error")) {
        inputs[i].focus();
        msgSwal("Aviso", `${inputs[i].name} inválido(a)`, "error", false, 3000);
        return;
      }
    }

    let checks = [
      checkName(),
      checkDesc(),
      checkType(),
      checkCelLocal(),
      checkTel(),
      checkCCLocal(),
      checkNameProp(),
      checkCelProp(),
      checkCProp(),
      checkEmail(),
    ];

    for (let i = 0; i < checks.length; i++) {
      if (!checks[i]) {
        msgSwal("Aviso", `Ainda há campos inválidos`, "error", false, 3000);
        return;
      }
    }

    Swal.fire({
      title: "Confirmação",
      html: `Dados enviados para a análise, você receberá mais informações no email: <strong>${emailPropVal}</strong>`,
      icon: "success",
      confirmButtonColor: "#332e3c",
    }).then(() => {
      history.push("/");
    });
  };

  const checkName = () => {
    return name.trim().indexOf(" ") > 0;
  };
  const checkDesc = () => {
    return about.length > 0 && about.length <= 200;
  };
  const checkType = () => {
    return type.length > 0;
  };
  const checkCelLocal = () => {
    return cel.length > 10;
  };
  const checkTel = () => {
    return tel.length > 7 || tel.length === 0;
  };
  const checkCCLocal = () => {
    return (ccLocalVal.length === 11 || ccLocalVal.length === 14) && ccLocal;
  };
  const checkNameProp = () => {
    return nameProp.trim().indexOf(" ") > 0;
  };
  const checkCelProp = () => {
    return celProp.length > 10;
  };
  const checkCProp = () => {
    return cpfPropVal.length > 10;
  };
  const checkEmail = () => {
    return emailProp;
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
                {checkName() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Minímo 2 nomes</span>
            </div>
            <input
              required
              type="text"
              value={name}
              name="Nome do local"
              placeholder="Nome do local"
              onChange={(e) => setName(e.target.value)}
              className={`${checkName() ? "" : "error"}`}
            />
          </div>
          {/* DESCRIÇÃO DO LOCAL */}
          <div>
            <div>
              <span>
                *Descrição
                {checkDesc() ? (
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
              type="text"
              value={about}
              maxLength={200}
              name="Descrição do local"
              placeholder="Fale sobre o local, ambiente, etc"
              onChange={(e) => setAbout(e.target.value)}
              className={`${checkDesc() ? "" : "error"}`}
            ></textarea>
          </div>
          {/* PRINCIPAL VENDA */}
          <div>
            <div>
              <span>
                *Principal venda
                {checkType() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Ex: Pizzas</span>
            </div>
            <input
              required
              type="text"
              value={type}
              name="Principal comida do local"
              placeholder="Principal tipo de venda"
              onChange={(e) => setType(e.target.value)}
              className={`${checkType() ? "" : "error"}`}
            />
          </div>
          {/* CELULAR DO LOCAL */}
          <div>
            <div>
              <span>
                *Celular
                {checkCelLocal() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Preferência WhatsApp</span>
            </div>
            <MaskedInput
              required
              type="tel"
              value={cel}
              placeholderChar=" "
              name="Celular do local"
              mask="(11) 1 1111-1111"
              placeholder="Celular do local"
              className={`${checkCelLocal() ? "" : "error"}`}
              onChange={(e) => setCel(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          {/* TELEFONE DO LOCAL */}
          <div>
            <div>
              <span>
                Telefone
                {tel.length >= 1 && tel.length <= 7 && (
                  <CloseIcon className="incorrect" />
                )}
                {checkTel() && <CheckIcon className="correct" />}
              </span>
              <span>Fixo</span>
            </div>
            <MaskedInput
              type="tel"
              value={tel}
              mask="1111-1111"
              placeholderChar=" "
              name="Telefone do local"
              placeholder="Telefone do local"
              className={`${checkTel() ? "" : "error"}`}
              onChange={(e) => setTel(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          {/* CPF OU CNPJ DO LOCAL */}
          <div>
            <div>
              <span>
                *CPF ou CNPJ
                {checkCCLocal() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <CpfCnpj
              required
              type="text"
              value={ccLocalVal}
              name="CPF ou CNPJ do local"
              placeholder="CPF ou CNPJ do local"
              className={`${checkCCLocal() ? "" : "error"}`}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, "");
                setCcLocalVal(val);
                setCcLocal(
                  val.length === 11
                    ? cpf.isValid(val)
                    : val.length === 14
                    ? cnpj.isValid(val)
                    : false
                );
              }}
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
                {checkNameProp() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Minímo 2 nomes</span>
            </div>
            <input
              required
              type="text"
              value={nameProp}
              name="Nome do proprietário"
              placeholder="Nome do proprietário"
              onChange={(e) => setNameProp(e.target.value)}
              className={`${checkNameProp() ? "" : "error"}`}
            />
          </div>
          {/* CELULAR DO PROPRIETÁRIO */}
          <div>
            <div>
              <span>
                *Celular
                {checkCelProp() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
              <span>Preferência WhatsApp</span>
            </div>
            <MaskedInput
              required
              type="tel"
              value={celProp}
              placeholderChar=" "
              mask="(11) 1 1111-1111"
              name="Celular do proprietário"
              placeholder="Celular do local"
              className={`${checkCelProp() ? "" : "error"}`}
              onChange={(e) => setCelProp(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>
          {/* CPF DO PROPRIETÁRIO */}
          <div>
            <div>
              <span>
                *CPF
                {checkCProp() && cpfProp ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <MaskedInput
              required
              type="text"
              value={cpfPropVal}
              placeholderChar=" "
              mask="111.111.111-11"
              name="CPF do proprietário"
              placeholder="CPF do proprietário"
              className={`${checkCProp() && cpfProp ? "" : "error"}`}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, "");
                setCpfProp(cpf.isValid(val));
                setCpfPropVal(val);
              }}
            />
          </div>
          {/* EMAIL DO PROPRIETÁRIO */}
          <div>
            <div>
              <span>
                *Email
                {checkEmail() ? (
                  <CheckIcon className="correct" />
                ) : (
                  <CloseIcon className="incorrect" />
                )}
              </span>
            </div>
            <input
              required
              type="email"
              value={emailPropVal}
              name="Email do proprietário"
              placeholder="Email pessoal"
              className={`${checkEmail() ? "" : "error"}`}
              onChange={(e) => {
                let email = e.target.value;
                setEmailPropVal(email);
                setEmailProp(EmailValidator.validate(email));
              }}
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
