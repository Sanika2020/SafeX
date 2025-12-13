import cv2
import time
import numpy as np
from scipy.spatial import distance
from pygame import mixer
import mediapipe as mp
from parameters import *

# ------------------ Helpers ------------------

def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)


def mouth_aspect_ratio(mouth):
    """
    mouth: exactly 8 MediaPipe inner-lip points
    """
    A = distance.euclidean(mouth[2], mouth[6])
    B = distance.euclidean(mouth[3], mouth[5])
    C = distance.euclidean(mouth[0], mouth[4])
    return (A + B) / (2.0 * C)

# ------------------ Main ------------------

def facial_processing():

    mixer.init()
    alarm_playing = False

    mp_face = mp.solutions.face_mesh
    face_mesh = mp_face.FaceMesh(
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    )

    cap = cv2.VideoCapture(0)

    eye_start = mouth_start = distraction_start = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = face_mesh.process(rgb)

        h, w, _ = frame.shape

        if result.multi_face_landmarks:
            landmarks = result.multi_face_landmarks[0].landmark

            def pt(i):
                return np.array([
                    int(landmarks[i].x * w),
                    int(landmarks[i].y * h)
                ])

            # Eyes (6 points each)
            left_eye  = [pt(i) for i in [33, 160, 158, 133, 153, 144]]
            right_eye = [pt(i) for i in [362, 385, 387, 263, 373, 380]]

            # INNER lips — EXACTLY 8 points (IMPORTANT)
            mouth = [pt(i) for i in [78, 81, 82, 13, 312, 311, 310, 308]]

            ear = (eye_aspect_ratio(left_eye) + eye_aspect_ratio(right_eye)) / 2.0
            mar = mouth_aspect_ratio(mouth)

            cv2.putText(frame, f"EAR: {ear:.2f}  MAR: {mar:.2f}",
                        (10, frame.shape[0] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

            # ---------- DROWSINESS ----------
            if ear < EYE_DROWSINESS_THRESHOLD:
                if eye_start is None:
                    eye_start = time.time()
                elif time.time() - eye_start > EYE_DROWSINESS_INTERVAL:
                    cv2.putText(frame, "DROWSINESS ALERT!",
                                (10, 60),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
                    if not alarm_playing:
                        mixer.music.load(alarm_paths[0])
                        mixer.music.play(-1)
                        alarm_playing = True
            else:
                eye_start = None
                mixer.music.stop()
                alarm_playing = False

            # ---------- YAWNING ----------
            if mar > MOUTH_DROWSINESS_THRESHOLD:
                if mouth_start is None:
                    mouth_start = time.time()
                elif time.time() - mouth_start > MOUTH_DROWSINESS_INTERVAL:
                    cv2.putText(frame, "YAWNING!",
                                (10, 100),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            else:
                mouth_start = None

            distraction_start = None

        else:
            # ---------- DISTRACTION ----------
            if distraction_start is None:
                distraction_start = time.time()
            elif time.time() - distraction_start > DISTRACTION_INTERVAL:
                cv2.putText(frame, "EYES ON ROAD!",
                            (10, 60),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
                if not alarm_playing:
                    mixer.music.load(alarm_paths[1])
                    mixer.music.play(-1)
                    alarm_playing = True

        cv2.imshow("Driver Monitoring", frame)
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

    cap.release()
    mixer.music.stop()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    facial_processing()
