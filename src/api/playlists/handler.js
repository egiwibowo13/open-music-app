class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.putPlaylistByIdHandler = this.putPlaylistByIdHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistHandler({ payload, auth }, h) {
    this._validator.validatePlaylistPayload(payload);
    const { id: credentialId } = auth.credentials;
    const {
      name,
    } = payload;
    const playlistId = await this._service.addPlaylist({
      name, owner: credentialId,
    });
    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler({ auth }) {
    const { id: credentialId } = auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async putPlaylistByIdHandler({ payload, params, auth }) {
    this._validator.validatePlaylistPayload(payload);
    const { id } = params;
    const { id: credentialId } = auth.credentials;
    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.editPlaylistById(id, payload);
    return {
      status: 'success',
      message: 'playlist berhasil diperbarui',
    };
  }

  async deletePlaylistByIdHandler({ params, auth }) {
    const { id } = params;
    const { id: credentialId } = auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);
    await this._service.deletePlaylistById(id);
    return {
      status: 'success',
      message: 'playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
