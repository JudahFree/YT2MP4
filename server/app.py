from yt_dlp import YoutubeDL
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json

app = Flask(__name__)
CORS(app)

@app.route("/download", methods=['GET'])
def download():
    with YoutubeDL() as ydl:
        URLS = request.args.get('url')
        ydl_opts = {}
        ydl.download(URLS)

@app.route("/info", methods=['GET'])
def info():
    ydl_opts = {}
    URL = request.args.get('url')
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(URL, download=False)
        # ydl.sanitize_info makes the info json-serializable
    return jsonify((ydl.sanitize_info(info))), 200