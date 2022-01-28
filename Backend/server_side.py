import json
import sqlite3
import os

# handle phone numbers imports
from phonenumbers import parse
from phonenumbers.phonenumberutil import region_code_for_number, NumberParseException
import pycountry


class PiplService:
    def __init__(self, db_type="local sql", database_path=""):
        if db_type == "local sql":
            self.db = MySqlDatabase(database_path=database_path)
            self.db_type = "local sql"
            self.db_path = database_path
            if database_path != "":
                full_path = os.path.join(database_path)
                if not os.path.exists(full_path):
                    os.mkdir(full_path)

    def advanced_request(self, data):
        responses = []
        for email, phone in json.loads(data)['people_list']:
            responses.append(self.simple_request({"email": email, "phone": phone}))
        return responses



    def simple_request(self, data):
        for data_dict in data['people_list']:
            email, phone = data_dict["email"], data_dict["phone"]
            request = {"email": email, "phone": phone}

        # save request log
            if self.db_type == "local sql":
                self.db.save_request_simple(request)

        # get info
        req_country = self.get_country_by_phone(phone)
        req_provider = self.get_mail_provider(email)

        response = {"email_provider": req_provider, "phone_country": req_country}
        # save response log
        if self.db_type == "local sql":
            self.db.save_response_simple(response)

        return response

    def get_history(self):
        if self.db_type == "local sql":
            return self.db.get_all_requests()

    @staticmethod
    def get_country_by_phone(phone_number):
        pn = parse(phone_number)
        country_code = region_code_for_number(pn)
        country = pycountry.countries.get(alpha_2=country_code)
        return country.name

    def get_mail_provider(self, email):
        return self.db.check_domain(email)


class MySqlDatabase:
    def __init__(self, database_path="", domains_path="free_domains.txt"):
        if not os.path.exists("database.db"):
            self.create_db_table(database_path)
        self.free_domains_dict = self.get_domains_dict(domains_path)

    @staticmethod
    def get_domains_dict(domains_path=""):
        free_domains_dict = {}
        domains_file = open(domains_path)
        for domain_name in domains_file:
            free_domains_dict[domain_name] = True
        return free_domains_dict

    @staticmethod
    def connect_to_db(db_path=""):
        conn = sqlite3.connect(db_path+'database.db')
        return conn

    def create_db_table(self, db_path):
        conn = self.connect_to_db(db_path)
        conn.execute('''
            CREATE TABLE requests (
                request_id INTEGER PRIMARY KEY NOT NULL,
                request_type TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                email_provider TEXT NOT NULL,
                phone_country TEXT NOT NULL
            );
            
        ''')

        conn.commit()
        print("Local Database created successfully")
        conn.close()


    def save_request_simple(self, request):
        try:
            conn = self.connect_to_db()
            cur = conn.cursor()
            cur.execute("INSERT INTO requests (request_type, email, phone, email_provider, phone_country) VALUES (?, ?, ?, ?, ?)",
                        ("Request", request['email'], request['phone'], "", ""))
            conn.commit()
            conn.close()
        except sqlite3.ProgrammingError:
            "Couldn't connect to DB"

    def save_response_simple(self, response):
        try:
            conn = self.connect_to_db()
            cur = conn.cursor()
            cur.execute("INSERT INTO requests (request_type, email, phone, email_provider, phone_country) VALUES (?, ?, ?, ?, ?)",
                        ("Response", "", "", response['email_provider'], response['email_provider']))
            conn.commit()
            inserted_request = self.get_request_by_id(cur.lastrowid)
        except:
            conn().rollback()

    def check_domain(self, email: str):
        # get the text after the @
        mail_end = email.partition("@")[2]
        if self.free_domains_dict[mail_end]:
            return "Free Mail Provider"
        else:
            return "Not a Free Mail Provider"

    def get_all_requests(self):
        requests = []
        try:
            conn = self.connect_to_db()
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
                    "email_provider": i["email_provider"],
                    "phone_country": i["phone_country"]
                }
                requests.append(request)

        except sqlite3.ProgrammingError:
            requests = []

        return requests
