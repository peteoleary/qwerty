import React from "react";
import {Card, Container, Row, Col, Button, Image} from "react-bootstrap";

import {List} from "react-virtualized";

import {convertRemToPixels, camelToSnake} from '../Utils.js'


  export default    class ItemList extends React.Component {

    constructor (props) {
        super(props)
        console.log('ItemList constructor: ' + JSON. stringify(props))
    }

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
                            <Button variant="primary">Edit</Button>
                        </Col>
                        <Col>
                            <Image src={this.props.list[index].image_url}/>
                        </Col>
                    </Row>
                    </Container>
                   
                </Card.Body>
            </Card>
        )
    }

    render() {
        console.log(`ItemList.js render: ${this.props.list}`);
        return ( 
            <List
                rowRenderer={this.rowRender.bind(this)}
                className="ItemList"
                height={this.props.height}
                rowCount={this.props.list.length}
                rowHeight={convertRemToPixels(this.props.cardHeightInREM)}
                width={this.props.width}
            />
        )
    }
  }