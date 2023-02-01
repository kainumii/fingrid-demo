import { Typography } from "@mui/material";
import Demo from "./Demo";
import Ydinvoimatuotanto from "./Ydinvoimatuotanto";
import SahkonTuotanto from "./SahkonTuotanto";
import NodeTest from "./NodeTest";

function App() {
  return (
    <div>
      <div>
        <Typography variant="h3">Fingrid-demo</Typography>
        <Demo />
        {/* <Ydinvoimatuotanto /> */}
        <SahkonTuotanto />
        <NodeTest />
      </div>
    </div>
  );
}

export default App;
