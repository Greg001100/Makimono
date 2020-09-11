from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import re

db = SQLAlchemy()

#join table for shared notes between users
user_shared_notes= db.Table(
  'user_shared_notes',
  db.Model.metadata,
  db.Column('shared_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('note_id', db.Integer, db.ForeignKey('notes.id'), primary_key=True)
)

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(50), nullable = False)
  last_name = db.Column(db.String(50), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String, nullable = False)
  picUrl = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  notebooks= db.relationship('Notebook', back_populates='user', cascade="all, delete-orphan")
  notes= db.relationship('Note', back_populates='owner', cascade="all, delete-orphan")
  #notes shared with this user:
  shared_notes = db.relationship('Note', secondary=user_shared_notes, back_populates='users')

  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "full_name": (self.first_name + ' ' + self.last_name),
      "email": self.email,
      "picUrl": self.picUrl,
    }

  @validates('email')
  def validate_email(self, key, email):
    if User.query.filter(User.email==email).first():
      raise AssertionError('Email already in use')

    if not re.match("[^@]+@[^@]+\.[^@]+", email):
      raise AssertionError('Provided email is not an email address')

    return email

  @property
  def password(self):
      return self.hashed_password

  def set_password(self, password):
      if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
          raise AssertionError('Password must contain 1 capital letter and 1 number')
      if len(password) < 8 or len(password) > 50:
          raise AssertionError('Password must be between 8 and 50 characters')
      self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password, password)

class Notebook(db.Model):
  __tablename__='notebooks'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  title = db.Column(db.String(50), nullable=False)
  shortcut = db.Column(db.Boolean, nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  user= db.relationship('User', back_populates='notebooks')
  notes= db.relationship('Note', back_populates='notebook', cascade="all, delete-orphan")

#note and tags join table
note_tags= db.Table(
'note_tags',
db.Model.metadata,
db.Column('note_id', db.Integer, db.ForeignKey('notes.id'), primary_key=True),
db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

class Note(db.Model):
  __tablename__='notes'

  id = db.Column(db.Integer, primary_key = True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
  notebook_id = db.Column(db.Integer, db.ForeignKey("notebooks.id"), nullable = False)
  title = db.Column(db.String(50))
  content = db.Column(db.Text)
  shortcut = db.Column(db.Boolean, nullable = False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  owner= db.relationship('User', back_populates='notes')
  notebook=db.relationship('Notebook', back_populates='notes')
  #users this note is shared with:
  users = db.relationship('User', secondary=user_shared_notes, back_populates='shared_notes')
  tags = db.relationship('Tag', secondary=note_tags, back_populates='notes')

class Tag(db.Model):
  __tablename__='tags'

  id = db.Column(db.Integer, primary_key = True)
  name= db.Column(db.String(50), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  notes= db.relationship('Note', secondary=note_tags, back_populates='tags')
