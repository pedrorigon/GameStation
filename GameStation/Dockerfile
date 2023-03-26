FROM python:3.9-alpine3.13
LABEL maintainer="londonappdevelopes.com"

ENV PHTHOUNBUFFERED 1
RUN mkdir /app
WORKDIR /app
COPY ./ /app

EXPOSE 8000

# RUN adduser --disabled-password --no-create-home app
# ENV PATH="/py/bin:$PATH"
# USER app

RUN python3 -m venv ./venv && \
    . venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt
    
# python3 -m venv ./venv && . venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt && python3 manage.py runserver 0.0.0.0:8000






# FROM python:3.9-alpine

# ENV PHTHOUNBUFFERED 1
# RUN mkdir /app
# WORKDIR /app
# COPY requirements.txt /app/
# RUN pip install -r requirements.txt
# COPY . /app/

# EXPOSE 8000

# # RUN pwd
# # RUN find ./ -name entrypoint.sh
# # RUN ls /app
# # RUN cat /app/entrypoint.sh
# RUN echo before
# RUN chmod 755 /app/entrypoint.sh 
# RUN echo after
# ENTRYPOINT /app/entrypoint.sh