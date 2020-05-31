import React from "react";
import { Form, Button, FormControl, FormLabel, Tabs, Tab } from "react-bootstrap";
import "./Home.css";
import {observer} from "controllerim";
import {HomeController} from "../controllers/HomeController"
import { PageComponent } from "./PageComponent";

import {AutoSizer} from "react-virtualized";
import 'react-virtualized/styles.css';

import QrCodeList from "../components/QrCodeList"
import ItemList from "../components/ItemList"

import {ReactComponent as MissingSVG} from './Missing.svg'

const cardHeightInREM = 40

export const Home = observer(class extends PageComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.controller = new HomeController(this);
        this.controller.mustLogIn()
        this.controller.loadLists()
    }

    render() {
        console.log('Home.js render: length=' + this.controller.state.qr_codes_list.length)
        return ( this.renderRedirect() ||
            <div className="Home">

                <Tabs defaultActiveKey="items" id="home_tabs">
                <Tab eventKey="items" title="Items">
                    <AutoSizer>
                            {({ height, width }) => (
                                <ItemList
                                    list={this.controller.state.items_list}
                                    height={height}
                                    width={width}
                                    cardHeightInREM={cardHeightInREM}
                                />
                            )}
                        </AutoSizer>
                    </Tab>
                <Tab eventKey="qr_codes" title="QR Codes">
                    <FormLabel>
                    URL:
                    <FormControl id='url' type="text" value={this.controller.state.url} onChange={this.controller.handleChange} />
                    </FormLabel>
                    <FormLabel>
                    Title:
                    <FormControl id='title' type="text" value={this.controller.state.title} onChange={this.controller.handleChange} />
                    </FormLabel>
                    <FormLabel>
                    Description:
                    <FormControl id='description' type="text" value={this.controller.state.description} onChange={this.controller.handleChange} />
                    </FormLabel>
                    <Button variant="primary" type="submit" onClick={this.controller.handleSubmit}>
                        Submit
                    </Button>
                    <AutoSizer>
                        {({ height, width }) => (
                            <QrCodeList
                                list={this.controller.state.qr_codes_list}
                                height={height}
                                width={width}
                                cardHeightInREM={cardHeightInREM}
                            />
                        )}
                    </AutoSizer>
                </Tab>
                </Tabs>
            
            </div>
        );
    }
}
)