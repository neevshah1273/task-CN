import { Card,ListGroup,ListGroupItem } from "react-bootstrap";

const Cards = (props) => {
    return(
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.eve.cover_picture} />
                <Card.Body>
                    <Card.Title>{props.eve.name}</Card.Title>
                    <Card.Text>
                        {props.eve.short_desc}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>starts on</ListGroupItem>
                    <ListGroupItem>Entry Fee {props.eve.fees} {props.eve.currency}</ListGroupItem>
                    <ListGroupItem>Venue {props.eve.venue}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Register Now</Card.Link>

                </Card.Body>
                </Card>
        </div>
    )
}

export default Cards;