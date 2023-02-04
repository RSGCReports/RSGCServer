module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    text: "All's well in test today",
  });
};
