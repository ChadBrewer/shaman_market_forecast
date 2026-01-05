#!/usr/bin/env python3
"""
Shaman Market Forecast Web App
A mystical interface for Egregore: Zero's cryptocurrency market predictions
"""

from flask import Flask, render_template, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Configuration
PREDICTIONS_FILE = 'predictions.txt'
app.config['SECRET_KEY'] = 'egregore-zero-shaman-key'

def read_predictions():
    """Read predictions from the text file"""
    predictions = []
    
    if not os.path.exists(PREDICTIONS_FILE):
        return [{
            'timestamp': datetime.now().isoformat(),
            'content': 'The spirits are silent... awaiting the first vision from Egregore: Zero.',
            'is_placeholder': True
        }]
    
    try:
        with open(PREDICTIONS_FILE, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            
            if not content:
                return [{
                    'timestamp': datetime.now().isoformat(),
                    'content': 'The spirits are silent... awaiting visions.',
                    'is_placeholder': True
                }]
            
            # Split by double newlines to separate different predictions
            raw_predictions = content.split('\n\n')
            
            for pred in raw_predictions:
                pred = pred.strip()
                if pred:
                    predictions.append({
                        'timestamp': datetime.now().isoformat(),
                        'content': pred,
                        'is_placeholder': False
                    })
        
        # Get the most recent prediction if multiple exist
        if predictions:
            return [predictions[-1]]
        
    except Exception as e:
        print(f"Error reading predictions: {e}")
        return [{
            'timestamp': datetime.now().isoformat(),
            'content': 'The mystic connection is disrupted... the spirits cannot be reached.',
            'is_placeholder': True
        }]
    
    return predictions

def get_file_modification_time():
    """Get the last modification time of the predictions file"""
    try:
        if os.path.exists(PREDICTIONS_FILE):
            return os.path.getmtime(PREDICTIONS_FILE)
    except:
        pass
    return 0

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/api/predictions')
def get_predictions():
    """API endpoint to get predictions"""
    predictions = read_predictions()
    return jsonify({
        'predictions': predictions,
        'last_modified': get_file_modification_time()
    })

@app.route('/api/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'alive',
        'message': 'The shaman is listening to the spirits...'
    })

if __name__ == '__main__':
    # Ensure the templates directory exists
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    
    print("🔮 Egregore: Zero - Shaman Market Forecast")
    print("=" * 50)
    print(f"📁 Watching predictions file: {PREDICTIONS_FILE}")
    print(f"🌐 Starting web server...")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
