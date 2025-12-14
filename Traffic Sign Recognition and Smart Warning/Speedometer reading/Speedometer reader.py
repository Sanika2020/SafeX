import cv2
import numpy as np
import time
import functools
import os

# ---------------- CONFIG ----------------
GAUGE_IMAGE = "speedometer.jpg"   # ✅ existing file
FILE_TYPE = "jpg"

# ---------------------------------------

def avg_circles(circles):
    count = circles.shape[1]
    avg_x = avg_y = avg_r = 0
    for i in range(count):
        avg_x += circles[0][i][0]
        avg_y += circles[0][i][1]
        avg_r += circles[0][i][2]
    return int(avg_x/count), int(avg_y/count), int(avg_r/count)

def dist_2_pts(x1, y1, x2, y2):
    return np.sqrt((x2-x1)**2 + (y2-y1)**2)

# ---------------- CALIBRATION ----------------
def calibrate_gauge():
    if not os.path.exists(GAUGE_IMAGE):
        raise FileNotFoundError(f"Image not found: {GAUGE_IMAGE}")

    img = cv2.imread(GAUGE_IMAGE)
    if img is None:
        raise RuntimeError("Failed to load image")

    height, width = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    circles = cv2.HoughCircles(
        gray,
        cv2.HOUGH_GRADIENT,
        1,
        20,
        param1=100,
        param2=50,
        minRadius=int(height*0.35),
        maxRadius=int(height*0.48)
    )

    if circles is None:
        raise RuntimeError("No circles detected")

    x, y, r = avg_circles(circles)

    # Draw detected gauge
    cv2.circle(img, (x, y), r, (0, 0, 255), 3)
    cv2.circle(img, (x, y), 5, (0, 255, 0), -1)
    cv2.imshow("Calibration", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # ✅ HARD-CODED (no repeated typing)
    min_angle = 45
    max_angle = 315
    min_value = 0
    max_value = 180
    units = "km/h"

    return min_angle, max_angle, min_value, max_value, units, x, y, r

# ---------------- NEEDLE DETECTION ----------------
def get_current_value(img, min_angle, max_angle, min_value, max_value, x, y, r):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 175, 255, cv2.THRESH_BINARY_INV)

    lines = cv2.HoughLinesP(
        thresh,
        rho=3,
        theta=np.pi/180,
        threshold=100,
        minLineLength=30,
        maxLineGap=5
    )

    if lines is None:
        return None

    for line in lines:
        x1,y1,x2,y2 = line[0]
        d1 = dist_2_pts(x, y, x1, y1)
        d2 = dist_2_pts(x, y, x2, y2)

        if d1 > d2:
            x_angle = x1 - x
            y_angle = y - y1
        else:
            x_angle = x2 - x
            y_angle = y - y2

        angle = np.degrees(np.arctan2(y_angle, x_angle))
        angle = (angle + 360) % 360

        value = ((angle - min_angle) * (max_value - min_value)) / (max_angle - min_angle)
        value += min_value
        return round(value, 2)

    return None

# ---------------- MAIN ----------------
def main():
    min_angle, max_angle, min_value, max_value, units, x, y, r = calibrate_gauge()

    img = cv2.imread(GAUGE_IMAGE)
    value = get_current_value(img, min_angle, max_angle, min_value, max_value, x, y, r)

    if value is not None:
        print(f"Current Speed: {value} {units}")
    else:
        print("Needle not detected")

if __name__ == "__main__":
    main()
