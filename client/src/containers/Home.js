import React from "react";
import { Form, Button, FormControl, FormLabel } from "react-bootstrap";
import "./Home.css";
import { Redirect } from 'react-router-dom'
import {observer} from "controllerim";
import {HomeController} from "../controllers/HomeController"
import { PageComponent } from "./PageComponent";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";


export const Home = observer(class extends PageComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.controller = new HomeController(this);
        this.controller.mustLogIn()
        this.controller.loadQrCodesList()
    }

    render() {
        const Row = ({ index, style }) => (
            <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
              Row {index}
            </div>
          );
        return ( this.renderRedirect() ||
            <div className="Home">
                
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
                        <List
                            className="List"
                            height={height}
                            itemCount={this.controller.state.qr_codes_list.length}
                            itemSize={35}
                            width={width}
                        >
                            {Row}
                        </List>
                        )}
                    </AutoSizer>
            </div>
        );
    }
}
)