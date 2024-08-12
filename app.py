from flask import Flask, render_template
from utilities.prepare import prepare_static_files
from utilities.minimize import minify_html

prepare_static_files()

app = Flask(__name__)


@app.route('/login')
def login(): return minify_html(render_template("pages/login.j2"))


@app.route('/register')
def register(): return minify_html(render_template("pages/register.j2"))


if __name__ == '__main__':
    app.run(debug=True)
