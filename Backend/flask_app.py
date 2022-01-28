from flask import Flask, request, jsonify
from flask_cors import CORS
from server_side import PiplService

app_database = PiplService(db_type="local sql", database_path="App_History/")
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/api/all_requests', methods=['GET'])
def api_get_all_requests():
    return jsonify(app_database.get_history())


@app.route('/api/simple_request', methods=['POST'])
def api_get_simple_request():
    return jsonify(app_database.simple_request(request.data))


@app.route('/api/advanced_request', methods=['POST'])
def api_get_advanced_request():
    return jsonify(app_database.advanced_request(request.data))


if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    # app.run() #run app