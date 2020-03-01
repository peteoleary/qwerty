import PageController from './PageController.js'

export class HomeController extends PageController {

    static controllerName = 'HomeController'

    constructor(comp) {
        super(comp);
        this.state = {
            url: '',
            title: '',
            dscription: ''
        };
    }

    handleSubmit() {
        
    }
}
