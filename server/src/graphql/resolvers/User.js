const User = {
  events: (parent, { db }) =>
    db.events.filter(event => event.user_id === parent.id),
};

module.exports = User;
