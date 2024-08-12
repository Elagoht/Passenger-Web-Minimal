from flask import Flask, render_template
from utilities.prepare import prepare_static_files
from utilities.minimize import minify_html
from utilities.authorization import public_page, private_page

prepare_static_files()

app = Flask(__name__)


@app.route("/login")
@public_page
def login():
    return minify_html(render_template("pages/login.j2"))


@app.route("/register")
@public_page
def register():
    return minify_html(render_template("pages/register.j2"))


@app.route("/dashboard")
@private_page
def dashboard(): return minify_html(render_template("pages/dashboard.j2"))


if __name__ == "__main__":
    app.run(debug=True)
