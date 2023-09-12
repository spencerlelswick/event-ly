
![Screenshot 2023-09-12 at 16 11 59](https://github.com/spencerlelswick/event-ly/assets/106488356/255b5a74-23e8-48f8-a6b6-f043000b588a)

# event.ly

event.ly is a map-based web application for finding and creating events to connect with people in your local community.

## Features

### Front-end

- Displays an interactive map for viewing local events
- Click pins on the map to display information about an event
- On landing in the homepage map pans to user location (if allowed) or to a backfall location
- Create an event by selecting a spot on the map.
- Filter the event by category
- Sort the event by proximity, date, name, number of guests
- Filters can be applied to narrow results in the map and list view
- Click on an event in the list to pan the map to that event
- Join events and comment on those events
- Manage the created events in the personal user page
- See all joined events in the personal user page
- From the user page clicking an event center the map to the event

### Back-end

- Used server Node and Express to manage user and event data
- Configured Express Router to handle application endpoints for GET, POST, PUT and DELETE methods
- Implemented full CRUD functionality with Model-View-Controller design pattern
- Modelled the data structure with Mangoose database schema.
- Storing, accessing, editing data in a cloud database via asyncronous database calls
- Retrieving information from Bing Map API to geocode the coordinates and get an address
- Retrieving images from Unsplash API to let user pick images for their event.
- Application deployment on Heroku cloud platform

## Screenshots

### Home Page and Map Page

![home](https://github.com/spencerlelswick/event-ly/assets/106488356/5b436399-fe2a-4f44-ade7-eb9460611191)


### Filters and bottom drawer

![filter+found event](https://github.com/spencerlelswick/event-ly/assets/106488356/c730fcbb-94d7-4bf5-8cf9-326682816d0f)


### New event modal

![new event modal](https://github.com/spencerlelswick/event-ly/assets/106488356/feb9e093-2d7b-45b7-8750-c83d1b658430)


### Event detail modal

![event detail modal](https://github.com/spencerlelswick/event-ly/assets/106488356/44931e16-3938-471a-9ec2-43143b1b311c)


### User panel

![userpanel](https://github.com/spencerlelswick/event-ly/assets/106488356/d5099a12-b267-4ce0-88b8-511b32287a43)

### Edit event modal

![edit event](https://github.com/spencerlelswick/event-ly/assets/106488356/56fa51eb-459a-4919-9d54-5117ae2f71a1)

## Technologies Used

### MERN Stack Application

- HTML
- CSS
- JS
- Tailwind
- Daisy
- React
- Node
- Express
- Mongo DB
- Mongoose
- Heroku
- Netlify

## Icebox Feature

- [ ] Form animations
- [ ] Multilanguage support
- [ ] Multi-step form for adding events
- [ ] Loading spinner
- [x] Pop-up Toast confirmation when event is added
- [ ] Find related events, when viewing a particular event
- [ ] Notification, confirmation if I have joined an event
- [ ] Notification, if an event I am attending has a new comment posted
- [ ] Notification, if a reply is added to your comment
- [ ] Notification, if an event I have attended, creates another one
- [ ] Favorite types, would like to save event filters as a favorite event-type profile
- [ ] Infinite scroll for event list
- [ ] Subscriptions, allow users to subscribe to a type of event like 'tech events' and see a section showing all 'tech events' in a given area
- [ ] Share invite to friends on Event.ly
- [ ] Add event to Google/outlook/etc calendar

<!-- ![Footer](./public/images/readme/footer.png) -->
