// Egregore: Zero - Client-side JavaScript
// Handles real-time prediction updates and UI interactions

let lastModified = 0;
let pollInterval = null;

// Format date/time in a mystical way
function formatMysticalTime(date) {
    const now = new Date(date);
    const options = { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    return now.toLocaleDateString('en-US', options);
}

// Update the prediction display
function updatePrediction(prediction) {
    const display = document.getElementById('predictionDisplay');
    
    if (!prediction) {
        display.innerHTML = `
            <div class="loading">
                <p>✨ The spirits are gathering... ✨</p>
            </div>
        `;
        return;
    }
    
    // Check if this is a placeholder message
    const isPlaceholder = prediction.is_placeholder;
    const textClass = isPlaceholder ? 'prediction-text placeholder' : 'prediction-text new-prediction';
    
    display.innerHTML = `
        <div class="${textClass}">
            ${escapeHtml(prediction.content)}
        </div>
    `;
    
    // Update last update time
    const lastUpdateEl = document.getElementById('lastUpdate');
    if (lastUpdateEl) {
        lastUpdateEl.textContent = formatMysticalTime(prediction.timestamp);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fetch predictions from the API
async function fetchPredictions() {
    try {
        const response = await fetch('/api/predictions');
        if (!response.ok) {
            throw new Error('Failed to fetch predictions');
        }
        
        const data = await response.json();
        
        // Check if the file has been modified
        if (data.last_modified > lastModified) {
            lastModified = data.last_modified;
            
            if (data.predictions && data.predictions.length > 0) {
                // Show the most recent prediction
                updatePrediction(data.predictions[0]);
                
                // Add a mystical effect when new prediction arrives
                if (!data.predictions[0].is_placeholder) {
                    showNewPredictionEffect();
                }
            }
        }
        
        // Update status
        updateStatus(true);
        
    } catch (error) {
        console.error('Error fetching predictions:', error);
        updateStatus(false, error.message);
    }
}

// Show a mystical effect when new prediction arrives
function showNewPredictionEffect() {
    // Play with the crystal ball glow
    const crystalBall = document.querySelector('.crystal-ball');
    if (crystalBall) {
        crystalBall.style.animation = 'none';
        requestAnimationFrame(() => {
            crystalBall.style.animation = '';
        });
    }
}

// Update connection status
function updateStatus(connected, errorMsg = '') {
    const statusText = document.getElementById('statusText');
    const pulseDot = document.querySelector('.pulse-dot');
    
    if (connected) {
        statusText.textContent = 'Connected to the Ether';
        if (pulseDot) {
            pulseDot.style.background = '#00ffff';
        }
    } else {
        statusText.textContent = `Connection disrupted: ${errorMsg}`;
        if (pulseDot) {
            pulseDot.style.background = '#ff4444';
        }
    }
}

// Initialize the app
function init() {
    console.log('🔮 Initializing Egregore: Zero interface...');
    
    // Fetch predictions immediately
    fetchPredictions();
    
    // Poll for updates every 5 seconds
    pollInterval = setInterval(fetchPredictions, 5000);
    
    // Check health endpoint
    fetch('/api/health')
        .then(response => response.json())
        .then(data => {
            console.log('✨ Health check:', data.message);
        })
        .catch(error => {
            console.error('❌ Health check failed:', error);
        });
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (pollInterval) {
        clearInterval(pollInterval);
    }
});

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
