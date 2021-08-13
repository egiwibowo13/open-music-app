const mapDBToSongModel = (db) => ({
  id: db?.id,
  title: db?.title,
  performer: db?.performer,
  year: db?.year,
  genre: db?.genre,
  duration: db?.duration,
  insertedAt: db?.insertedAt,
  updatedAt: db?.updatedAt,
});

module.exports = { mapDBToSongModel };
