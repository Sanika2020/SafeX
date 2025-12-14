import cv2
import numpy as np
import time
from multiprocessing import Process, Value, Manager, Lock

# ---------------- CONFIG ----------------
CONF_THRESHOLD = 0.4
STANDARD_TIME = 5

# MobileNet SSD files
PROTO = "MobileNetSSD_deploy.prototxt"
MODEL = "MobileNetSSD_deploy.caffemodel"

# Videos
VIDEO_1 = "test2.mp4"
VIDEO_2 = "test3.avi"
VIDEO_3 = "test6.avi"

# Classes MobileNet SSD was trained on
CLASSES = [
    "background", "aeroplane", "bicycle", "bird", "boat",
    "bottle", "bus", "car", "cat", "chair",
    "cow", "diningtable", "dog", "horse",
    "motorbike", "person", "pottedplant",
    "sheep", "sofa", "train", "tvmonitor"
]

VEHICLE_CLASSES = {"car", "bus", "bicycle", "motorbike", "truck"}

# ---------------- LOAD MODEL ----------------
if not (cv2.os.path.exists(PROTO) and cv2.os.path.exists(MODEL)):
    raise FileNotFoundError("❌ MobileNetSSD model files not found")

net = cv2.dnn.readNetFromCaffe(PROTO, MODEL)

# ---------------- VEHICLE COUNT FUNCTION ----------------
def vehicle_density(video_path, max_val, density_list, lock, window_name):
    cap = cv2.VideoCapture(video_path)
    prev_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        (h, w) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(
            cv2.resize(frame, (300, 300)),
            0.007843, (300, 300), 127.5
        )

        net.setInput(blob)
        detections = net.forward()

        count = 0
        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            if confidence > CONF_THRESHOLD:
                idx = int(detections[0, 0, i, 1])
                label = CLASSES[idx]
                if label in VEHICLE_CLASSES:
                    count += 1

        if count != prev_count:
            density_list.append(count)
            prev_count = count

        with lock:
            if len(density_list):
                max_val.value = max(density_list)

        cv2.putText(frame, f"Vehicles: {count}", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        cv2.imshow(window_name, frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# ---------------- TRAFFIC LOGIC ----------------
def traffic_control(max1, max2, max3, d1, d2, d3):
    time.sleep(5)
    while True:
        td1, td2, td3 = max1.value, max2.value, max3.value

        print("\nVehicle Density:")
        print("Lane 1:", td1)
        print("Lane 2:", td2)
        print("Lane 3:", td3)

        d1[:] = []; d2[:] = []; d3[:] = []

        print("GREEN → Lane 1")
        time.sleep(max(td1, 1))
        print("RED → Lane 1")

        print("GREEN → Lane 2")
        time.sleep(max(td2, 1))
        print("RED → Lane 2")

        print("GREEN → Lane 3")
        time.sleep(max(td3, 1))
        print("RED → Lane 3")

# ---------------- MAIN ----------------
if __name__ == "__main__":
    manager = Manager()

    d1 = manager.list()
    d2 = manager.list()
    d3 = manager.list()

    max1 = Value('i', 0)
    max2 = Value('i', 0)
    max3 = Value('i', 0)

    lock = Lock()

    procs = [
        Process(target=vehicle_density, args=(VIDEO_1, max1, d1, lock, "Lane 1")),
        Process(target=vehicle_density, args=(VIDEO_2, max2, d2, lock, "Lane 2")),
        Process(target=vehicle_density, args=(VIDEO_3, max3, d3, lock, "Lane 3")),
        Process(target=traffic_control, args=(max1, max2, max3, d1, d2, d3))
    ]

    for p in procs:
        p.start()
    for p in procs:
        p.join()
