class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongByIdHandler = this.deletePlaylistSongByIdHandler.bind(this);
  }

  async postPlaylistSongHandler({ payload, params, auth }, h) {
    this._validator.validatePlaylisSongtPayload(payload);
    const { songId } = payload;
    const { playlistId } = params;
    const { id: credentialId } = auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.addPlaylistSong(playlistId, songId);
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan keplaylist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler({ params, auth }) {
    const { playlistId } = params;
    const { id: credentialId } = auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const songs = await this._playlistSongsService.getPlaylistSongs(playlistId);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async deletePlaylistSongByIdHandler({ payload, params, auth }) {
    this._validator.validatePlaylisSongtPayload(payload);
    const { playlistId } = params;
    const { songId } = payload;
    const { id: credentialId } = auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.verifyPlaylistSong(playlistId, songId);
    await this._playlistSongsService.deletePlaylistSong(playlistId, songId);
    return {
      status: 'success',
      message: 'lagu berhasil dihapus',
    };
  }
}

module.exports = PlaylistSongsHandler;
