from flask import Blueprint, jsonify, request
from app.models import db, User, Notebook, Note, Tag
from sqlalchemy import and_, or_, desc
import datetime

note_routes = Blueprint("notes", __name__, url_prefix="")

#Get all notes

#Get Notebook List
@note_routes.route('/<userId>/notebooks')
def get_notebooks(userId):
    user = User.query.get(userId)
    notebooks = user.notebooks
    data=[notebook.to_dict() for notebook in notebooks]
    print('DATAAAAA', data)
    return {'data': data}, 200

#Get all notes in a notebook
@note_routes.route('/<notebookId>/notes')
def get_associated_notes(notebookId):
    notebook= Notebook.query.get(notebookId)
    print(notebook.notes)
    data = [note.to_dict() for note in notebook.notes]
    return {'data': data}, 200

#Get all notes shared with user

#Get note details
@note_routes.route('/note/<int:noteId>')
def get_note_details(noteId):
    note= Note.query.get(noteId)
    return note.to_dict(),200

#Post new note
'''request json should look like this:
{
    "owner_id": owner id,
    "notebook_id": notebook id
    "title": title
    "content": content
    "shortcut": false
}
'''
@note_routes.route('/note/new', methods=['POST'])
def create_note():
    data= request.json
    note = Note(**data)
    note.updated_at = datetime.datetime.now()
    db.session.add(note)
    db.session.commit()
    return note.to_dict(), 200


#Update a note
@note_routes.route('/note/update', methods=['PUT'])
def update_note():
    data = request.json
    note= Note.query.get(data["note_id"])
    db.session.add(note)
    note.title = data["title"]
    note.notebook_id = data["notebook_id"]
    note.content = data["content"]
    note.shortcut = data["shortcut"]
    db.session.commit()
    return note.to_dict(), 200
#Post new notebook

#Change notebook name/add to shortcut

#create a tag
