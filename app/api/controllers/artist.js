require("isomorphic-fetch");

const memcache = require("memory-cache");
const router = require("express").Router();

router.route("/:mbid").get((req, res) => {
  const mbid = req.params.mbid;
  const cacheKey = "mb.artist." + mbid;
  const cache = memcache.get(cacheKey);

  // check for cache
  if (cache) {
    res.json({
      ok: true,
      data: cache
    });

    return;
  }

  const url = "https://musicbrainz.org/ws/2/artist/" + mbid + "?inc=releases&fmt=json";
  const headers = new Headers({
    "User-Agent": "Poseidon/0.1.0"
  });
  const request = new Request(url, {
    headers: headers
  });

  fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(json => {
      // add to cache
      memcache.put(cacheKey, json, 600 * 1000);

      res.json({
        ok: true,
        data: {
          name: json.name,
          disambiguation: json.disambiguation,
          albums: json.releases.map(x => x.id)
        }
      });
    })
    .catch(error => {
      res.json({
        ok: false,
        message: error.message
      });
    });
});

router.route("/search/:query").get((req, res) => {
  const query = req.params.query;
  const cacheKey = "mb.artist-search." + query;
  const cache = memcache.get(cacheKey);

  if (cache) {
    res.json({
      ok: true,
      data: cache
    });

    return;
  }

  const url = "https://musicbrainz.org/ws/2/artist?query=" + query + "&limit=50&fmt=json";
  const headers = new Headers({
    "User-Agent": "Poseidon/0.1.0"
  });
  const request = new Request(url, {
    headers: headers
  });

  fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }).then(json => {
      // add to cache
      memcache.put(cacheKey, json, 600 * 1000);

      res.json({
        ok: true,
        data: json
      });
    }).catch(message => {
      res.json({
        ok: false,
        message: message
      });
    });
});

module.exports = router;

