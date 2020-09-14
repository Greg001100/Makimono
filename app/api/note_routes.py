from flask import Blueprint, jsonify, request
from app.models import db, User, Notebook, Note, Tag
from sqlalchemy import and_, or_, desc
import datetime

note_routes = Blueprint("notes", __name__, url_prefix="")

#Get all notes by updated

#Get all notebooks and associated notes

#Get all notes shared with user

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

#Post new notebook

#Change notebook name

#Move note to another notebook

#Include note in shortcuts

#Include notebook in shortcuts
