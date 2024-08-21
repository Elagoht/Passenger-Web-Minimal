from flask import Flask, render_template, redirect, request, make_response
from utilities.prepare import prepare_static_files
from utilities.minimize import minify_html
from utilities.authorization import public_page, private_page, logout_unauthorized
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
    fetchedData = get("http://localhost:3000/stats", headers={
        "Authorization": f"Bearer {request.cookies.get('accessToken', '')}"
    })

    if fetchedData.status_code == 401:
        return logout_unauthorized()

    return minify_html(render_template(
        "pages/dashboard.j2",
        data=fetchedData.json()
    ))


@app.route("/vault")
@private_page
def vault():
    fetchedData = get("http://localhost:3000/fetch-all", headers={
        "Authorization": f"Bearer {request.cookies.get('accessToken', '')}"
    })

    if fetchedData.status_code == 401:
        return logout_unauthorized()

    return minify_html(render_template(
        "pages/vault/index.j2",
        data=fetchedData.json()
    ))


@app.route("/vault/<id>", methods=["GET"])
@private_page
def vault_id(id):
    fetchedData = get(f"http://localhost:3000/fetch/{id}", headers={
        "Authorization": f"Bearer {request.cookies.get("accessToken", "")}"
    })

    if fetchedData.status_code == 401:
        return make_response(
            redirect('/login')
        ).set_cookie('accessToken', '', expires=0)

    return minify_html(render_template(
        "pages/vault/uuid.j2",
        data=fetchedData.json()
    ))


@app.route("/add")
@private_page
def add():
    return minify_html(render_template("pages/add.j2"))


@app.route("/detective")
@private_page
def detective():
    response = get("http://localhost:3000/detect", headers={
        "Authorization": f"Bearer {request.cookies.get('accessToken', '')}"
    })

    if response.status_code == 401:
        return logout_unauthorized()

    newsResponse = get("https://passenger-landing.vercel.app/api/breaches")

    return minify_html(render_template(
        "pages/detective.j2",
        data=response.json(),
        news=newsResponse.json()
    ))


@app.route("/_content/news")
@private_page
def news():
    response = get("https://passenger-landing.vercel.app/api/breaches")
    return render_template("partials/news.j2", news=response.json())


@app.route("/settings")
@private_page
def settings():
    return minify_html(render_template("pages/settings/index.j2"))


@app.route("/settings/reset-passphrase")
@private_page
def reset_passphrase():
    return minify_html(render_template("pages/settings/reset-passphrase.j2"))


@app.route("/settings/export")
@private_page
def export_to_csv():
    return minify_html(render_template("pages/settings/export.j2"))


@app.route("/settings/import")
@private_page
def import_from_browser():
    return minify_html(render_template("pages/settings/import.j2"))


if __name__ == "__main__":
    app.run(debug=True)
