# app/webapp/__init__.py
from flask import Blueprint

webapp = Blueprint('webapp', __name__)

from . import views