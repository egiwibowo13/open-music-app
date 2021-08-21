exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    insertedAt: {
      type: 'TEXT',
      notNull: true,
    },
    updatedAt: {
      type: 'TEXT',
      notNull: true,
    },
  });

  // memberikan constraint foreign key pada kolom owner terhadap  kolom id dari tabel users
  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_notes.owner_users.id pada tabel notes
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');

  pgm.dropTable('playlists');
};
