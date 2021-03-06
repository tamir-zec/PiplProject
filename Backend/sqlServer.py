import sqlite3
import os


class MySqlDatabase:
    def __init__(self, database_path="", domains_path="free_domains.txt"):
        if not os.path.exists(database_path):
            os.mkdir(os.path.join(database_path))
        if not os.path.exists(os.path.join(database_path, "database.db")):
            self.create_db_table(database_path)
        self.free_domains_dict = self.get_domains_dict(domains_path)
        self.database_path = database_path

    @staticmethod
    def get_domains_dict(domains_path=""):
        free_domains_dict = {}
        domains_file = open(domains_path)
        for domain_name in domains_file.readlines():
            free_domains_dict[domain_name.strip()] = True
        return free_domains_dict

    @staticmethod
    def connect_to_db(db_path=""):
        conn = sqlite3.connect(db_path + 'database.db')
        return conn

    def create_db_table(self, db_path):
        conn = self.connect_to_db(db_path)
        conn.execute('''
            CREATE TABLE requests (
                request_id INTEGER PRIMARY KEY NOT NULL,
                request_type TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                emailProvider TEXT NOT NULL,
                phoneCountry TEXT NOT NULL
            );

        ''')

        conn.commit()
        print("Local Database created successfully")
        conn.close()


    def save_request_simple(self, request):
        try:
            conn = self.connect_to_db(self.database_path)
            cur = conn.cursor()
            cur.execute \
                ("INSERT INTO requests (request_type, email, phone, emailProvider, phoneCountry) VALUES (?, ?, ?, ?, ?)",
                        ("Request", request['email'], request['phone'], "", ""))
            conn.commit()
            conn.close()
        except sqlite3.ProgrammingError:
            "Couldn't connect to DB"

    def save_response_simple(self, response):
            conn = self.connect_to_db(self.database_path)
            cur = conn.cursor()
            cur.execute \
                ("INSERT INTO requests (request_type, email, phone, emailProvider, phoneCountry) VALUES (?, ?, ?, ?, ?)",
                        ("Response", "", "", response['emailProvider'], response['phoneCountry']))
            conn.commit()


    def check_domain(self, email: str):
        # get the text after the @
        mail_end = email.partition("@")[2]
        if mail_end in self.free_domains_dict:
            return "Free Mail Provider"
        else:
            return "Not a Free Mail Provider"

    def get_all_requests(self):
        requests = []
        try:
            conn = self.connect_to_db(self.database_path)
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute("SELECT * FROM requests")
            rows = cur.fetchall()

            # convert row objects to dictionary
            for i in rows:
                request = {
                    "requests_id": i["request_id"],
                    "requests_type": i["request_type"],
                    "email": i["email"],
                    "phone": i["phone"],
                    "emailProvider": i["emailProvider"],
                    "phoneCountry": i["phoneCountry"]
                }
                requests.append(request)

        except sqlite3.ProgrammingError:
            requests = []

        return requests
