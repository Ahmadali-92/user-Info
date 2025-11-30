module.exports =
  (schema, reqProperty = 'body') =>
  async (req, res, next) => {
    try {
      await schema.validate(req[reqProperty], {abortEarly: false});
      next();
    } catch (err) {
      const errors = err.inner.map((e) => ({path: e.path, message: e.message}));
      res.status(400).json({errors});
    }
  };
