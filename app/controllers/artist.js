const router = require("express").Router();
const request = require("request");
const memcache = require("memory-cache");

router.route("/search/:query").get((req, res) => {
  const query = req.params.query;
  const cacheKey = "mb.artist." + query;
  const cache = memcache.get(cacheKey);

  if (cache) {
    res.json({
      ok: true,
      data: cache
    });

    return;
  }

  const url = "https://musicbrainz.org/ws/2/artist?query=" + query + "&limit=50&fmt=json";

  request({
    url: url,
    headers: {
      "User-Agent": "Poseidon/0.1.0"
    }
  }, (error, response, body) => {
    if (error) {
      res.json({
        ok: false,
        message: error.code
      });

      return;
    }

    if(response.statusCode != 200) {
      res.json({
        ok: false,
        message: error.statusCode
      });

      return;
    }

    const data = JSON.parse(body);

    // add to cache
    memcache.put(cacheKey, data, 600 * 1000);

    res.json({
      ok: true,
      data: data
    });
  });
});

module.exports = router;

