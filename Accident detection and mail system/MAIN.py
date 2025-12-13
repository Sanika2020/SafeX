import cv2
import numpy as np
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart

# ---------------- PATH SETUP ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SHOT_DIR = os.path.join(BASE_DIR, "SHOTS")
EMAIL_DIR = os.path.join(BASE_DIR, "EMAIL")

os.makedirs(SHOT_DIR, exist_ok=True)
os.makedirs(EMAIL_DIR, exist_ok=True)

# ---------------- EMAIL CONFIG ----------------
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

UserName = "threadstogether23@gmail.com"
UserPassword = "oclxzofwjlgwyxja"   # Gmail App Password
From = UserName
To = "hvsanika2020@gmail.com"

# ---------------- EMAIL FUNCTION ----------------
def SendMail(img_path):
    with open(img_path, 'rb') as f:
        img_data = f.read()

    msg = MIMEMultipart()
    msg['Subject'] = '🚨 ACCIDENT DETECTED'
    msg['From'] = From
    msg['To'] = To

    msg.attach(MIMEText("Accident detected. Immediate attention required."))

    image = MIMEImage(img_data, name=os.path.basename(img_path))
    msg.attach(image)

    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(UserName, UserPassword)
    server.sendmail(From, To, msg.as_string())
    server.quit()

    print("📧 Email sent successfully")

# ---------------- VIDEO ----------------
cap = cv2.VideoCapture("test.mp4")

ret, prev = cap.read()
ret, curr = cap.read()

ACCIDENT_THRESHOLD = 500000  # tune if needed

while cap.isOpened():
    ret, next_frame = cap.read()
    if not ret:
        break

    gray1 = cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(curr, cv2.COLOR_BGR2GRAY)
    gray3 = cv2.cvtColor(next_frame, cv2.COLOR_BGR2GRAY)

    diff1 = cv2.absdiff(gray2, gray1)
    diff2 = cv2.absdiff(gray3, gray2)
    motion = cv2.bitwise_and(diff1, diff2)

    motion_score = np.sum(motion)

    cv2.imshow("Accident Detection", motion)

    if motion_score > ACCIDENT_THRESHOLD:
        print("🚨 ACCIDENT DETECTED")

        accident_img = os.path.join(EMAIL_DIR, "accident.jpg")
        cv2.imwrite(accident_img, curr)

        SendMail(accident_img)
        break

    prev = curr
    curr = next_frame

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
