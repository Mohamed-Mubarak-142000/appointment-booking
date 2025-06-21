import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Fab,
  Badge,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "مرحباً! كيف يمكنني مساعدتك اليوم؟", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [newMessages, setNewMessages] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    setNewMessages(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    if (!open) {
      setNewMessages((prev) => prev + 1);
    }

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `لقد تلقيت رسالتك: "${inputValue}". هذه استجابة تجريبية.`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);

      if (!open) {
        setNewMessages((prev) => prev + 1);
      }
    }, 1000);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          bgcolor: "#6200ee",
          "&:hover": {
            bgcolor: "#7c4dff",
          },
        }}
      >
        <Badge badgeContent={newMessages} color="error">
          <ChatIcon />
        </Badge>
      </Fab>

      {/* Chat dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 16,
            right: 16,
            m: 0,
            height: "70vh",
            maxHeight: "600px",
            width: "400px",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#6200ee",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <SmartToyIcon sx={{ mr: 1 }} />
            مساعد الدردشة
          </Box>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Chat messages area */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "#f5f5f5",
            }}
          >
            <List sx={{ width: "100%" }}>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <ListItem
                    sx={{
                      justifyContent:
                        message.sender === "user" ? "flex-end" : "flex-start",
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    {message.sender === "bot" && (
                      <ListItemAvatar sx={{ minWidth: "40px" }}>
                        <Avatar
                          sx={{ bgcolor: "#6200ee", width: 32, height: 32 }}
                        >
                          <SmartToyIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                    )}
                    <Paper
                      sx={{
                        p: 1.5,
                        maxWidth: "80%",
                        bgcolor:
                          message.sender === "user" ? "#6200ee" : "white",
                        color:
                          message.sender === "user" ? "white" : "text.primary",
                        borderRadius:
                          message.sender === "user"
                            ? "12px 12px 0 12px"
                            : "12px 12px 12px 0",
                      }}
                    >
                      <ListItemText
                        primary={message.text}
                        primaryTypographyProps={{
                          sx: {
                            wordBreak: "break-word",
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                    </Paper>
                    {message.sender === "user" && (
                      <ListItemAvatar sx={{ minWidth: "40px", ml: 1 }}>
                        <Avatar
                          sx={{ bgcolor: "#ff5722", width: 32, height: 32 }}
                        >
                          <PersonIcon fontSize="small" />
                        </Avatar>
                      </ListItemAvatar>
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ my: 0.5 }} />
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Input area */}
          <Box
            sx={{
              p: 2,
              bgcolor: "background.paper",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="اكتب رسالتك..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={inputValue.trim() === ""}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "24px",
                  "& input": {
                    fontSize: "0.875rem",
                  },
                },
              }}
              size="small"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatbot;
