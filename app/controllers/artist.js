const router = require("express").Router();
const request = require("request");
const memcache = require("memory-cache");

router.route("/search/:query").get((req, res) => {
  const query = req.params.query;
  const cacheKey = "mb.artist." + query;
  const cache = memcache.get(cacheKey);

  if (cache) {
    res.json(cache);
    return;
  }

  const url = "https://musicbrainz.org/ws/2/artist?query=" + query + "&limit=50&fmt=json";
  console.log(url);

  request({
    url: url,
    headers: {
      "User-Agent": "Poseidon/0.1.0"
    }
  }, (error, response, body) => {
    if (error || response.statusCode != 200) {
      console.log(response.statusCode + ": " + error);
      return;
    }

    const data = JSON.parse(body);

    // add to cache
    memcache.put(cacheKey, data, 600 * 1000);

    res.json(data);
  });
});

module.exports = router;

