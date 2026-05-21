import express from "express";

const router = express.Router();

/* TEMP USERS */
let users = [
  {
    _id: "1",
    name: "Admin",
    email: "admin@gmail.com",
    role: "admin",
    profileImage:
      "https://i.pravatar.cc/150?img=12",
  },
];

/* =========================
   PROFILE ROUTES FIRST
========================= */

/* GET PROFILE */
router.get("/profile", (req, res) => {
  res.json(users[0]);
});

/* UPDATE PROFILE */
router.put("/profile", (req, res) => {

  users[0] = {
    ...users[0],
    ...req.body,
  };

  res.json({
    message: "Profile Updated",
    user: users[0],
  });
});

/* =========================
   USERS
========================= */

/* GET ALL USERS */
router.get("/", (req, res) => {
  res.json(users);
});

/* UPDATE USER ROLE */
router.put("/:id", (req, res) => {

  users = users.map((u) =>
    u._id === req.params.id
      ? {
          ...u,
          role: req.body.role,
        }
      : u
  );

  res.json({
    message: "Role Updated",
  });
});

/* DELETE USER */
router.delete("/:id", (req, res) => {

  users = users.filter(
    (u) => u._id !== req.params.id
  );

  res.json({
    message: "User Deleted",
  });
});

export default router;