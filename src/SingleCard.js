import React from "react";
import { Card, Typography, CardContent } from "@mui/material";
const SingleCard = (props) => {
  console.log(props.name);
  console.log(props.data);
  return (
    <Card>
      <CardContent
        sx={{
          backgroundColor: props.color,
          borderColor: "black",
          borderRadius: "8px",
          borderStyle: "solid",
          borderWidth: 1,
        }}
      >
        <Typography variant="h6">{props.name}</Typography>
        <Typography variant="h5">
          {/* {props.data[props.data.length - 1]?.value} MW */}
          {parseInt(props.data[props.data.length - 1]?.value, 10)} MW
        </Typography>
        <Typography variant="body2">{props.description}</Typography>
        <Typography variant="body2">
          {props.data[props.data.length - 1]?.start_time.toLocaleString("fi")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleCard;
