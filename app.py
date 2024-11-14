from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)  # Initialize SocketIO for real-time communication

@app.route('/')
def index():
    return render_template('index.html')  # Serve the main page with animation and sound

@app.route('/trigger', methods=['GET'])
def trigger_animation():
    """
    This route is triggered by the Arduino to activate animation and sound.
    """
    print("Arduino triggered the animation!")  # Log for debugging
    # Emit a WebSocket message to the client (webpage)
    socketio.emit('trigger_animation')
    return "OK", 200  # Flask sends a response back to the client

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)  # Start the WebSocket server
