import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// eslint-disable-next-line react/prefer-stateless-function
class EventDescription extends React.Component {
    render() {
        const { isOrganizer, hostedEvents, invitedEvents } = this.props;
        const events = isOrganizer ? hostedEvents : invitedEvents
        if (events.length){
            return (
                <div>
                    {events.map(event => {
                        return (
                            <div key={event.id} onClick={() => this.props.history.push(`/events/${event.id}`)}>
                                <h6><p ><strong>Name:</strong> <span style={{color: '#428bca', cursor: 'pointer'}}>{event.title}</span></p></h6>
                                <h6><p><strong>Time:</strong> {moment(event.date).fromNow()}</p></h6>
                                <hr />
                            </div>
                        )
                    })}
                </div>
        )} else {
            return (
                <div>
                    <h6><p>Nothing planned.</p></h6>
                </div>
            )
        }
    }
}

const mapStateToProps = ({ events, invites }) => {
    const invitedEvents = invites.map(invite => invite.event);
    return {
        hostedEvents: events,
        invitedEvents
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadEvent: (id) => {
            dispatch({ type: 'LOAD_EVENT', id: id })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDescription));