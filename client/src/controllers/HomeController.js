import PageController from './PageController.js'
import QrCodeService from '../services/QrCodeService.js'

export class HomeController extends PageController {

    static controllerName = 'HomeController'

    constructor(comp) {
        super(comp);
        this.qr_code_service = new QrCodeService(this.auth_services)
        this.state = {
            url: '',
            title: '',
            description: '',
            qr_codes_list: []
        };
    }

    loadQrCodesList() {
        this.wrapPromiseResult(this.qr_code_service.getQrCodes()).then(result =>
            this.state.qr_codes_list = result
        )
    }

    handleSubmit() {
        var result = this.wrapPromiseResult(this.qr_code_service.newQrCode(this.state))
        console.log(result)
    }
}
