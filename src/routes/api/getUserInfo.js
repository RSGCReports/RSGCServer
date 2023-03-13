const { getUserByUsername } = require('../../../prisma/prismaFunction');

module.exports = async (req, res) => {
  const user = await getUserByUsername(req.user);
  console.log('Retrieved User: ' + JSON.stringify(user));

  res.status(200).json({
    status: 'ok',
    text: 'Get user info',
  });
};
