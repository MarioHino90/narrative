# Use an official Python runtime as a parent image
FROM python:3.8

ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
RUN mkdir /code
WORKDIR /code

# Copy the current directory contents into the container at /usr/src/app
COPY . /code/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]