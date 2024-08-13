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
    headers = {
        "Authorization": f"Bearer {request.cookies.get("accessToken", "")}"
    }
    data = get("http://localhost:3000/stats", headers=headers).json()

    return minify_html(render_template(
        "pages/dashboard.j2",
        total_count=data["totalCount"],
        average_length=data["averageLength"],
        unique_platforms_count=data["uniquePlatformsCount"],
        unique_passphrases=data["uniquePassphrases"],
        most_accessed=data["mostAccessed"],
        common_by_platform=data["commonByPlatform"],
        percentage_of_common=data["percentageOfCommon"],
        most_common=data["mostCommon"],
        strengths=data["strengths"],
        average_strength=data["averageStrength"],
        weak_passphrases=data["weakPassphrases"],
        medium_passphrases=data["mediumPassphrases"],
        strong_passphrases=data["strongPassphrases"]
    ))


if __name__ == "__main__":
    app.run(debug=True)
