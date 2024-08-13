from flask import Flask, render_template, redirect, request
from utilities.prepare import prepare_static_files
from utilities.minimize import minify_html
from utilities.authorization import public_page, private_page
from requests import get

prepare_static_files()

app = Flask(__name__)


@app.route("/")
@public_page
@private_page
def index(): pass


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
def dashboard():
    return minify_html(render_template(
        "pages/dashboard.j2",
        data=get("http://localhost:3000/stats", headers={
            "Authorization": f"Bearer {request.cookies.get("accessToken", "")}"
        }).json()
    ))


@app.route("/vault")
@private_page
def vault():
    return minify_html(render_template(
        "pages/vault.j2",
        data=get("http://localhost:3000/fetch-all", headers={
            "Authorization": f"Bearer {request.cookies.get("accessToken", "")}"
        }).json()
    ))


@app.route("/add")
@private_page
def add():
    return minify_html(render_template("pages/add.j2"))


if __name__ == "__main__":
    app.run(debug=True)
