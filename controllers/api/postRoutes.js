const router = require('express').Router();
const {Post} = require('../../models/');
const withAuth = require('../../utils/auth');


//create post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



//edit post
router.put('/:id', withAuth, async (req, res) => {
try{
  const [postUpdates] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (postUpdates > 0){
      res.status(200).end();
    }
    else{
      res.status(404).end();
    }
  }
    catch(err) {
      res.status(500).json(err)
    }
});

  //delete post
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const [postUpdates] = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (postUpdates > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;