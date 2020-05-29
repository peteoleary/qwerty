
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

const saveSvgAsPng = require('save-svg-as-png')

const cardHeightInREM = 40

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function camelToSnake(string) {
    return string.replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "_" + m[1];
    }).toLowerCase();
}

// https://github.com/exupero/saveSvgAsPng
const imageOptions = {
    scale: 5,
    encoderOptions: 1
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
    

    injectSVG(index) {
        let raw_svg = this.controller.state.qr_codes_list[index].qr_code_svg,
            download_file_name = this.controller.state.qr_codes_list[index].title
        // remove <?xml version="1.0" standalone="no"?>

        raw_svg = raw_svg.replace('<?xml version="1.0" standalone="no"?>', '')

        const base_64_svg = new Buffer(raw_svg).toString('base64');

        var svg = <div>
            { 
            <a download={download_file_name + ".svg"} href-lang='image/svg+xml' href={ 'data:image/svg+xml;base64,\n' + base_64_svg + "'"}>
            <div id={camelToSnake(download_file_name) + "_" + index} dangerouslySetInnerHTML={{ __html: raw_svg }} />
            </a> 
        }
        </div>
        return svg
        // var re =  new RegExp('<?xml(.*?)\?>(.*)')
        // var matches = re.exec(raw_svg)
        // return <MissingSVG />
    }

    handleDownload(e, index) {
        console.log(`index = ` + index)
        let download_file_name = this.controller.state.qr_codes_list[index].title
        console.log(`download_file_name = ` + download_file_name)
        var el = document.querySelector("#" + camelToSnake(download_file_name) + "_" + index + " > svg")
        console.log(`el = ` + el)

        //*[@id="b_fh_4"]/svg
        saveSvgAsPng.saveSvgAsPng(el, download_file_name + '.png', imageOptions);
      };

    rowRender({key, index, style}) {
        return (
            <Card style={{ width: '50rem', height: cardHeightInREM + 'rem' }} key={'qr_code_' + index}>
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
                            <Button onClick={e => this.handleDownload(e, index)} variant="primary">Download PNG</Button>
                        </Col>
                        <Col>
                            {this.injectSVG(index)}
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