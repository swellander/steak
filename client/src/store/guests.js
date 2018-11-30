import axios from 'axios'

//action consonants
const LOAD_GUESTS = 'LOAD_GUESTS'

//action creator
const loadGuests = (guests) => {
    return {
        type: LOAD_GUESTS,
        guests
    }
}

//thunk creator
export const _loadGuests = (id) => {
    return (dispatch) => {
        axios.get(`/api/invites/events/${id}`)
            .then((res) => res.data)
            .then((users) => dispatch(loadGuests(users)))
    }
}

//users reducer
export default (state = [], action) => {
    switch (action.type) {
        case LOAD_GUESTS:
            return action.guests
        default:
            return state
    }
}