#!/bin/sh

# virtualenv /app/venv
# . /app/venv/bin/activate

# pip install django
# pip install djangorestframework

python3 -m venv venv 
source venv/bin/activate 
pip install django djangorestframework 
cd GameStation
python ../manage.py runserver 0.0.0.0:8000
