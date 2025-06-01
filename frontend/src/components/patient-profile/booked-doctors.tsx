import { Divider, List, Paper, Typography } from "@mui/material";
import { useTranslate } from "../../locales";
import type { PatientData } from "../../apis/use-case/types";

const BookedDoctors = ({ user }: { user: PatientData }) => {
  const { t } = useTranslate("profile");

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("profile.booked_doctors")}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {user?.bookedDoctors?.length ? (
        <List>
          {user.bookedDoctors.map(() => (
            <>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                py={4}
              >
                Welcome
              </Typography>
            </>
            // <ListItem key={doctor._id} sx={{ py: 2 }}>
            //   <ListItemAvatar>
            //     <Avatar src={doctor.image} />
            //   </ListItemAvatar>
            //   <ListItemText
            //     primary={doctor.name}
            //     secondary={
            //       <>
            //         <Typography component="span" display="block">
            //           {doctor.specialty}
            //         </Typography>
            //         <Typography
            //           component="span"
            //           variant="body2"
            //           color="text.secondary"
            //         >
            //           {doctor.address?.line1}, {doctor.address?.line2}
            //         </Typography>
            //       </>
            //     }
            //   />
            // </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          py={4}
        >
          {t("profile.no_booked_doctors")}
        </Typography>
      )}
    </Paper>
  );
};

export default BookedDoctors;
