const https = require('https');

const refreshDomain = async () => {
  https.get(process.env.REFRESH_DOMAIN, (resp) => {

    resp.on('data', () => {
    });

    resp.on('end', () => {
      console.log('service keep live');
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

module.exports = refreshDomain;
