const router = require("express").Router();
const memcache = require("memory-cache");
const fetch = require("node-fetch");

router.route("/:mbid").get((req, res) => {
  const mbid = req.params.mbid;
  const cacheKey = "mb.album." + mbid;
  const cache = memcache.get(cacheKey);

  // check for cache
  if (cache) {
    res.json({
      ok: true,
      data: cache
    });

    return;
  }

  const url = "https://musicbrainz.org/ws/2/release/" + mbid + "?fmt=json";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    }).then(json => {
      res.json({
        ok: true,
        data: {
          mbid: json.id,
          title: json.title,
          date: json.date.substring(0, 4),
          state: "N/A"
        }
      });
    }).catch(message => {
      res.json({
        ok: false,
        error: message
      });
    });;
});

module.exports = router;

