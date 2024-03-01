import express, {Request, Response, urlencoded} from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({message: "hello from the express endpoint!"});
});

app.listen(7000, () => {
  console.log("Server running on local host :7000");
});
