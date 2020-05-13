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
        this.wrapPromiseResult(this.qr_code_service.getQrCodes()).then(result => {
            // console.log(`loadQrCodesList: ${result.data}`);
            this.state.qr_codes_list = result.data
        }
        )
    }

    handleSubmit() {
        var request_params = {
            title: this.state.title,
            url: this.state.url,
            description: this.state.description
        }
        this.wrapPromiseResult(this.qr_code_service.newQrCode(request_params)).then(result => {
            console.log(`handleSubmit: ${result.data}`);
            this.state.qr_codes_list.push(result.data)
        }
        )
    }
}
