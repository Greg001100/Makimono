from flask import Blueprint, jsonify, request
from app.models import db, User, Notebook, Note, Tag
from sqlalchemy import and_, or_, desc
import datetime

note_routes = Blueprint("notes", __name__, url_prefix="")

#Get all notes for a user
@note_routes.route('/<userId>/notes/all')
def get_all_notes(userId):
    user=User.query.get(userId)
    data=[note.to_dict() for note in reversed(user.notes)]
    return {'data': data}, 200

#Get Notebook List
@note_routes.route('/<userId>/notebooks')
def get_notebooks(userId):
    user = User.query.get(userId)
    notebooks = user.notebooks
    data=[notebook.to_dict() for notebook in reversed(notebooks)]
    return {'data': data}, 200

#Get Notebook name
@note_routes.route('/<notebookId>/name')
def get_book_name(notebookId):
    notebook= Notebook.query.get(notebookId)
    return {'data': notebook.title}, 200

#Get all notes in a notebook
@note_routes.route('/<notebookId>/notes')
def get_associated_notes(notebookId):
    notebook= Notebook.query.get(notebookId)
    data = [note.to_dict() for note in reversed(notebook.notes)]
    return {'data': data}, 200

#Get all user shortcuts
@note_routes.route('/<userId>/shortcuts')
def get_all_shortcuts(userId):
    user=User.query.get(userId)
    notebooks=[notebook.to_dict() for notebook in reversed(user.notebooks) if (notebook.shortcut is True)]
    notes=[note.to_dict() for note in reversed(user.notes) if (note.shortcut is True)]
    return {'notebooks': notebooks, 'notes': notes}, 200

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
    db.session.commit()
    return note.to_dict(), 200

#Post new notebook
@note_routes.route('/notebook/new', methods=['POST'])
def new_notebook():
    data=request.json
    notebook= Notebook(**data)
    notebook.updated_at=datetime.datetime.now()
    db.session.add(notebook)
    db.session.commit()
    first_note = Note(owner_id = notebook.user_id,
                      notebook_id= notebook.id,
                      title="",
                      content= "",
                      shortcut = False,
                      updated_at = datetime.datetime.now())
    db.session.add(first_note)
    db.session.commit()
    return notebook.to_dict(), 200

#add shortcut
@note_routes.route('/shortcut/add', methods=['PUT'])
def add_shortcut():
    data=request.json
    if data['type'] == 'note':
        note=Note.query.get(data['id'])
        db.session.add(note)
        note.shortcut=True
        db.session.commit()
        return {'msg': 'shortcut added'}, 200
    elif data['type'] =='notebook':
        notebook=Notebook.query.get(data['id'])
        db.session.add(notebook)
        notebook.shortcut=True
        db.session.commit()
        return {'msg': 'shortcut added'}, 200
    else:
        return {'msg': 'invalid shortcut type'}, 400

#remove shortcut
@note_routes.route('/shortcut/remove', methods=['PUT'])
def remove_shortcut():
    data=request.json
    if data['type'] == 'note':
        note=Note.query.get(data['id'])
        db.session.add(note)
        note.shortcut=False
        db.session.commit()
        return {'msg': 'shortcut added'}, 200
    elif data['type'] =='notebook':
        notebook=Notebook.query.get(data['id'])
        db.session.add(notebook)
        notebook.shortcut=False
        db.session.commit()
        return {'msg': 'shortcut added'}, 200
    else:
        return {'msg': 'invalid shortcut type'}, 400

#rename notebook
@note_routes.route('/notebook/rename', methods=['PUT'])
def rename_notebook():
    data= request.json
    notebook=Notebook.query.get(data['notebook_id'])
    db.session.add(notebook)
    notebook.title = data['title']
    db.session.commit()
    return {'msg':'rename successful'}, 200

#delete notebook
@note_routes.route('/notebook/delete', methods=['DELETE'])
def delete_notebook():
    data= request.json
    notebook=Notebook.query.get(data['notebook_id'])
    db.session.add(notebook)
    for note in notebook.notes:
        db.session.add(note)
        db.session.delete(note)
        db.session.commit()
    db.session.delete(notebook)
    db.session.commit()
    return {'msg':'delete successful'}, 200

#delete note
@note_routes.route('/note/delete', methods=['DELETE'])
def delete_note():
    data= request.json
    note=Note.query.get(data['note_id'])
    db.session.add(note)
    db.session.delete(note)
    db.session.commit()
    return {'msg':'delete successful'}, 200
