const Event = {
  user: (parent, arg, { db }) =>
    db.users.find(user => user.id === parent.user_id),
  location: (parent, arg, { db }) =>
    db.locations.find(location => location.id === parent.location_id),
  participants: (parent, args, { db }) =>
    db.participants.filter(participant => participant.event_id === parent.id),
};

module.exports = Event;
