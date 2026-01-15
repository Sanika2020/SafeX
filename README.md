🚦"Smart Driver Risk Assessment and Vehicle Safety Monitoring System"

This project presents an AI/ML-based software system that intelligently analyzes simulated driver health indicators including fatigue, stress, and drowsiness alongside vehicle safety parameters to identify potential driving risks. The system generates real-time alerts and warnings to prevent accidents, particularly in scenarios where physical or wearable sensors are not available. By relying on computer vision and machine learning techniques, the solution aims to enhance road safety and reduce accidents caused by driver health related impairments.

1️⃣ Drowsiness and Distraction Detection

Drowsy driving is a major cause of road accidents worldwide. Studies indicate that 1 in 25 adult drivers has fallen asleep while driving at least once. According to the National Highway Traffic Safety Administration (NHTSA), drowsy driving contributes to approximately 72,000 crashes and up to 6,000 fatal accidents annually.

To address this issue, we have developed a real-time system that detects driver drowsiness and distraction and immediately triggers an alert. The detection is entirely OpenCV-based, using facial landmarks and eye/mouth movement analysis.

🔧 Prerequisites

Install the following Python libraries:

SciPy

MediaPipe

OpenCV

Pygame (used for alarm sound playback)

All dependencies can be installed using pip.

▶️ Running the Module

Open Command Prompt.

Navigate to the project directory.

Run:

python detector.py

2️⃣ Accident Detection and Emergency Mail System

This module focuses on automatic accident detection using OpenCV and Machine Learning. When an accident is detected, the system:

Captures a snapshot of the incident

Fetches the accident location

Sends an email alert to the nearest hospital or police station

The system is designed to work with roadside cameras, particularly those deployed on highways in smart cities. While a bird’s-eye view is preferred, the system is adaptable to other camera angles.

To address delays in medical treatment caused by FIR formalities or missing family details, this automated alert system ensures faster emergency response.

🔧 Prerequisites

OpenCV

NumPy

TensorFlow

▶️ Running the Module

Download a suitable accident dataset and place it in the project directory.

Open Command Prompt and navigate to the folder.

Run:

python MAIN.py

3️⃣ Traffic Sign Recognition & Smart Overspeed Warning

Traffic signs play a critical role in road safety, but drivers often miss them during long journeys, leading to overspeeding and accidents.

This module:

Recognizes traffic signs in real time using Machine Learning

Displays detected signs on an LCD

Reads the vehicle’s speedometer using OpenCV

Warns the driver if the vehicle exceeds the speed limit specified on the detected sign

🚀 Future Enhancements

Accident history–based speed limits

Traffic density–aware speed regulation

Road condition analysis

🔧 Prerequisites

TensorFlow

NumPy

OpenCV

Pandas

▶️ Running the Module
Traffic Sign Recognition

Download and extract the ZIP folder.

Open Command Prompt and navigate to the folder.

Train the model:

python TrafficSign_Main.py


(A pre-trained model is already included.)

Test the model:

python TrafficSign_Test.py


A window will open where traffic signs can be shown for recognition.

Speedometer Reading

Add a speedometer image to the project folder.

Run:

python Speedometer reading.py

4️⃣ Smart Traffic Regulation System

Managing traffic in metropolitan cities is becoming increasingly complex due to rising vehicle density and limited manpower.

This module proposes an automatic traffic control system that:

Detects vehicles and calculates lane-wise vehicle density

Dynamically allocates green signal time based on:

Vehicle density

Time factors

Additional optimization parameters (X-factors)

Gives priority to lanes with fewer than 5 vehicles to reduce congestion

🔧 Prerequisites

Use Python 3.6 (recommended) and install:

OpenCV

NumPy

TensorFlow

Matplotlib

▶️ Running the Module

Clone or download the repository.

Open Command Prompt and navigate to the folder.

Run:

python main.py

🧠 Technical Details

Uses the COCO dataset for vehicle detection

Deep Learning is used for object detection

OpenCV image processing is applied to calculate traffic density

Signal timing is dynamically adjusted based on real-time data

📌 Conclusion

This project demonstrates how AI, Machine Learning, and Computer Vision can be effectively combined to improve road safety, reduce accidents, and optimize traffic flow. Each module is designed to work independently while also being scalable for integration into smart city infrastructure.
