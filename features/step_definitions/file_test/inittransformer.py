import pandas as pd
import numpy as np
import tensorflow as tf
from datetime import datetime
import pickle
import logging

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler

datastreams = ["PPLast12H",
              "PPLast24H",
              "PPLast72H",
              "currentTemp",
              "changeTemp",
              "minTempLast24H",
              "maxTempLast24H",
              "WNDSpeed",
              "WNDDir",
              "TotalSND",
              "newSNLast24H",
              "PPNext12H",
              "PPNext24H",
              "PPNext48H",
              "minPPNext24H",
              "maxPPNext24H",
              "WNDSpeedNext24H",
              "WNDDirNext24H",
              "tempNext24H"
            ]

X = []
d = body["date"].split('T')[0].split('-')
y_m_d = (d[0], d[1], d[2])
y_m_d = [int(i) for i in y_m_d]
# Change to 'day of year'
date = datetime(*y_m_d)
doy = date.timetuple().tm_yday
X.append(doy)
data = body["data"]
for i in datastreams:
    try:
        X.append(float(data[i]))
    except:  # For NaN
        X.append(data[i])
        
# Columns with no data in data set
indexes_2_remove = [6, 7, 15, 16]
for index in sorted(indexes_2_remove, reverse=True):
    del X[index]
# Wrap data into 2D array shape
X = [X]
# Encode categorical data
encoder = pickle.load(mem_fs.open('pkl_encoder.pkl', 'rb'))
X = encoder.transform(X)
# Scale data
scaler = pickle.load(mem_fs.open('pkl_scaler.pkl', 'rb'))
X = scaler.transform(X)
# Wrap the hole data into AI model input shape
X = {'X': [{'input_8': X.tolist()}]}
