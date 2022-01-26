from flask import Flask, request, jsonify
from flask_cors import CORS
from server_side import PiplService

app_database = PiplService(db_option="local sql", database_path="App_History/")
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/requests', methods=['GET'])
def api_get_all_requests():
    return jsonify(app_database.get_all_requests())

@app.route('/api/simple_request', methods=['GET'])
def api_get_simple_request(args):
    return jsonify(app_database.get_data_simple(args))

@app.route('/api/mail_request', methods=['GET'])
def api_get_advanced_request(args):
    return jsonify(app_database.get_data_advanced(args))


if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True)
    app.run() #run app