// import { Avatar, Button, Chip, Paper, Stack, Typography } from "@mui/material";
// import { assets } from "../../assets/assets_frontend/assets";
// import { useTranslate } from "../../locales";
// import type { PatientData } from "../../apis/use-case/types";
// import { usePatientLogout } from "../../apis/use-case/patient/auth";

// const LeftSide = ({ user }: { user: PatientData }) => {
//   const { mutate: logout } = usePatientLogout();
//   const { t } = useTranslate("profile");

//   return (
//     <Paper
//       sx={{
//         p: 3,
//         height: "fit-content",
//         position: { md: "sticky" },
//         top: { md: 100 },
//         flex: { md: 1 },
//         maxWidth: { md: 300 },
//       }}
//     >
//       <Stack spacing={3} alignItems="center">
//         <Avatar
//           src={assets.Avatar}
//           alt={user?.name || "User Photo"}
//           sx={{
//             width: 200,
//             height: 200,
//             border: "3px solid",
//             borderColor: "primary.main",
//           }}
//         />
//         <Typography variant="h5" textAlign="center">
//           {user?.name}
//         </Typography>
//         <Chip
//           label={t("profile.patient")}
//           sx={{
//             color: (theme) => theme.palette.primary.dark,
//             fontWeight: "bold",
//             backgroundColor: (theme) => theme.palette.primary.lighter,
//             px: 2,
//             borderRadius: 0.5,
//             border: "none",
//           }}
//           variant="outlined"
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{
//             mt: 2,
//             backgroundColor: (theme) => theme.palette.error.dark,
//             color: (theme) => theme.palette.common.white,
//             borderRadius: 0.5,
//             py: 1,
//             "&:hover": {
//               backgroundColor: (theme) => theme.palette.error.darker,
//             },
//           }}
//           onClick={() => logout(undefined)}
//         >
//           {t("profile.logout")}
//         </Button>
//       </Stack>
//     </Paper>
//   );
// };

// export default LeftSide;
