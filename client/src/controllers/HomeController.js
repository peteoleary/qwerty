import PageController from './PageController.js'
import QrCodeService from '../services/QrCodeService.js'

export class HomeController extends PageController {

    static controllerName = 'HomeController'

    constructor(comp) {
        super(comp);
        this.state = {
            url: '',
            title: '',
            description: ''
        };
    }

    handleSubmit() {
        new QrCodeService(this.auth_services).newQrCode(this.state)
    }
}
