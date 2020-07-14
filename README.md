## Summary

Queue is a project I built while at a previous job. Most of the office used a certain website but we only had one login, so if one person was logged in working on the site and another person tried to login, it would knock off the first person causing lost data. I built this so everyone would know when someone was logged in and who was next in line.

## Purpose and Goal

This was fun project to take on. I decided on React because I wanted to learn something new and thought the state management would come in handy. I went with Firebase because of its real time database which I was able to utilize to keep the front end updated with the current queue.

## How it works

You login to the app with just a name and it saves to local storage. You then get placed into the queue which is handled through Firebase. Once it's your turn you'll get a notification and a link will pop up to login.
