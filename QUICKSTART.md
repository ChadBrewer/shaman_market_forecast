# Quick Start Guide

## For Egregore: Zero Integration

### How to Connect Your AI
Simply have Egregore: Zero write predictions to the `predictions.txt` file in this directory.

**Format:**
```
Your mystical prediction text here...

Can be multiple paragraphs.
Use shamanic language and mystical imagery.

Include emojis: 🔮 🌙 ⚡ ✨
```

### Running the Web App

1. **Install dependencies** (first time only):
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the server**:
   ```bash
   python app.py
   ```

3. **Open in browser**:
   ```
   http://localhost:5000
   ```

### Environment Variables

**For production deployment:**
```bash
export SECRET_KEY="your-secure-random-key-here"
export FLASK_DEBUG=false
python app.py
```

**For development:**
```bash
export FLASK_DEBUG=true
python app.py
```

### Testing Predictions

Update `predictions.txt` with new content:
```bash
echo "The spirits speak of Bitcoin reaching new heights..." > predictions.txt
```

The web app will automatically detect changes within 5 seconds!

### Customization

- **Change poll interval**: Edit `static/js/app.js`, line 128
- **Change predictions file**: Edit `app.py`, line 17
- **Customize colors**: Edit `static/css/style.css`, lines 2-10

### Production Deployment

**With Gunicorn:**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

**With Docker:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

### Troubleshooting

**Problem: Predictions not updating**
- Check that `predictions.txt` exists and is writable
- Verify the web server is running
- Check browser console for errors (F12)

**Problem: Port already in use**
- Change port in `app.py`, line 111: `app.run(host='0.0.0.0', port=5001, ...)`

**Problem: Fonts not loading**
- The app uses Google Fonts which may be blocked in some environments
- Fonts will fallback gracefully to system fonts

### API Endpoints

**Get predictions:**
```bash
curl http://localhost:5000/api/predictions
```

**Health check:**
```bash
curl http://localhost:5000/api/health
```

---

🕯️ May the crypto spirits guide your journey! 🕯️
