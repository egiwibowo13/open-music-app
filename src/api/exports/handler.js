class ExportsHandler {
  constructor(service, playlistsService, validator) {
    this._service = service;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postExportPlaylistsHandler = this.postExportPlaylistsHandler.bind(this);
  }

  async postExportPlaylistsHandler({ payload, params, auth }, h) {
    this._validator.validateExportPlaylistsPayload(payload);
    const { id: playlistId } = params;
    const { id: credentialId } = auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const message = {
      playlistId,
      userId: credentialId,
      targetEmail: payload.targetEmail,
    };
    await this._service.sendMessage('export:playlistsongs', JSON.stringify(message));
    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
