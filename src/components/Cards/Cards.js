import { Card,ListGroup,ListGroupItem } from "react-bootstrap";

const Cards = (props) => {

    var date = new Date(props.eve.start_time * 1000);

    let ss = date.toLocaleDateString();
    return(
        <div>
            <Card style={{ width: '24rem' }}>
                <Card.Img variant="top" src={props.eve.cover_picture} />
                <Card.Body>
                    <Card.Title >{props.eve.name}</Card.Title>
                    <Card.Text >
                        {props.eve.short_desc}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    
                    <ListGroupItem>starts on {ss}</ListGroupItem>
                    <ListGroupItem>Entry Fee {props.eve.fees} {props.eve.currency}</ListGroupItem>
                    <ListGroupItem>Venue {props.eve.venue}</ListGroupItem>
                </ListGroup>
                {props.eve.registration_status==="REGISTRATIONS_OPEN"?
                    <Card.Body>
                    <Card.Link href="#">Register Now</Card.Link>

                    </Card.Body>
                    : 
                    <div>

                    </div>
                }
                
                </Card>
        </div>
    )
}

export default Cards;