# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /server
COPY requirements.txt /server/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /server/
RUN python manage.py migrate