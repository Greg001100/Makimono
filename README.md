# Makimono
Makimono is a note taking web app that allows users to create notes with rich text editing and organize them in notebooks, inspired by Evernote. Designed using React, Redux, and bootstrap CSS on the front end, with Flask and SQLAlchemy to handle the back end.

[Makimono Live](https://makimono-scrolls.herokuapp.com/)

For initial design documents, please visit the [wiki](https://github.com/Greg001100/Makimono/wiki).

Mady by Greg Lloyd [github](https://github.com/Greg001100) | [linkedin](https://www.linkedin.com/in/greglloyd1/)

Makimono allows users to:
- Create an account and log in and out securely.
- Take notes with rich text editing and a variety of cool effects. Users can also embed videos and images.
- Create notebooks to store sets of notes.
- Rename, edit, delete, and move notes to different notebooks 
- Rename or delete notebooks
- Add notes or notebooks to their "shortcuts" or favorites list.
- Sort and view notes per notebook, or see a list of all notes at once.
- Immediately autosave changes to notes

## Technology Used:
- React and Redux
- React-Bootstrap
- Suneditor
- Flask
- SQLAlchemy
- PostgreSQL
- Flask-JWT-Extended
- Docker containers

## Main Components:

**Landing Page**

Visitors to the site are first greeted by the landing page, which is a very close representation of the real Evernote website. From here, users can sign up or sign in.
![](https://github.com/Greg001100/Makimono/blob/master/makiLand.png)

**User dashboard**

Once logged in, users are greeted with their dashboard. This is the command center for the app. The left-hand sidebar has buttons for users to create a new note and notebook, as well as navigation tabs that allow them to sort through notebooks (and edit/delete them) and sort through their shortcuts. 

The second side bar shows a list of notes, sorted by update time. Users can either see all of their notes at once, or a list of notes associated with a particular notebook. Clicking on a star will add that note to the shortcuts list. 

Finally the last portion of the page is the note editor. On the very top, users can change which notebook a note is associated with, and see when their changes have been saved. Then they can edit the note title and edit the note contents with a fully featured wysiwyg rich text editor. The editor also has a fullscreen option. 

![](https://github.com/Greg001100/Makimono/blob/master/makiDash.png)
