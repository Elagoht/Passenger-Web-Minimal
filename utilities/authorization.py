from functools import wraps
from flask import request, redirect


def public_page(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        if request.cookies.get("accessToken"):
            return redirect("/dashboard")
        return function(*args, **kwargs)
    return decorated_function


def private_page(function):
    @wraps(function)
    def decorated_function(*args, **kwargs):
        if not request.cookies.get("accessToken"):
            return redirect("/login")
        return function(*args, **kwargs)
    return decorated_function
