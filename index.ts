import express from "express";
import cors from "cors";
import { houseData, residentData } from "./data";

let houses = houseData;
let residents = residentData;

const app = express();
app.use(cors());
app.use(express.json());

const port = 9876;

//HOUSES
app.get("/houses", (req, res) => {
  let housesToSend = houses.map((house) => {
    let resident = residents.find(
      (resident) => resident.id === house.residentId
    );
    return { ...house, resident };
  });
  res.send(housesToSend);
});

app.get("/houses/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = houses.find((house) => house.id === id);
  res.send(match);
});

app.post("/houses", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.address !== "string") {
    errors.push("Address not given or not a string!");
  }

  if (typeof req.body.type !== "string") {
    errors.push("Type not given or not a string!");
  }

  if (typeof req.body.residentId !== "number") {
    errors.push("ResidentId not given or not a number!");
  }
  let resident = residents.find(
    (resident) => resident.id === req.body.residentId
  );

  if (!resident) {
    errors.push("House don't exist.");
  }
  if (errors.length === 0) {
    const newHouse = {
      id: houses[houses.length - 1].id + 1,
      address: req.body.address,
      type: req.body.type,
      residentId: req.body.residentId,
    };
    houses.push(newHouse);
    res.send(newHouse);
  } else {
    res.status(400).send({ errors });
  }
});

app.delete("/houses/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexToDelete = houses.findIndex((house) => house.id === id);

  if (indexToDelete > -1) {
    houses = houses.filter((house) => house.id !== id);
    res.send({ message: "House deleted!" });
  } else {
    res.status(404).send({ error: "House not found!" });
  }
});

app.patch("/houses/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = houses.find((house) => house.id === id);

  if (match) {
    if (req.body.type) {
      match.type = req.body.type;
    }

    if (req.body.address) {
      match.address = req.body.address;
    }

    if (req.body.residentId) {
      match.residentId = req.body.residentId;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "House Not Found!" });
  }
});

//RESIDENTS

app.get("/residents", (req, res) => {
  let residentsToSend = residents.map((resident) => {
    const foundHouses = houses.filter(
      (house) => house.residentId === resident.id
    );
    return { ...resident, houses: foundHouses };
  });
  res.send(residentsToSend);
});

app.get("/residents/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = residents.find((resident) => resident.id === id);
  res.send(match);
});

app.post("/residents", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.name !== "string") {
    errors.push("Name not given or not a string!");
  }
  if (typeof req.body.age !== "number") {
    errors.push("Age not given or not a number!");
  }
  if (typeof req.body.gender !== "string") {
    errors.push("Gender not given or not a string!");
  }
  if (errors.length === 0) {
    const newResident = {
      id: residents[residents.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
    };
    residents.push(newResident);
    res.send(newResident);
  } else {
    res.status(400).send({ errors });
  }
});

app.delete("/residents/:id", (req, res) => {
  const id = Number(req.params.id);
  const indexTodelete = residents.findIndex((resident) => resident.id === id);

  if (indexTodelete > -1) {
    residents = residents.filter((resident) => resident.id !== id);
    res.send({ message: "Resident deleted" });
  } else {
    res.status(404).send({ erros: "Resident not Found!" });
  }
});

app.patch("/residents/:id", (req, res) => {
  let id = Number(req.params.id);
  let match = residents.find((resident) => resident.id === id);

  if (match) {
    if (req.body.name) {
      match.name = req.body.name;
    }
    if (req.body.age) {
      match.age = req.body.age;
    }
    if (req.body.gender) {
      match.gender = req.body.gender;
    }
    res.send(match);
  } else {
    res.status(404).send({ error: "Resident not Found!" });
  }
});

app.listen(port, () => {
  console.log(`Running: http:/localhost:${port}`);
});
