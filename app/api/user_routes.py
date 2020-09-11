from flask import Blueprint, jsonify, request, make_response
from ..models import User, db
from flask_jwt_extended import jwt_optional, create_access_token, get_jwt_identity, jwt_required, get_raw_jwt
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf

user_routes = Blueprint("user", __name__, url_prefix="/user")

@user_routes.route('/csrf')
def send_csrf():
  try:
    return {'msg':'csurf set'}, 200
  except:
    print('something went wrong')


@user_routes.route('/signup', methods=['POST'])
def sign_up():
  data = request.get_json()

  try:
    user = User(
      first_name=data['firstName'],
      last_name=data['lastName'],
      email=data['email'],
      picUrl=data['picture'],
      )

    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    email = user.email
    access_token = create_access_token(identity=email)
    return {"token": access_token, "user": user.to_dict()}, 200
  except AssertionError as exception_message:
    return jsonify(msg='Error: {}. '.format(exception_message)), 400

@user_routes.route('/signin', methods=['POST'])

def sign_in():

    try:

      if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

      email = request.json.get('email', None)
      password = request.json.get('password', None)


      if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
      if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

      user= User.query.filter(User.email==email).one()

      if (user.check_password(password)):
        access_token = create_access_token(identity=email)
        response= make_response({"token": access_token, "user": user.to_dict()})
        return response, 200
      else:
        return jsonify({"msg": "Bad email or password"}), 400

    except:
      return jsonify({"msg": "Bad email or password"}), 400
