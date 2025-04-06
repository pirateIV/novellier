// import dbConnect from "@/lib/db";
// import { User } from "@/shared/models";
// import bcrypt from "bcryptjs";
// const dbConnect = require("../../../../lib/db");
// const { User } = require("@/shared/models");
// const bcrypt = require("bcryptjs");

import dbConnect from "@/lib/db";
import { User } from "@/shared/models";
import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    password: "12345678",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    password: "12345678",
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    username: "michaelj",
    password: "12345678",
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    username: "emilyw",
    password: "12345678",
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    username: "davidb",
    password: "12345678",
  },
  {
    firstName: "Sarah",
    lastName: "Jones",
    email: "sarah.jones@example.com",
    username: "sarahj",
    password: "12345678",
  },
  {
    firstName: "Robert",
    lastName: "Garcia",
    email: "robert.garcia@example.com",
    username: "robertg",
    password: "12345678",
  },
  {
    firstName: "Jennifer",
    lastName: "Miller",
    email: "jennifer.miller@example.com",
    username: "jenniferm",
    password: "12345678",
  },
  {
    firstName: "Thomas",
    lastName: "Davis",
    email: "thomas.davis@example.com",
    username: "thomasd",
    password: "12345678",
  },
  {
    firstName: "Lisa",
    lastName: "Rodriguez",
    email: "lisa.rodriguez@example.com",
    username: "lisar",
    password: "12345678",
  },
  {
    firstName: "William",
    lastName: "Martinez",
    email: "william.martinez@example.com",
    username: "williamm",
    password: "12345678",
  },
  {
    firstName: "Jessica",
    lastName: "Wilson",
    email: "jessica.wilson@example.com",
    username: "jessicaw",
    password: "12345678",
  },
  {
    firstName: "James",
    lastName: "Anderson",
    email: "james.anderson@example.com",
    username: "jamesa",
    password: "12345678",
  },
  {
    firstName: "Amanda",
    lastName: "Taylor",
    email: "amanda.taylor@example.com",
    username: "amandat",
    password: "12345678",
  },
  {
    firstName: "Daniel",
    lastName: "Thomas",
    email: "daniel.thomas@example.com",
    username: "danielt",
    password: "12345678",
  },
];

async function populateDb() {
  await dbConnect();

  const hashedPasswordUsers = users.map((user) => {
    return { ...user, password: bcrypt.hashSync(user.password, 10) };
  });

  for (const user of hashedPasswordUsers) {
    const newUser = new User({
      ...user,
    });
    await newUser.save();
  }

  try {
    // const users = await User.insertMany()
    await User.deleteMany({
      email: { $in: users.map((user) => user.email) },
    });
    console.log("user deleted...");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
}

populateDb();
