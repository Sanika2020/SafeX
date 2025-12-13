import os
import random
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pandas as pd

from sklearn.model_selection import train_test_split

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical

# ---------------- PARAMETERS ----------------
path = r"D:\ML_ude_my\Road-Safety-and-Traffic-Automation-master\Traffic Sign Recognition and Smart Warning\Traffic Sign Recognition and Smart Warning\dataset\Train"
labelFile = r"D:\ML_ude_my\Road-Safety-and-Traffic-Automation-master\Traffic Sign Recognition and Smart Warning\labels.csv"

# 🔥 CPU SAFE MODE (IMPORTANT)
CPU_SAFE = True

MAX_TRAIN = 1000
MAX_VAL = 200
MAX_TEST = 200

IMG_SIZE = (32, 32)
imageDimesions = (32, 32, 1)

epochs_val = 3
batch_size_val = 16

testRatio = 0.2
validationRatio = 0.2

# ---------- LOAD IMAGES ----------
def load_images_from_folder(base_path):
    images, labels = [], []
    class_folders = sorted(os.listdir(base_path))
    print("Total Classes Detected:", len(class_folders))

    for cls in class_folders:
        class_path = os.path.join(base_path, cls)
        if not cls.isdigit():
            continue
        for img_name in os.listdir(class_path):
            img_path = os.path.join(class_path, img_name)
            img = cv2.imread(img_path)
            if img is None:
                continue
            img = cv2.resize(img, IMG_SIZE)
            images.append(img)
            labels.append(int(cls))

    images = np.array(images, dtype=np.float32) / 255.0
    labels = np.array(labels)
    return images, labels, len(class_folders)

images, classNo, noOfClasses = load_images_from_folder(path)

# ---------- SPLIT DATA ----------
X_train, X_test, y_train, y_test = train_test_split(
    images, classNo, test_size=testRatio, stratify=classNo, random_state=42
)
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=validationRatio, stratify=y_train, random_state=42
)

# ---------- CPU SAFE SUBSET ----------
if CPU_SAFE:
    print("⚠️ CPU SAFE MODE ENABLED")
    X_train, y_train = X_train[:MAX_TRAIN], y_train[:MAX_TRAIN]
    X_val, y_val = X_val[:MAX_VAL], y_val[:MAX_VAL]
    X_test, y_test = X_test[:MAX_TEST], y_test[:MAX_TEST]

print("Train:", X_train.shape)
print("Validation:", X_val.shape)
print("Test:", X_test.shape)

# ---------- FAST PREPROCESSING (NO LOOPS) ----------
def fast_preprocess(X):
    # RGB → Grayscale using mean (VERY FAST)
    X_gray = np.mean(X, axis=3, keepdims=True)
    return X_gray.astype(np.float32)

X_train = fast_preprocess(X_train)
X_val = fast_preprocess(X_val)
X_test = fast_preprocess(X_test)

# ---------- ONE HOT ----------
y_train = to_categorical(y_train, noOfClasses)
y_val = to_categorical(y_val, noOfClasses)
y_test = to_categorical(y_test, noOfClasses)

# ---------- LIGHTWEIGHT MODEL (CPU FRIENDLY) ----------
def myModel():
    model = Sequential([
        Conv2D(16, (3,3), activation='relu', input_shape=imageDimesions),
        MaxPooling2D((2,2)),

        Conv2D(32, (3,3), activation='relu'),
        MaxPooling2D((2,2)),

        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.3),
        Dense(noOfClasses, activation='softmax')
    ])

    model.compile(
        optimizer=Adam(0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

model = myModel()
model.summary()

# ---------- TRAIN (YOU WILL SEE PROGRESS) ----------
history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=epochs_val,
    batch_size=batch_size_val,
    verbose=1
)

# ---------- EVALUATE ----------
score = model.evaluate(X_test, y_test, verbose=1)
print("Test Loss:", score[0])
print("Test Accuracy:", score[1])

# ---------- SAVE ----------
model.save("model_trained.h5")
print("✅ Model saved as model_trained.h5")
