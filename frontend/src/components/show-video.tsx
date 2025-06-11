import { Box } from "@mui/material";

const ShowVideo = ({ video }: { video: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        src={video}
        autoPlay
        playsInline
        loop
        controls={false}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
      />
    </Box>
  );
};

export default ShowVideo;
