import React from "react";
import { Form, Button, FormControl, FormLabel } from "react-bootstrap";
import "./Home.css";
import { Redirect } from 'react-router-dom'
import {observer} from "controllerim";
import {HomeController} from "../controllers/HomeController"
import { PageComponent } from "./PageComponent";

import {Card, Container, Row, Col} from "react-bootstrap";
import {AutoSizer, List} from "react-virtualized";
import 'react-virtualized/styles.css';

import {ReactComponent as MissingSVG} from './Missing.svg'

const cardHeightInREM = 40

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}


export const Home = observer(class extends PageComponent {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.controller = new HomeController(this);
        this.controller.mustLogIn()
        this.controller.loadQrCodesList()
    }

    drawCell(columnIndex, rowIndex) {
        switch (columnIndex) {
            case 0:
                return this.controller.state.qr_codes_list[rowIndex].url
            case 1:
                return this.controller.state.qr_codes_list[rowIndex].title
            case 2:
                return this.controller.state.qr_codes_list[rowIndex].description
        }
    }

    injectSVG(raw_svg) {
        // remove <?xml version="1.0" standalone="no"?>

        raw_svg = raw_svg.replace('<?xml version="1.0" standalone="no"?>', '')
        var svg = <div>
            { <div dangerouslySetInnerHTML={{ __html: raw_svg }} /> }
        </div>
        return svg
        // var re =  new RegExp('<?xml(.*?)\?>(.*)')
        // var matches = re.exec(raw_svg)
        // return <MissingSVG />
    }

    rowRender({key, index, style}) {
        return (
            <Card style={{ width: '50rem', height: cardHeightInREM + 'rem' }}>
                <Card.Body>
                    <Container>
                    <Row>
                        <Col>
                            <Card.Title>{this.controller.state.qr_codes_list[index].title}</Card.Title>
                            <Card.Text>
                            {this.controller.state.qr_codes_list[index].description}
                            </Card.Text>
                            <Card.Text>
                            {this.controller.state.qr_codes_list[index].shortened_url}
                            </Card.Text>
                            <Button variant="primary">Edit</Button>
                        </Col>
                        <Col>
                            {this.injectSVG(this.controller.state.qr_codes_list[index].qr_code_svg)}
                        </Col>
                    </Row>
                    </Container>
                   
                </Card.Body>
            </Card>
        )
    }

    render() {
          
        console.log(`Home.js render: ${this.controller.state.qr_codes_list}`);
        const list = this.controller.state.qr_codes_list
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
                            rowCount={this.controller.state.qr_codes_list.length}
                            rowHeight={convertRemToPixels(cardHeightInREM)}
                            width={width}
                            rowRenderer={this.rowRender.bind(this)}
                        />
                        )}
                    </AutoSizer>
            </div>
        );
    }
}
)