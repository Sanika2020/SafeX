import cv2
import numpy as np
import tensorflow as tf
import os
import sys

# ----------------- Config -----------------
FRAME_WIDTH = 640
FRAME_HEIGHT = 480
BRIGHTNESS = 180
THRESHOLD = 0.40   # ⬅️ LOWERED (CPU-trained model)
FONT = cv2.FONT_HERSHEY_SIMPLEX

MODEL_PATH = "model_trained.h5"

# ----------------- Helpers -----------------
def load_model_safe(path):
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")
    model = tf.keras.models.load_model(path)
    print("Model loaded:", path)
    return model

# ✅ MUST MATCH TRAINING PREPROCESSING
def preprocessing(img, target_size=(32, 32)):
    """
    TRAINING USED:
    - resize
    - RGB → mean grayscale
    - normalize
    """
    img = cv2.resize(img, target_size)

    # RGB → grayscale (FAST, SAME AS TRAIN)
    gray = np.mean(img, axis=2, keepdims=True)

    gray = gray.astype(np.float32) / 255.0
    return gray

# ----------------- Class name mapping -----------------
def getClassName(classNo):
    mapping = {
        0: 'Speed Limit 20 km/h',
        1: 'Speed Limit 30 km/h',
        2: 'Speed Limit 50 km/h',
        3: 'Speed Limit 60 km/h',
        4: 'Speed Limit 70 km/h',
        5: 'Speed Limit 80 km/h',
        6: 'End of Speed Limit 80 km/h',
        7: 'Speed Limit 100 km/h',
        8: 'Speed Limit 120 km/h',
        9: 'No passing',
        10: 'No passing for vehicles over 3.5 metric tons',
        11: 'Right-of-way at the next intersection',
        12: 'Priority road',
        13: 'Yield',
        14: 'Stop',
        15: 'No vehicles',
        16: 'Vehicles over 3.5 metric tons prohibited',
        17: 'No entry',
        18: 'General caution',
        19: 'Dangerous curve to the left',
        20: 'Dangerous curve to the right',
        21: 'Double curve',
        22: 'Bumpy road',
        23: 'Slippery road',
        24: 'Road narrows on the right',
        25: 'Road work',
        26: 'Traffic signals',
        27: 'Pedestrians',
        28: 'Children crossing',
        29: 'Bicycles crossing',
        30: 'Beware of ice/snow',
        31: 'Wild animals crossing',
        32: 'End of all speed and passing limits',
        33: 'Turn right ahead',
        34: 'Turn left ahead',
        35: 'Ahead only',
        36: 'Go straight or right',
        37: 'Go straight or left',
        38: 'Keep right',
        39: 'Keep left',
        40: 'Roundabout mandatory',
        41: 'End of no passing',
        42: 'End of no passing by vehicles over 3.5 metric tons'
    }
    return mapping.get(int(classNo), "Unknown")

# ----------------- Main -----------------
if __name__ == "__main__":
    try:
        model = load_model_safe(MODEL_PATH)
    except Exception as e:
        print("Failed to load model:", e)
        sys.exit(1)

    cap = cv2.VideoCapture(0)
    cap.set(3, FRAME_WIDTH)
    cap.set(4, FRAME_HEIGHT)
    cap.set(10, BRIGHTNESS)

    if not cap.isOpened():
        print("Could not open camera.")
        sys.exit(1)

    print("Press 'q' to quit.")
    while True:
        success, frame = cap.read()
        if not success:
            break

        display_frame = frame.copy()

        # preprocess
        proc = preprocessing(frame)
        inp = np.expand_dims(proc, axis=0)  # (1, 32, 32, 1)

        # predict
        preds = model.predict(inp, verbose=0)
        classIndex = int(np.argmax(preds))
        probabilityValue = float(preds[0][classIndex])

        # text overlay
        cv2.putText(display_frame, "CLASS:", (20, 35),
                    FONT, 0.75, (0, 0, 255), 2)
        cv2.putText(display_frame, "PROBABILITY:", (20, 75),
                    FONT, 0.75, (0, 0, 255), 2)

        label = f"{classIndex} {getClassName(classIndex)}"
        prob_text = f"{probabilityValue*100:.2f}%"

        # ✅ ALWAYS SHOW (better demo)
        cv2.putText(display_frame, label, (120, 35),
                    FONT, 0.6, (0, 0, 255), 2)
        cv2.putText(display_frame, prob_text, (220, 75),
                    FONT, 0.6, (0, 0, 255), 2)

        cv2.imshow("Processed Image", (proc.squeeze() * 255).astype(np.uint8))
        cv2.imshow("Result", display_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
