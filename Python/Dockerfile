FROM python:3.10.12

ENV TZ="Asia/Tokyo"
ENV LANG=C.UTF-8
ENV LANGUAGE=en_US:en_US

# RUN apt-get update
RUN /usr/local/bin/python -m pip install --upgrade pip

WORKDIR /app

COPY ./Python/src/ /app/
COPY ./Python/assets/ .
COPY ./Python/requirements.txt .

RUN python3 -m pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]