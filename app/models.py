from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import re

db = SQLAlchemy()

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

  # credit_transactions = db.relationship("Transaction", foreign_keys= "Transaction.payee_id", backref="payee", cascade="all, delete-orphan", lazy="dynamic")
  # debit_transactions = db.relationship("Transaction", foreign_keys="Transaction.payer_id", backref="payer", cascade="all, delete-orphan", lazy="dynamic")
  # comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
  # likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")


  # friends = db.relationship('User',
  #                         secondary=Friendship.__table__,
  #                         primaryjoin=id==Friendship.user_first_id,
  #                         secondaryjoin=id==Friendship.user_second_id,
  #                         cascade="all")

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
