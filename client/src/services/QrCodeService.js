export default class QrCodeService {

    constructor(auth_service) {
        this.auth_service = auth_service;
    }

    newQrCode(params) {
        return this.auth_service.authenticatedPost('/api/qr_codes', params)
    }

    getQrCodes() {
        return this.auth_service.authenticatedGet('/api/qr_codes')
    }
}