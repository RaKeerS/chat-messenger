# Chat-Messenger 🗣
This is my own implementation of a simple web based chat-messenger using only HTML, CSS, JS over .NET framework.
My aim was to create a chat-messenger using minimal resources. The idea is to see if I could implement a chat messenger using just API services over HTTP based protocol.

So, I wanted to create a real time chat-messenger which would allow real time communication between clients over the web.
The means to implement my idea of a real time chat-messenger became possible using Signal-R. This is a .NET library allowing real time communication and also let's us sent Server Side Events without the need of polling. This Chat-Messenger also implements Authorization for verifying if the request is coming from an authorized User.

More on Signal-R over here: "https://dotnet.microsoft.com/apps/aspnet/signalr"

This web application allows multiple clients to communicate with each other real time, it shows the different User Accounts we are chatting with, represents the chats systematically. ✨🤩

The application doesn't make use of any database, it's purely running on the system memory i.e. the User Accounts might be lost if the application is updated. 
Hence, this could be called as a completely private chat which keeps no records of the recipients or the sessions or messages whatsover! 😎👥

**Below is the link to a fork of this project which works without Authorization -**

[![Chat-Messenger-Noauth](https://img.shields.io/badge/Github-chat--messenger--noauth-green?label=Github&amp;logo=github)](https://github.com/RaKeerS/chat-messenger-noauth)

## Technologies Used
The application is created using HTML, CSS, JS via. a ASP.NET framework for web applications. It also utilizes the Signal-R library for providing the real-time web functionality.

### Signal-R 
ASP.NET SignalR is a library for ASP.NET developers that simplifies the process of adding real-time web functionality to applications. Real-time web functionality is the ability to have server code push content to connected clients instantly as it becomes available, rather than having the server wait for a client to request new data. (Source Microsoft)

### Project Dependencies
- .NET Framework 4.7.2 (v4.5+)
- Signal-R

## Working Demo Video of the Application

https://user-images.githubusercontent.com/22376097/125202742-9baf6d80-e292-11eb-8d29-cb8dcb41b0a1.mp4

## Screen-grabs of the Application (Similar to Chat-Messenger with no Authorization)

1. Login Screen

![Login Screen](https://user-images.githubusercontent.com/22376097/125202257-6275fe00-e290-11eb-9492-e54177c97343.png)

2. Home Screen

![Home Screen)](https://user-images.githubusercontent.com/22376097/125202282-8afdf800-e290-11eb-895c-8e79da37f01f.png)

3. Connect to User / Start New Chat

![Connect to User](https://user-images.githubusercontent.com/22376097/125202297-9fda8b80-e290-11eb-934c-849dee6c2e1d.png)

4. New Chat(s)

![New Chat Pic 1](https://user-images.githubusercontent.com/22376097/125202343-d31d1a80-e290-11eb-9fc1-62c61a6e16f3.png)

- On Selecting the User Chat

![New Chat Pic 2](https://user-images.githubusercontent.com/22376097/125202362-ed56f880-e290-11eb-9531-9028d85079ab.png)

5. Second Client/User Chat Window

![User 2 Chat Pic 1)](https://user-images.githubusercontent.com/22376097/125202417-1c6d6a00-e291-11eb-8d27-1cefe9f88bf3.png)

- Sending a reply from the Second Client/User

![User 2 Chat Pic 2)](https://user-images.githubusercontent.com/22376097/125202416-1b3c3d00-e291-11eb-9d3f-2f712b1d2607.png)

6. Both Conversations

- (Client 1)

![Conversation 1 Pic 1](https://user-images.githubusercontent.com/22376097/125202471-5e96ab80-e291-11eb-9b76-9544057248f0.png)

- (Client 2)

![Conversation 1 Pic 2](https://user-images.githubusercontent.com/22376097/125202470-5d657e80-e291-11eb-9b2a-53c5e0a7cf6e.png)

7. Both Conversations Side by Side

![Conversations Side by Side](https://user-images.githubusercontent.com/22376097/125202522-956cc180-e291-11eb-9cf6-1b71c7bbbc4e.png)

## Side Note
<p>
  This Project has Authorization implemented in it whereas the other project does titled 'chat-messenger-noauth' does not implement the same.
  Click the following 
  <a href="https://github.com/RaKeerS/chat-messenger-noauth">
    <img src="https://img.shields.io/badge/Github-chat--messenger--noauth-green?label=Github&amp;logo=github" alt="Chat-Messenger-Noauth-Repo">
  </a> to check out that repo.
</p>

Just remember that the session is not saved on either sides, which means once you refresh the window, all your chats will be lost!
In case you find any bugs do let me know!

## License

This project is licensed under the MIT License.
