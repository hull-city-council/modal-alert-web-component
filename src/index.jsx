import r2wc from "@r2wc/react-to-web-component";
import CollectionDays from "./App";

const binCollections = r2wc(CollectionDays, { props: { uprn: "string" } });

customElements.define("upcoming-bin-collections", binCollections);
