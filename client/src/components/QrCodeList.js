import React from "react";
import {Card, Container, Row, Col, Button} from "react-bootstrap";

import {List} from "react-virtualized";

import {convertRemToPixels, camelToSnake} from '../Utils.js'

const saveSvgAsPng = require('save-svg-as-png')

// https://github.com/exupero/saveSvgAsPng
const imageOptions = {
    scale: 5,
    encoderOptions: 1
  }

  export default    class QrCodeList extends React.Component {

    constructor (props) {
        super(props)
        console.log('QrCodeList constructor: ' + JSON. stringify(props))
    }

    injectSVG(index) {
        let raw_svg = this.props.list[index].qr_code_svg,
            download_file_name = this.props.list[index].title
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
        let download_file_name = this.props.list[index].title
        console.log(`download_file_name = ` + download_file_name)
        var el = document.querySelector("#" + camelToSnake(download_file_name) + "_" + index + " > svg")
        console.log(`el = ` + el)

        //*[@id="b_fh_4"]/svg
        saveSvgAsPng.saveSvgAsPng(el, download_file_name + '.png', imageOptions);
      };

    rowRender({key, index, style}) {
        return (
            <Card style={{ width: '50rem', height: this.cardHeightInREM + 'rem' }} key={'qr_code_' + index}>
                <Card.Body>
                    <Container>
                    <Row>
                        <Col>
                            <Card.Title>{this.props.list[index].title}</Card.Title>
                            <Card.Text>
                            {this.props.list[index].description}
                            </Card.Text>
                            <Card.Text>
                            {this.props.list[index].shortened_url}
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
        console.log(`QrCodeList.js render: ${this.props.list}`);
        return ( 
            <List
                rowRenderer={this.rowRender.bind(this)}
                className="QrCodeList"
                height={this.props.height}
                rowCount={this.props.list.length}
                rowHeight={convertRemToPixels(this.props.cardHeightInREM)}
                width={this.props.width}
            />
        )
    }
  }