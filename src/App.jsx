import * as React from "react";
import useFetch from "react-fetch-hook";
import * as sanitizeHtml from "sanitize-html";
import { CssVarsProvider } from "@mui/joy/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export default function ModalAlert() {
  const [open, setOpen] = React.useState(true);
  const { isLoading, data } = useFetch(
    `https://prod-225.westeurope.logic.azure.com/workflows/14d28202dcc447fd9865c11b49daadd8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RaKBqCtzz-LGPL4Rkok-zwxY3RPuM7z1jOD_I5Sr0vU`,
  );
  console.log(data);
  if (!isLoading && data && data[0]?.active) {
    return (
      <>
        <CssVarsProvider defaultMode="dark">
          <Modal
            aria-labelledby={data[0]?.title}
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <AspectRatio objectFit="object-fit">
                <img
                  src={
                    "data:" +
                    data[0]?.image.$content +
                    ";base64," +
                    data[0]?.image.$content
                  }
                />
              </AspectRatio>
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                {data[0]?.title}
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(data[0]?.content),
                }}
              ></div>
            </Sheet>
          </Modal>
        </CssVarsProvider>
      </>
    );
  }
}
