import fs from "fs";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { generateRandomImage } from "./mixComponents.js";
import { NFTStorage, File } from "nft.storage";

const app = express();
const port = process.env.PORT || 4000;
let partTwoIPFSHash = "";

const apiKey = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: apiKey });

app.get("/first", async (req, res) => {
  await generateRandomImage();
  var characterId = req.query.characterId;
  var characterName = "Plane #" + characterId;
  console.log("Character name: " + characterName);

  var speed = parseInt(req.query.score);
  speed += parseInt(Math.random() * 51);
  console.log("Speed: " + speed);

  const imgdata = fs.readFileSync("randomCharacter.png");
  const metadata = await client.store({
    name: characterName,
    description: "A plane that is on an accelerating adventure",
    image: new File([imgdata], "randomCharacter.png", { type: "image/png" }),
    attributes: [{ trait_type: "speed", value: speed }],
  });

  var partOneIPFSHash = metadata.ipnft;
  partTwoIPFSHash = partOneIPFSHash.slice(31);
  partOneIPFSHash = partOneIPFSHash.slice(0, 31);
  console.log("Part 1 Hash: " + partOneIPFSHash);
  console.log("Part 2 Hash: " + partTwoIPFSHash);
  res.json({
    IPFS_PATH: partOneIPFSHash,
  });
});

app.get("/second", async (req, res) => {
  res.json({
    IPFS_PATH: partTwoIPFSHash,
  });
});

app.listen(port, () => {
  console.log(`app listening at port: ${port}`);
});
