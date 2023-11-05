const router = require("express").Router();
const { Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

router.post("/posts/:id/comments",
//  withAuth,
  async (req, res) => {
    try {

      const newComment = await Comment.create({
        ...req.body,
        post_id: req.session.post_id,
        user_id: req.session.user,
      });

      res.status(201).json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

router.delete("/:id",
  // withAuth,
  async (req, res) => {
    try {
      const CommentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!CommentData) {
        res.status(404).json({ message: "No Comment found with this id!" });
        return;
      }

      res.status(200).json(CommentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
