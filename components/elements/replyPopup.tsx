import React from "react";
import { Snackbar } from "@mui/material";
import { useReplyContext } from "../context/reply_context";

export default function ReplyPopUp() {
  const { reply, setReply } = useReplyContext();

  function handleClose() {
    if (reply) {
      setReply(false);
    }
  }
  return (
    <Snackbar
      open={!!reply}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      message={reply}
      onClose={handleClose}
    />
  );
}
