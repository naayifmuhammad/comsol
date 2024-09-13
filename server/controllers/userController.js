exports.getUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  res.status(200).send(req.session.user);
};
