import os
from yt_dlp import YoutubeDL
import yt_dlp
from flask import Flask, jsonify
from flask import Flask, send_file, request
from flask_cors import CORS
from flask import request
import json

app = Flask(__name__)
CORS(app)

@app.route("/download", methods=['GET'])
def download():
    URLS = request.args.get('url')
    ydl_opts = {
        'format': 'mp4',
        'outtmpl': 'downloads/%(title)s.%(ext)s',
    }
    with YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(URLS, download=True)
        filename = ydl.prepare_filename(info_dict)
    return send_file(filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/info", methods=['GET'])
def info():
    ydl_opts = {}
    URL = request.args.get('url')
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(URL, download=False)
        # ydl.sanitize_info makes the info json-serializable
    return jsonify((ydl.sanitize_info(info))), 200