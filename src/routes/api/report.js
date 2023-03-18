module.exports = async (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(201).json({ status: 'ok' });
};
