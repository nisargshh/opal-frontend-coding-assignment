// imports
import express from "express";
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import lodash from "lodash";
import { fileURLToPath } from "url";
import cors from "cors";

// Express setup
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Read data from
await db.read();

// Set default data
db.data = db.data || { schedules: [] }; // Node < v15.x
db.chain = lodash.chain(db.data);

// Get Request
app.get("/schedules", (req, res) => {
  res.send(db.chain.get("schedules"));
});

// Post Request
app.post("/schedules", async (req, res) => {
  let last_id = 1;
  if (db.chain.get("schedules").value().length > 0) {
    last_id = db.chain.get("schedules").last().value().id;
  }
  let data = req.body;
  db.data.schedules.push({ id: ++last_id, ...req.body });
  db.write();
  res.json(req.body);
});

// Express Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
