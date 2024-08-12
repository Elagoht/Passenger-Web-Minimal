from functools import wraps
from flask import request, redirect


def public_page(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        if "accessToken" in request.cookies:
            return redirect("/dashboard")
        return function(*args, **kwargs)
    return decorated_function


def private_page(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        if "accessToken" not in request.cookies:
            return redirect("/login")
        return function(*args, **kwargs)
    return decorated_function
