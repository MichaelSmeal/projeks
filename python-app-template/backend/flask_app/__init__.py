from flask import Flask, request, jsonify
from geoip import geolite2


def create_app():

    app = Flask(__name__)

    # Let's build a simple app that returns 'Hello World' when we visit the root URL.
    @app.route('/')
    def index():
        return 'Hello World'

    return app

    if __name__ == '__main__':
        app.debug = True
        app.run()

    app.add_url_rule('/', 'index', index)

projek_1 = create_app()