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
    URL = request.args.get('url')
    def format_selector(ctx):
        # formats are already sorted worst to best
        formats = ctx.get('formats')[::-1]

        # acodec='none' means there is no audio
        best_video = next(f for f in formats
                        if f['vcodec'] != 'none' and f['acodec'] == 'none')

        # find compatible audio extension
        audio_ext = {'mp4': 'm4a', 'webm': 'webm'}[best_video['ext']]
        # vcodec='none' means there is no video
        best_audio = next(f for f in formats if (
            f['acodec'] != 'none' and f['vcodec'] == 'none' and f['ext'] == audio_ext))

        # These are the minimum required fields for a merged format
        yield {
            'format_id': f'{best_video["format_id"]}+{best_audio["format_id"]}',
            'ext': best_video['ext'],
            'requested_formats': [best_video, best_audio],
            # Must be + separated list of protocols
            'protocol': f'{best_video["protocol"]}+{best_audio["protocol"]}'
        }
    ydl_opts = {
        'format': format_selector,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(URL)
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