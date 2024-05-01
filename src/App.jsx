import React, { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import * as sanitizeHtml from "sanitize-html";
import { CssVarsProvider } from "@mui/joy/styles";
import AspectRatio from "@mui/joy/AspectRatio";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export default function ModalAlert() {
  const visible = localStorage.getItem("alertModal");
  const [open, setOpen] = React.useState(true);

  function setVisibility(modified) {
    localStorage.setItem("alertModal", modified);
    setOpen(false);
  }

  const { isLoading, data } = useFetch(
    `https://prod-225.westeurope.logic.azure.com/workflows/14d28202dcc447fd9865c11b49daadd8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RaKBqCtzz-LGPL4Rkok-zwxY3RPuM7z1jOD_I5Sr0vU`,
  );

  if (
    !isLoading &&
    data &&
    data[0]?.active &&
    visible != data[0]?.last_modified
  ) {
    return (
      <>
        <CssVarsProvider defaultMode="dark">
          <Modal
            aria-labelledby={data[0]?.title}
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setVisibility(data[0]?.last_modified)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ModalDialog layout="center">
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Sheet
                sx={{
                  maxWidth: 500,
                  borderRadius: "md",
                  p: 1,
                  mt: 4,
                  boxShadow: "lg",
                  overflowX: "hidden",
                  overflowY: "scroll",
                }}
              >
                <AspectRatio objectFit="cover">
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
            </ModalDialog>
          </Modal>
        </CssVarsProvider>
      </>
    );
  }
}
