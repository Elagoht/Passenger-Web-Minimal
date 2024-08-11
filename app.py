from flask import Flask, render_template


app = Flask(__name__)


@app.route('/login')
def login(): return render_template("pages/login.j2")


@ app.route('/register')
def register(): return render_template("pages/register.j2")


if __name__ == '__main__':
    app.run(debug=True)
