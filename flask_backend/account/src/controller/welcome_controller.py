from flask import Blueprint

welcome_blueprint = Blueprint('welcome', __name__ , url_prefix='/account/welcome')

@welcome_blueprint.route('/new_team', methods=['POST', 'GET'])
def create_new_team():
    return {"contents": "New Team Created"}

@welcome_blueprint.route('/new_follower', methods=['POST', 'GET'])
def create_new_follower():
    return {"contents": "New Follower Created"}