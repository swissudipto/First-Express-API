const express = require("express");
const member = require("../../member");
const uuid = require("uuid");
const router = express.Router();

// Get All member
router.get("/", (req, res) => {
  res.json(member);
});

// Get a Specific member
router.get("/:id", (req, res) => {
  if (member.some((member) => member.id === parseInt(req.params.id))) {
    res.json(member.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json(`No member is found for id : ${req.params.id} `);
  }
});

// Create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: "Please include a name and email" });
  }

  member.push(newMember);

  res.json(member);
});

// Update a member
router.put("/:id", (req, res) => {
  if (member.some((member) => member.id === parseInt(req.params.id))) {
    const updMember = req.body;
    member.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json(`No member is found for id : ${req.params.id} `);
  }
});

// Delete a Member
router.delete("/:id", (req, res) => {
    if (member.some((member) => member.id === parseInt(req.params.id))) {
      res.json({
        msg : 'Member Deleted',
        members : member.filter((member) => member.id !== parseInt(req.params.id))
    });
    } else {
      res.status(400).json(`No member is found for id : ${req.params.id} `);
    }
  });
 
module.exports = router;
