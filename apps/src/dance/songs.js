import Sounds from '../Sounds';

/**
 * Requests the song manifest in parallel with signed cloudfront cookies. These cookies
 * are needed before accessing restricted song files.
 * @param useRestrictedSongs {boolean} if true, request signed cloudfront
 * cookies in parallel with the request for the manifest, and use /restricted/
 * urls instead of curriculum.code.org urls for music files.
 * @param manifestFilename {string} Optional. Specify the name of the manifest
 * to request from S3. Must be located in cdo-sound-library/hoc_song_meta.
 * @returns {Promise<*>} The song manifest.
 */
export async function getSongManifest(useRestrictedSongs, manifestFilename) {
  if (!manifestFilename || manifestFilename.length === 0) {
    manifestFilename = useRestrictedSongs
      ? 'songManifest2020_v2.json'
      : 'testManifest.json';
  }

  const songManifestPromise = fetch(
    `/api/v1/sound-library/hoc_song_meta/${manifestFilename}`
  ).then(response => response.json());
  const promises = [songManifestPromise];

  if (useRestrictedSongs) {
    const signedCookiesPromise = fetchSignedCookies();
    promises.push(signedCookiesPromise);
  }

  const result = await Promise.all(promises);
  const songManifest = result[0].songs;

  const songPathPrefix = useRestrictedSongs
    ? '/restricted/'
    : 'https://curriculum.code.org/media/uploads/';

  return songManifest.map(song => ({
    ...song,
    url: `${songPathPrefix}${song.url}.mp3`
  }));
}

export async function getSoundCloudManifest() {
  return [ 
    {"id": "takeonme_aha", "text": "A-ha - Take On Me", "pg13": false, "url": "takeonme_aha", "2019": false, "track_id": "116670606", "track_start": 18000},
    {"id": "isawthesign_aceofbase", "text": "Ace of Base - The Sign", "pg13": false, "url": "isawthesign_aceofbase", "2019": false,"track_id": "157033127", "track_start": 32000},
    {"id": "callmemaybe_carlyraejepsen", "text": "Carly Rae Jepsen - Call Me Maybe", "pg13": false, "url": "callmemaybe_carlyraejepsen", "2019": false, "track_id": "37600755", "track_start": 63000},
    {"id": "getintothegroove_madonna", "text": "Madonna - Into the Groove", "pg13": false, "url": "getintothegroove_madonna", "2019": false, "track_id": "736531", track_start: 15000},
    {"id": "migente_jbalvin", "text": "J Balvin and Willy William - Mi Gente", "pg13": false, "url": "migente_jbalvin", "2019": false, "track_id": "332395855", track_start: 0},
    {"id": "firework_katyperry", "text": "Katy Perry - Firework", "pg13": false, "url": "firework_katyperry", "2019": false, "track_id": "205509991", track_start: 0},
    {"id": "bornthisway_ladygaga", "text": "Lady Gaga - Born This Way", "pg13": false, "url": "bornthisway_ladygaga","2019": false, "track_id":"15793238", track_start: 57000},
    {"id": "cheapthrills_sia", "text": "Sia - Cheap Thrills", "pg13": false, "url": "cheapthrills_sia", "2019": false, "track_id": "248310182", track_start: 8000},
    {"id": "heyya_outkast", "text": "OutKast - Hey Ya!", "pg13": false, "url": "heyya_outkast", "2019": false, "track_id": "382886567", track_start: 1000},
    {"id": "summer_calvinharris", "text": "Calvin Harris - Summer", "pg13": false, "url": "summer_calvinharris", "2019": false, "track_id": "155234727", track_start: 6000},
    {"id": "somebodylikeyou_keithurban", "text": "Keith Urban - Somebody Like You", "pg13": false, "url": "somebodylikeyou_keithurban", "2019": false, "track_id": 173973112, track_start: 2000},
    {"id": "backtoyou_selenagomez", "text": "Selena Gomez - Back to You", "pg13": false, "url": "backtoyou_selenagomez", "2019": false, track_start: 57000, track_id: "442314912"},
    {"id": "sorry_justinbieber", "text": "Justin Bieber - Sorry", "pg13": false, "url": "sorry_justinbieber", "2019": false, track_id: "271152938", track_start: 0},
    {"id": "notearslefttocry_arianagrande", "text": "Ariana Grande - no tears left to cry", "pg13": false, "url": "notearslefttocry_arianagrande", "2019": false, "track_start": 32000, track_id: "433316178"},
    {"id": "uptownfunk_brunomars", "text": "Mark Ronson (ft. Bruno Mars) - Uptown Funk", "pg13": true, "url": "uptownfunk_brunomars", "2019": false, track_id: "195379997", track_start: 0},
    {"id": "vivalavida_coldplay", "text": "Coldplay - Viva la Vida", "pg13": false, "url": "vivalavida_coldplay", "2019": false, "track_start": 13000, "track_id": "157033127"}
  ];
}

/**
 * Fetch cookies signed by cloudfront which grant access to restricted songs.
 * @returns {Promise<Response>}
 */
export function fetchSignedCookies() {
  return fetch('/dashboardapi/sign_cookies', {credentials: 'same-origin'});
}

/**
 * Decide which song to select based on the song list and appOptions config.
 * @param songManifest
 * @param config {Object} appOptions config object
 * @returns {String} song id to select
 */
export function getSelectedSong(songManifest, config) {
  // The selectedSong and defaultSong might not be present in the songManifest
  // in development mode, so just select the first song in the list instead.
  const songs = songManifest.map(song => song.id);
  const {selectedSong, defaultSong, isProjectLevel, freePlay} = config.level;
  if (
    (isProjectLevel || freePlay) &&
    selectedSong &&
    songs.includes(selectedSong)
  ) {
    return selectedSong;
  } else if (defaultSong && songs.includes(defaultSong)) {
    return defaultSong;
  } else if (songManifest[0]) {
    return songManifest[0].id;
  }
}

/**
 * Load the specified song sound file.
 * @param songId {string} Song to load.
 * @param songData {Object<Object>} Song data containing urls of songs.
 * @param onPreloadError {function} Error callback with status code.
 */
export function loadSong(songId, songData, onPreloadError) {
  if(songData[songId].track_id) {
    return;
  }
  const url = songData[songId].url;
  const options = {
    id: url,
    mp3: url,
    onPreloadError
  };
  Sounds.getSingleton().register(options);
}

export function unloadSong(songId, songData) {
  if(songData[songId].track_id) {
    return;
  }
  const url = songData[songId].url;
  Sounds.getSingleton().unload(url);
}

export async function loadSongMetadata(id) {
  let songDataPath = '/assets/hoc_song_meta';
  const response = await fetch(`${songDataPath}/${id}.json`);
  return response.json();
}

export function parseSongOptions(songManifest) {
  let songs = {};
  songManifest.forEach(song => {
    songs[song.id] = {title: song.text, url: song.url, pg13: song.pg13, track_id: song.track_id, track_start: song.track_start };
  });
  return songs;
}
