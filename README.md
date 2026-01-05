# 🔮 Egregore: Zero - Shaman Market Forecast

A mystical web application that displays cryptocurrency market predictions from Egregore: Zero, an AI that analyzes markets and delivers insights in the voice of an ancient shaman.

## Overview

This web application provides a beautiful, mystic-themed interface for viewing market predictions. Egregore: Zero outputs predictions to a text file, and this web app monitors that file and displays the latest predictions in real-time with a captivating shamanic aesthetic.

## Features

- ✨ **Real-time Updates**: Automatically polls for new predictions every 3 seconds
- 🎨 **Mystical Theme**: Dark purple gradients, glowing effects, and animated starfield
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🔄 **Live File Monitoring**: Watches the predictions file for changes
- 🌙 **Shamanic Aesthetic**: Themed around mysticism and ancient wisdom

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/ChadBrewer/shaman_market_forecast.git
   cd shaman_market_forecast
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Starting the Web App

Run the Flask application:

```bash
python app.py
```

The web app will start on `http://localhost:5000`

You should see:
```
🔮 Egregore: Zero - Shaman Market Forecast
==================================================
📁 Watching predictions file: predictions.txt
🌐 Starting web server...
==================================================
```

### Adding Predictions

Egregore: Zero should write predictions to a file named `predictions.txt` in the root directory. The format can be simple text:

```
The spirits whisper of great movements...

Bitcoin shows strength at $45,000. The ancient patterns suggest...

Ethereum's energy builds near $2,300...
```

The web app will automatically detect when the file is updated and display the latest prediction.

### File Format

- **Single prediction**: Write the entire prediction as plain text
- **Multiple predictions**: Separate different predictions with double newlines (`\n\n`)
- The app displays the most recent prediction (the last one in the file)

## Architecture

### Backend (`app.py`)
- **Flask web server** serving HTML and API endpoints
- **File monitoring** to detect changes in predictions.txt
- **RESTful API** endpoints:
  - `GET /` - Main web interface
  - `GET /api/predictions` - Returns current predictions as JSON
  - `GET /api/health` - Health check endpoint

### Frontend
- **HTML** (`templates/index.html`) - Structure with mystical elements
- **CSS** (`static/css/style.css`) - Dark theme with glowing effects, animations
- **JavaScript** (`static/js/app.js`) - Real-time polling and UI updates

## API Endpoints

### GET /api/predictions
Returns the current predictions and file modification time.

**Response:**
```json
{
  "predictions": [
    {
      "timestamp": "2024-01-05T18:46:59.221Z",
      "content": "The spirits whisper...",
      "is_placeholder": false
    }
  ],
  "last_modified": 1704477419.0
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "alive",
  "message": "The shaman is listening to the spirits..."
}
```

## Customization

### Changing the Predictions File Location

Edit `app.py` and modify the `PREDICTIONS_FILE` constant:

```python
PREDICTIONS_FILE = 'path/to/your/predictions.txt'
```

### Adjusting Poll Interval

Edit `static/js/app.js` and change the interval (in milliseconds):

```javascript
pollInterval = setInterval(fetchPredictions, 3000); // 3 seconds
```

### Styling

All styling is in `static/css/style.css`. You can customize:
- Color scheme (CSS variables at the top)
- Animations and effects
- Layout and spacing

## Deployment

### Local Development
```bash
python app.py
```

### Production Deployment

For production, use a WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Or use Docker:

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## Security Note

⚠️ **This app displays market predictions, not financial advice.** Always do your own research before making investment decisions.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available for personal and commercial use.

---

🕯️ **May the crypto spirits guide your journey** 🕯️
