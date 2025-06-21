import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Paper,
  Badge,
  // Drawer,
  // ListItemButton,
  // ListItemIcon,
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Mood as MoodIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  //   People as PeopleIcon,
  //   Chat as ChatIcon,
} from "@mui/icons-material";

const ChatUI = () => {
  // Mock patients data
  const patients = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/static/images/avatar/1.jpg",
      lastMessage: "Hello there!",
      time: "10:30 AM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "/static/images/avatar/2.jpg",
      lastMessage: "Can we reschedule?",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Robert Johnson",
      avatar: "/static/images/avatar/3.jpg",
      lastMessage: "Thanks for the help!",
      time: "Monday",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "/static/images/avatar/4.jpg",
      lastMessage: "I have a question",
      time: "Last week",
      unread: 0,
      online: false,
    },
  ];

  // Mock messages data for each patient
  const patientMessages: { [key: number]: Message[] } = {
    1: [
      { id: 1, text: "Hello there!", sender: "other", time: "10:30 AM" },
      { id: 2, text: "Hi! How are you?", sender: "me", time: "10:32 AM" },
      {
        id: 3,
        text: "I'm good, thanks for asking. How about you?",
        sender: "other",
        time: "10:33 AM",
      },
      {
        id: 4,
        text: "Doing well! Just working on some React projects.",
        sender: "me",
        time: "10:35 AM",
      },
      {
        id: 5,
        text: "That sounds interesting! What kind of projects?",
        sender: "other",
        time: "10:36 AM",
      },
    ],
    2: [
      {
        id: 1,
        text: "Hi Doctor, can we reschedule?",
        sender: "other",
        time: "9:15 AM",
      },
      {
        id: 2,
        text: "Sure, what time works for you?",
        sender: "me",
        time: "9:20 AM",
      },
    ],
    3: [
      {
        id: 1,
        text: "Thanks for the help with my treatment!",
        sender: "other",
        time: "2:45 PM",
      },
      {
        id: 2,
        text: "You're welcome! How are you feeling now?",
        sender: "me",
        time: "2:50 PM",
      },
    ],
    4: [
      {
        id: 1,
        text: "I have a question about my prescription",
        sender: "other",
        time: "11:10 AM",
      },
      {
        id: 2,
        text: "Of course, what would you like to know?",
        sender: "me",
        time: "11:15 AM",
      },
    ],
  };

  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [messages, setMessages] = useState(patientMessages[1]);

  interface Patient {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
  }

  interface Message {
    id: number;
    text: string;
    sender: "me" | "other";
    time: string;
  }

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setMessages(patientMessages[patient.id]);
  };

  console.log("handlePatientSelect", handlePatientSelect);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      {/* <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Patients
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List sx={{ overflowY: "auto" }}>
          {patients.map((patient) => (
            <ListItemButton
              key={patient.id}
              selected={selectedPatient.id === patient.id}
              onClick={() => handlePatientSelect(patient)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#e3f2fd",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              <ListItemIcon>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  color="success"
                  invisible={!patient.online}
                >
                  <Avatar alt={patient.name} src={patient.avatar} />
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary={patient.name}
                secondary={patient.lastMessage}
                secondaryTypographyProps={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Typography variant="caption" color="textSecondary">
                  {patient.time}
                </Typography>
                {patient.unread > 0 && (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      mt: 0.5,
                    }}
                  >
                    {patient.unread}
                  </Box>
                )}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Drawer> */}

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ display: { sm: "none" } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color="success"
              sx={{ mr: 2 }}
              invisible={!selectedPatient.online}
            >
              <Avatar alt={selectedPatient.name} src={selectedPatient.avatar} />
            </Badge>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{selectedPatient.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {selectedPatient.online ? "Online" : "Offline"}
              </Typography>
            </Box>
            <IconButton edge="end" color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" aria-label="more">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Chat messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <List sx={{ width: "100%" }}>
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem
                  sx={{
                    justifyContent:
                      message.sender === "me" ? "flex-end" : "flex-start",
                    px: 1,
                  }}
                >
                  {message.sender === "other" && (
                    <ListItemAvatar>
                      <Avatar
                        alt={selectedPatient.name}
                        src={selectedPatient.avatar}
                      />
                    </ListItemAvatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      maxWidth: "70%",
                      backgroundColor:
                        message.sender === "me" ? "#e3f2fd" : "#ffffff",
                      borderRadius:
                        message.sender === "me"
                          ? "18px 18px 0 18px"
                          : "18px 18px 18px 0",
                    }}
                  >
                    <ListItemText
                      primary={message.text}
                      secondary={message.time}
                      secondaryTypographyProps={{
                        color: "textSecondary",
                        variant: "caption",
                        sx: {
                          textAlign: message.sender === "me" ? "right" : "left",
                        },
                      }}
                      sx={{
                        m: 0,
                        "& .MuiListItemText-primary": {
                          wordWrap: "break-word",
                        },
                      }}
                    />
                  </Paper>
                </ListItem>
                <Divider variant="inset" component="li" sx={{ my: 0.5 }} />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Message input */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#ffffff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="primary" aria-label="add attachment">
              <AttachFileIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add emoji">
              <MoodIcon />
            </IconButton>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message"
              size="small"
              sx={{ mx: 1 }}
            />
            <Button variant="contained" color="primary" endIcon={<SendIcon />}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatUI;
