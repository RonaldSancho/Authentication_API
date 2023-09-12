import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "RonaldSancho";
const yourPassword = "motitimo2002";
const yourAPIKey = "e1dd0530-bcfe-4a75-9efe-a6747b98979e";
const yourBearerToken = "6d94e87b-e7a9-4455-a992-1d1398057f42";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL+ "random");
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL +"all?page=2",{
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  }catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const result = await axios.get(API_URL +"filter?score=7", {
      params: {
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  }catch (error) {
    res.status(404).send(error.message);
  }
});

const TOKEN = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "secrets/42", TOKEN);
    res.render("index.ejs", {content: JSON.stringify(result.data)})
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
