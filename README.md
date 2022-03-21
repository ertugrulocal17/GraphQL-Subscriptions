# GraphQL - Subscriptions

## Codes

Mutations

```
mutation AddNewUser {
  addUser(
    data:{
      username:"Ertugrul"
      email:"ertu@gmail.com"
    }
  ){
    id
    username
    email
  }
}

mutation AddNewEvent {
  addEvent(
    data:{
      title:"New Event"
      desc:"New Desc"
      date:"22/22/12"
      from:"11.00"
      to:"12.00"
      location_id:"1"
      user_id:"1"
    }
  ){
    id
    title
    desc
    date
    from
    to
    location_id
    user_id
  }
}

mutation addNewParticipant{
  addParticipant(
    data:{
      user_id:"1"
      event_id:"1"
    }
  ){
    id
    user_id
    event_id
  }
}
```

Subscriptions

```
subscription userCreated{
  userCreated{
    id
    username
    email
  }
}

subscription eventCreated{
  eventCreated{
    id
    title
    desc
    date
    from
    to
    location_id
    user_id
  }
}

subscription addParticipant{
  participantAdded{
    id
    user_id
    event_id
  }
}
```
