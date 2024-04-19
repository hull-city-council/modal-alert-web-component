import r2wc from "@r2wc/react-to-web-component";
import ModalAlert from "./App";

const modal = r2wc(ModalAlert);

customElements.define("modal-alert", modal);
