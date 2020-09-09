import os
from flask import Flask, render_template, request, session, jsonify
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt

from app.config import Config
from app.models import db, User
from app.api.user_routes import user_routes


app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
jwt = JWTManager(app)
blacklist=set()
# csrf=CSRFProtect(app)
app.register_blueprint(user_routes)
db.init_app(app)
migrate = Migrate(app, db)

## Application Security


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist

@app.route('/logout', methods=["DELETE"])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200

CORS(app)

@app.after_request
def inject_csrf_token(response):
    print('after request')
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
