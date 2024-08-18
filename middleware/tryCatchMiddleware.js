const trycatchmiddleware = (trycatchhandler) => {
  return async (req, res, next) => {
    try {
      await trycatchhandler(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

module.exports = trycatchmiddleware;

