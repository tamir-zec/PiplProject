import json
import os

# handle phone numbers imports
from phonenumbers import parse
from phonenumbers.phonenumberutil import region_code_for_number, NumberParseException
import pycountry

# my db implementation
from sqlServer import MySqlDatabase


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
        for person_dict in data['people_list']:
            responses.append(self.simple_request(person_dict))
        return {"responseList": responses}



    def simple_request(self, data):
        email, phone = data["email"], data["phone"]
        request = {"email": email, "phone": phone}

        # save request log
        if self.db_type == "local sql":
            self.db.save_request_simple(request)

        # get info
        req_country = self.get_country_by_phone(phone)
        req_provider = self.get_mail_provider(email)

        response = {"emailProvider": req_provider, "phoneCountry": req_country}
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
