import os
from yt_dlp import YoutubeDL
from flask import Flask, jsonify
from flask import Flask, send_file, request
from flask_cors import CORS
from flask import request
import json

app = Flask(__name__)
CORS(app)

@app.route("/download", methods=['GET'])
def download():
    url = request.args.get('url')
    if not url:
        return "No URL provided", 400

    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': 'downloaded_video.%(ext)s',
    }

    with YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        filename = ydl.prepare_filename(info_dict)
        filepath = filename.rsplit(".", 1)[0] + ".mp4"
        
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404


    return send_file(filepath, as_attachment=True, download_name="yt2mp4.mp4")

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