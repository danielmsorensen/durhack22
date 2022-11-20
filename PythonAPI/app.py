from flask import Flask, redirect, url_for, request, jsonify
from webbrowser import get
from tempfile import mkdtemp
from functools import wraps
from PIL import Image
from io import BytesIO
import base64
import pytesseract

app = Flask(__name__)
# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = b'P\x87\xfc\xa9\xe6qQ~)8\x90D\x11\n\xb9\xa1'

@app.route("/", methods=["GET", "POST"])
def index():
    return redirect("/stringImage")

@app.route("/stringImage", methods=["GET", "POST"])
def stringImage():
    if request.method == "POST":
        inputStr = request.json["base64"]
        im = Image.open(BytesIO(base64.b64decode(inputStr)))
        result = pytesseract.image_to_string(im)
        print(result)
        return jsonify({"result": result})

app.run(host="0.0.0.0")
