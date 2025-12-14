import os

# ---------------- Base directory ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ---------------- Paths ----------------
shape_predictor_path = os.path.join(
    BASE_DIR,
    "data",
    "shape_predictor_68_face_landmarks.dat"
)

alarm_file = os.path.join(
    BASE_DIR,
    "data",
    "audio_files",
    "alarm.wav"
)

# Use SAME alarm sound for all events
alarm_paths = [
    alarm_file,  # drowsiness
    alarm_file   # distraction
]

# ---------------- Thresholds ----------------
EYE_DROWSINESS_THRESHOLD = 0.25
EYE_DROWSINESS_INTERVAL  = 2.0

MOUTH_DROWSINESS_THRESHOLD = 0.37
MOUTH_DROWSINESS_INTERVAL  = 1.0

DISTRACTION_INTERVAL = 3.0

# ---------------- Safety checks ----------------
if not os.path.exists(shape_predictor_path):
    raise FileNotFoundError(f"Missing shape predictor:\n{shape_predictor_path}")

if not os.path.exists(alarm_file):
    raise FileNotFoundError(f"Missing alarm sound:\n{alarm_file}")
