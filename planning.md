# event.ly

## Project Summary:

event.ly is a map-based web application for finding and creating events to connect with people in your local community.

### Team Members:

1. Spencer Elswick
2. Federico Rossi

## Roles:

- Frontend - Spencer / Federico
- Backend - Spencer / Federico
- Design - Spencer
- Research - Federico

## Links:

[GitHub-Repository](https://github.com/spencerlelswick/event-ly)

[Trello Board](https://trello.com/b/pTt1Gqgw/unit-3-project)

[Wireframe](https://www.figma.com/file/kCPaKTNQYwWgMMg2nelti3/event.ly?type=design&node-id=0%3A1&mode=design&t=ouQ1u1BIzDWwZvGo-1)

## Primary User Model:

| Property      | Datatype |
| ------------- | -------- |
| \_id          | Objectid |
| name          | String   |
| googleId      | String   |
| avatar        | String   |
| email         | String   |
| coordinates   | Object   |
| favCategories | [Number] |

### Secondary Events Model:

| Property    | Datatype        |
| ----------- | --------------- |
| \_id        | Objectid        |
| name        | String          |
| date        | Date            |
| coordinates | Object          |
| address     | String          |
| location    | String          |
| status      | Boolean         |
| category    | [Number]        |
| image       | String          |
| createdBy   | Ref: User.\_id  |
| guests      | Ref: [User]     |
| comments    | Ref: [Comments] |

## Tertiary Comment Model:

| Property  | Datatype       |
| --------- | -------------- |
| \_id      | Objectid       |
| body      | String         |
| username  | String         |
| edited    | Boolean        |
| createdBy | Ref: User.\_id |

## ERD Diagram

<!-- [ERD](https://LINK) -->

## User Stories

### As a user

- I want to be able to see a map
- I want to be able to see events pinned on the map
- I want to click pins on the map and see event details
- I want to see a list of events, based on the pins I see on the map
- I want to pan to move my position on the map
- I want to search an address or area to move the map view and search that area
- I want to be able to sign in
- I want to be able to register to an event as a participant
- I want to be able to comment on an event I am attending
- I want to be able to like an event I am attending
- I want to be able to share an event I am attending
- I want to be able to create an event
- I want to be able to delete an event that I created
- I want to be able to update an event that I created
- I want to be able to invite people to an event
- I want to be notified when a comment is made on an event I am a part of
- I want to be notified when a reply is made to my comment
- I want to delete a comment that I have made
- I want to edit a comment that I have made
- I want a profile page that displays the events that I am attending
- I want a profile page that displays my name, avatar and preferences
- I want to be able to message other users directly
