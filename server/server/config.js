const config = {
  mongoURL:  process.env.MONGODB_URI || 'mongodb://heroku_1610wjh2:m6sqi8kam677uqarv6kijdgg23@ds141406.mlab.com:41406/heroku_1610wjh2',
  port: process.env.PORT || 8000,
};

export default config;
