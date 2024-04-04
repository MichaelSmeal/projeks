from flask import Flask, request, jsonify
from geoip import geolite2


def create_app():

    app = Flask(__name__)

    # Let's build a simple app that returns 'Hello World' when we visit the root URL.
    @app.route('/')
    def index():
        return 'Hello World'
    
    # Weather forcast app idea
    # use js to get the user's location (lat, long) via ip address
    # create an endpoint that will be used to pass that data to the server
    # use the lat, long to get the weather forcast for that location
    # return the weather forcast to the user

    @app.route('/location', methods=['GET', 'POST'])
    def location():
        body = request.get_json()
        return body

    return app

    if __name__ == '__main__':
        app.debug = True
        app.run()

    app.add_url_rule('/', 'index', index)

projek_1 = create_app()